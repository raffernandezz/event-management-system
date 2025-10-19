const db = require('./database');

function seedDatabase() {
  console.log('Iniciando seed do banco de dados...');

  // Inserir usuários de exemplo
  const usuarios = [
    {
      nome: 'Administrador',
      email: 'admin@evento.com',
      senha: 'admin123', // Em produção, usar hash
      perfil: 'Admin'
    },
    {
      nome: 'Portaria',
      email: 'portaria@evento.com',
      senha: 'portaria123',
      perfil: 'Operador'
    },
    {
      nome: 'Financeiro',
      email: 'financeiro@evento.com',
      senha: 'financeiro123',
      perfil: 'Financeiro'
    },
    {
      nome: 'Designer',
      email: 'designer@evento.com',
      senha: 'designer123',
      perfil: 'Designer'
    },
    {
      nome: 'Leitor',
      email: 'leitor@evento.com',
      senha: 'leitor123',
      perfil: 'Leitor'
    }
  ];

  usuarios.forEach(usuario => {
    db.run(`
      INSERT OR IGNORE INTO usuarios (nome, email, senha, perfil)
      VALUES (?, ?, ?, ?)
    `, [usuario.nome, usuario.email, usuario.senha, usuario.perfil]);
  });

  // Inserir cidades
  const cidades = [
    { nome: 'São Paulo', uf: 'SP' },
    { nome: 'Rio de Janeiro', uf: 'RJ' },
    { nome: 'Belo Horizonte', uf: 'MG' },
    { nome: 'Brasília', uf: 'DF' },
    { nome: 'Salvador', uf: 'BA' }
  ];

  cidades.forEach(cidade => {
    db.run(`
      INSERT OR IGNORE INTO cidades (nome, uf)
      VALUES (?, ?)
    `, [cidade.nome, cidade.uf]);
  });

  // Inserir evento principal
  db.run(`
    INSERT OR IGNORE INTO eventos (nome, data_inicio, data_fim, local, cidade, modalidade, pacotes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    'Evento Principal 2025 - São Paulo',
    '2025-03-15',
    '2025-03-17',
    'Centro de Convenções',
    'São Paulo',
    'Palestra,Workshop',
    'Padrão,VIP',
    'ativo'
  ], function(err) {
    if (err) {
      console.error('Erro ao inserir evento:', err);
      return;
    }

    const eventoId = this.lastID;

    // Inserir modalidades
    const modalidades = [
      { nome: 'Palestra', descricao: 'Palestra principal do evento', capacidade: 500 },
      { nome: 'Workshop', descricao: 'Workshop prático', capacidade: 100 }
    ];

    modalidades.forEach(modalidade => {
      db.run(`
        INSERT INTO modalidades (evento_id, nome, descricao, capacidade)
        VALUES (?, ?, ?, ?)
      `, [eventoId, modalidade.nome, modalidade.descricao, modalidade.capacidade]);
    });

    // Inserir pacotes
    const pacotes = [
      { nome: 'Padrão', preco: 100.00, descricao: 'Acesso básico', beneficios: 'Acesso às palestras' },
      { nome: 'VIP', preco: 250.00, descricao: 'Experiência completa', beneficios: 'Acesso VIP, certificado, coffee break' }
    ];

    pacotes.forEach(pacote => {
      db.run(`
        INSERT INTO pacotes (evento_id, nome, preco, descricao, beneficios)
        VALUES (?, ?, ?, ?, ?)
      `, [eventoId, pacote.nome, pacote.preco, pacote.descricao, pacote.beneficios]);
    });

    // Inserir inscrições de exemplo
    const inscricoes = [
      {
        participante_nome: 'João Silva',
        participante_email: 'joao@email.com',
        participante_telefone: '11999999999',
        participante_cep: '01310-100',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        status_inscricao: 'confirmada'
      },
      {
        participante_nome: 'Maria Santos',
        participante_email: 'maria@email.com',
        participante_telefone: '11888888888',
        participante_cep: '01415-001',
        modalidade: 'Workshop',
        pacote: 'VIP',
        status_inscricao: 'confirmada'
      },
      {
        participante_nome: 'Pedro Costa',
        participante_email: 'pedro@email.com',
        participante_telefone: '11777777777',
        participante_cep: '01525-000',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        status_inscricao: 'pendente'
      }
    ];

    inscricoes.forEach(inscricao => {
      db.run(`
        INSERT INTO inscricoes (evento_id, participante_nome, participante_email, participante_telefone, participante_cep, modalidade, pacote, status_inscricao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        eventoId,
        inscricao.participante_nome,
        inscricao.participante_email,
        inscricao.participante_telefone,
        inscricao.participante_cep,
        inscricao.modalidade,
        inscricao.pacote,
        inscricao.status_inscricao
      ]);
    });

    // Inserir receitas
    const receitas = [
      { origem: 'inscricao', valor: 100.00, data: '2025-01-15', forma: 'PIX', referencia: 'Inscrição João Silva' },
      { origem: 'inscricao', valor: 250.00, data: '2025-01-16', forma: 'Cartão', referencia: 'Inscrição Maria Santos' },
      { origem: 'venda_extra', valor: 50.00, data: '2025-01-17', forma: 'Dinheiro', referencia: 'Venda adicional' }
    ];

    receitas.forEach(receita => {
      db.run(`
        INSERT INTO receitas (evento_id, origem, valor, data, forma, referencia)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [eventoId, receita.origem, receita.valor, receita.data, receita.forma, receita.referencia]);
    });

    // Inserir despesas
    const despesas = [
      { categoria: 'Local', valor: 5000.00, data: '2025-01-10', fornecedor: 'Centro de Convenções Ltda' },
      { categoria: 'Material', valor: 800.00, data: '2025-01-12', fornecedor: 'Gráfica ABC' }
    ];

    despesas.forEach(despesa => {
      db.run(`
        INSERT INTO despesas (evento_id, categoria, valor, data, fornecedor)
        VALUES (?, ?, ?, ?, ?)
      `, [eventoId, despesa.categoria, despesa.valor, despesa.data, despesa.fornecedor]);
    });

    // Inserir artes
    const artes = [
      { tipo: 'instagram', modelo: 'Post Principal', variaveis: 'titulo,data,local' },
      { tipo: 'certificado', modelo: 'Certificado Padrão', variaveis: 'nome,evento,data' },
      { tipo: 'placa_ouro', modelo: 'Placa Dourada', variaveis: 'homenageado,texto' }
    ];

    artes.forEach(arte => {
      db.run(`
        INSERT INTO artes (evento_id, tipo, modelo, variaveis)
        VALUES (?, ?, ?, ?)
      `, [eventoId, arte.tipo, arte.modelo, arte.variaveis]);
    });

    console.log('Seed concluído com sucesso!');
    console.log(`Evento criado com ID: ${eventoId}`);
  });
}

seedDatabase();
