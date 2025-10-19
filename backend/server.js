const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas básicas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando!' });
});

// Rota para obter eventos
app.get('/api/eventos', (req, res) => {
  const query = 'SELECT * FROM eventos ORDER BY created_at DESC';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para obter evento por ID
app.get('/api/eventos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM eventos WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Evento não encontrado' });
      return;
    }
    res.json(row);
  });
});

// Rota para criar evento
app.post('/api/eventos', (req, res) => {
  const { nome, data_inicio, data_fim, local, cidade, modalidade, pacotes, status, configs } = req.body;

  const query = `
    INSERT INTO eventos (nome, data_inicio, data_fim, local, cidade, modalidade, pacotes, status, configs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [nome, data_inicio, data_fim, local, cidade, modalidade, pacotes, status, configs], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Log de auditoria
    const auditQuery = `
      INSERT INTO auditoria (usuario_id, evento_id, modulo, acao, registro_id, resumo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(auditQuery, [1, this.lastID, 'Eventos', 'CREATE', this.lastID, `Evento criado: ${nome}`]);

    res.json({ id: this.lastID, message: 'Evento criado com sucesso!' });
  });
});

// Rota para obter usuários
app.get('/api/usuarios', (req, res) => {
  const query = 'SELECT id, nome, email, perfil, ativo, created_at, updated_at FROM usuarios';

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para obter usuário por ID
app.get('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT id, nome, email, perfil, ativo, created_at, updated_at FROM usuarios WHERE id = ?';

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    res.json(row);
  });
});

// Rota para login
app.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND ativo = 1';

  db.get(query, [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!row) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    // Em produção, usar bcrypt para comparar senhas
    if (row.senha !== senha) {
      res.status(401).json({ error: 'Credenciais inválidas' });
      return;
    }

    // Retorna dados do usuário (sem senha)
    const user = {
      id: row.id,
      nome: row.nome,
      email: row.email,
      perfil: row.perfil
    };

    res.json({ user, message: 'Login realizado com sucesso!' });
  });
});

// Rota para obter inscrições de um evento
app.get('/api/eventos/:eventoId/inscricoes', (req, res) => {
  const { eventoId } = req.params;
  const query = 'SELECT * FROM inscricoes WHERE evento_id = ? ORDER BY created_at DESC';

  db.all(query, [eventoId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para criar inscrição
app.post('/api/eventos/:eventoId/inscricoes', (req, res) => {
  const { eventoId } = req.params;
  const {
    participante_nome,
    participante_doc,
    participante_email,
    participante_telefone,
    participante_endereco,
    participante_cep,
    modalidade,
    pacote,
    status_inscricao,
    observacoes,
    anexos
  } = req.body;

  const query = `
    INSERT INTO inscricoes (
      evento_id, participante_nome, participante_doc, participante_email,
      participante_telefone, participante_endereco, participante_cep,
      modalidade, pacote, status_inscricao, observacoes, anexos
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    eventoId, participante_nome, participante_doc, participante_email,
    participante_telefone, participante_endereco, participante_cep,
    modalidade, pacote, status_inscricao || 'pendente', observacoes, anexos
  ], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Log de auditoria
    const auditQuery = `
      INSERT INTO auditoria (usuario_id, evento_id, modulo, acao, registro_id, resumo)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(auditQuery, [1, eventoId, 'Inscrições', 'CREATE', this.lastID, `Inscrição criada: ${participante_nome}`]);

    res.json({ id: this.lastID, message: 'Inscrição criada com sucesso!' });
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
