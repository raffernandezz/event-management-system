const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'event_management.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Tabela de Eventos
  db.run(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data_inicio DATE,
      data_fim DATE,
      local TEXT,
      cidade TEXT,
      modalidade TEXT,
      pacotes TEXT,
      status TEXT DEFAULT 'ativo',
      configs TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      perfil TEXT NOT NULL,
      ativo BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Inscrições
  db.run(`
    CREATE TABLE IF NOT EXISTS inscricoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      participante_nome TEXT NOT NULL,
      participante_doc TEXT,
      participante_email TEXT,
      participante_telefone TEXT,
      participante_endereco TEXT,
      participante_cep TEXT,
      modalidade TEXT NOT NULL,
      pacote TEXT NOT NULL,
      status_inscricao TEXT DEFAULT 'pendente',
      observacoes TEXT,
      anexos TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Cidades
  db.run(`
    CREATE TABLE IF NOT EXISTS cidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      uf TEXT NOT NULL,
      pais TEXT DEFAULT 'Brasil',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de Modalidades
  db.run(`
    CREATE TABLE IF NOT EXISTS modalidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      descricao TEXT,
      capacidade INTEGER,
      regras TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Pacotes
  db.run(`
    CREATE TABLE IF NOT EXISTS pacotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      preco DECIMAL(10,2),
      descricao TEXT,
      beneficios TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Artes
  db.run(`
    CREATE TABLE IF NOT EXISTS artes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      modelo TEXT NOT NULL,
      variaveis TEXT,
      preview TEXT,
      historico_versoes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Certificados Emitidos
  db.run(`
    CREATE TABLE IF NOT EXISTS certificados_emitidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      inscricao_id INTEGER NOT NULL,
      numero TEXT NOT NULL,
      data_emissao DATE NOT NULL,
      link_arquivo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (inscricao_id) REFERENCES inscricoes (id)
    )
  `);

  // Tabela de Placas Ouro
  db.run(`
    CREATE TABLE IF NOT EXISTS placas_ouro (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      homenageado TEXT NOT NULL,
      texto TEXT,
      arte_id INTEGER,
      status_producao TEXT DEFAULT 'pendente',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (arte_id) REFERENCES artes (id)
    )
  `);

  // Tabela de Envios
  db.run(`
    CREATE TABLE IF NOT EXISTS envios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      inscricao_id INTEGER,
      destinatario_nome TEXT,
      destinatario_endereco TEXT,
      destinatario_cep TEXT,
      status_pipeline TEXT DEFAULT 'preparacao',
      codigo_rastreio TEXT,
      historico_status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (inscricao_id) REFERENCES inscricoes (id)
    )
  `);

  // Tabela de Receitas
  db.run(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      origem TEXT NOT NULL,
      valor DECIMAL(10,2) NOT NULL,
      data DATE NOT NULL,
      forma TEXT,
      referencia TEXT,
      observacoes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Despesas
  db.run(`
    CREATE TABLE IF NOT EXISTS despesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      categoria TEXT NOT NULL,
      valor DECIMAL(10,2) NOT NULL,
      data DATE NOT NULL,
      fornecedor TEXT,
      comprovante TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Notas Fiscais
  db.run(`
    CREATE TABLE IF NOT EXISTS notas_fiscais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      numero TEXT NOT NULL,
      tipo TEXT NOT NULL,
      valor DECIMAL(10,2) NOT NULL,
      data DATE NOT NULL,
      link_arquivo TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Confirmações
  db.run(`
    CREATE TABLE IF NOT EXISTS confirmacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      inscricao_id INTEGER NOT NULL,
      status TEXT DEFAULT 'pendente',
      canal TEXT DEFAULT 'site',
      vendedor TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (inscricao_id) REFERENCES inscricoes (id)
    )
  `);

  // Tabela de Vendas
  db.run(`
    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      item TEXT NOT NULL,
      quantidade INTEGER DEFAULT 1,
      valor_total DECIMAL(10,2) NOT NULL,
      canal TEXT NOT NULL,
      responsavel TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Check-ins (Portaria)
  db.run(`
    CREATE TABLE IF NOT EXISTS checkins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      inscricao_id INTEGER NOT NULL,
      horario DATETIME DEFAULT CURRENT_TIMESTAMP,
      atendente TEXT,
      metodo TEXT DEFAULT 'manual',
      observacoes TEXT,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (inscricao_id) REFERENCES inscricoes (id)
    )
  `);

  // Tabela de Chamadas (Portaria)
  db.run(`
    CREATE TABLE IF NOT EXISTS chamadas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      lista_participantes TEXT NOT NULL,
      status_chamada TEXT DEFAULT 'pendente',
      hora_inicio DATETIME,
      hora_fim DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Listas Operacionais
  db.run(`
    CREATE TABLE IF NOT EXISTS listas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL,
      itens TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Observações
  db.run(`
    CREATE TABLE IF NOT EXISTS observacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      alvo_tipo TEXT NOT NULL,
      alvo_id INTEGER NOT NULL,
      texto TEXT NOT NULL,
      autor TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Logs de Auditoria
  db.run(`
    CREATE TABLE IF NOT EXISTS auditoria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      evento_id INTEGER NOT NULL,
      modulo TEXT NOT NULL,
      acao TEXT NOT NULL,
      registro_id INTEGER,
      dados_antes TEXT,
      dados_depois TEXT,
      resumo TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
      FOREIGN KEY (evento_id) REFERENCES eventos (id)
    )
  `);

  // Tabela de Logs de Exportação
  db.run(`
    CREATE TABLE IF NOT EXISTS export_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      evento_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      modulo TEXT NOT NULL,
      tipo_arquivo TEXT NOT NULL,
      nome_arquivo TEXT NOT NULL,
      tamanho INTEGER NOT NULL,
      sha256 TEXT NOT NULL,
      data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (evento_id) REFERENCES eventos (id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )
  `);

  console.log('Tabelas criadas com sucesso!');
}

module.exports = db;
