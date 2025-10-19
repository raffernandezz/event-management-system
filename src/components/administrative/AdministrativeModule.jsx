import React, { useState, useEffect } from 'react';
import {
  HiCog,
  HiDocumentText,
  HiLocationMarker,
  HiTag,
  HiArchive,
  HiUsers,
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiClipboardList,
  HiChat,
  HiBuilding,
  HiTemplate
} from 'react-icons/hi';

function AdministrativeModule() {
  const [activeTab, setActiveTab] = useState('listas');
  const [listas, setListas] = useState([]);
  const [observacoes, setObservacoes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockListas = [
      {
        id: 1,
        nome: 'Materiais do Evento',
        tipo: 'materiais',
        itens: ['Projetor', 'Microfone', 'Computador', 'Extensão elétrica'],
        evento_id: 1,
        de_chamada: false
      },
      {
        id: 2,
        nome: 'Convidados VIP',
        tipo: 'convidados',
        itens: ['João Silva (CEO)', 'Maria Santos (Diretora)', 'Pedro Costa (Gerente)'],
        evento_id: 1,
        de_chamada: true
      },
      {
        id: 3,
        nome: 'Credenciais de Acesso',
        tipo: 'credenciais',
        itens: ['Credencial Palestrante', 'Credencial Organização', 'Credencial Imprensa'],
        evento_id: 1,
        de_chamada: false
      }
    ];

    const mockObservacoes = [
      {
        id: 1,
        evento_id: 1,
        alvo_tipo: 'inscricao',
        alvo_id: 1,
        texto: 'Cliente solicitou certificado adicional para empresa parceira',
        autor: 'Administrador',
        timestamp: '2025-01-15T10:30:00Z'
      },
      {
        id: 2,
        evento_id: 1,
        alvo_tipo: 'envio',
        alvo_id: 1,
        texto: 'Cliente mudou endereço de entrega',
        autor: 'Operador',
        timestamp: '2025-01-16T14:20:00Z'
      }
    ];

    const mockCidades = [
      { id: 1, nome: 'São Paulo', uf: 'SP', pais: 'Brasil' },
      { id: 2, nome: 'Rio de Janeiro', uf: 'RJ', pais: 'Brasil' },
      { id: 3, nome: 'Belo Horizonte', uf: 'MG', pais: 'Brasil' }
    ];

    const mockModalidades = [
      {
        id: 1,
        evento_id: 1,
        nome: 'Palestra',
        descricao: 'Palestra principal sobre tecnologia',
        capacidade: 500,
        regras: 'Inscrição obrigatória, certificado incluso'
      },
      {
        id: 2,
        evento_id: 1,
        nome: 'Workshop',
        descricao: 'Workshop prático de desenvolvimento',
        capacidade: 100,
        regras: 'Material incluso, limite de participantes'
      }
    ];

    const mockPacotes = [
      {
        id: 1,
        evento_id: 1,
        nome: 'Padrão',
        preco: 100.00,
        descricao: 'Acesso básico ao evento',
        beneficios: 'Acesso às palestras, coffee break'
      },
      {
        id: 2,
        evento_id: 1,
        nome: 'VIP',
        preco: 250.00,
        descricao: 'Experiência completa',
        beneficios: 'Acesso VIP, certificado, material exclusivo, jantar'
      }
    ];

    const mockUsuarios = [
      {
        id: 1,
        nome: 'Administrador',
        email: 'admin@evento.com',
        perfil: 'Admin',
        ativo: true
      },
      {
        id: 2,
        nome: 'Operador Portaria',
        email: 'portaria@evento.com',
        perfil: 'Operador',
        ativo: true
      },
      {
        id: 3,
        nome: 'Financeiro',
        email: 'financeiro@evento.com',
        perfil: 'Financeiro',
        ativo: true
      }
    ];

    setTimeout(() => {
      setListas(mockListas);
      setObservacoes(mockObservacoes);
      setCidades(mockCidades);
      setModalidades(mockModalidades);
      setPacotes(mockPacotes);
      setUsuarios(mockUsuarios);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateLista = () => {
    console.log('Criar nova lista');
  };

  const handleCreateObservacao = () => {
    console.log('Criar nova observação');
  };

  const handleCreateCidade = () => {
    console.log('Criar nova cidade');
  };

  const handleCreateModalidade = () => {
    console.log('Criar nova modalidade');
  };

  const handleCreatePacote = () => {
    console.log('Criar novo pacote');
  };

  const handleCreateUsuario = () => {
    console.log('Criar novo usuário');
  };

  const tabs = [
    { id: 'listas', label: 'Listas', icon: <HiClipboardList className="w-5 h-5" />, count: listas.length },
    { id: 'observacoes', label: 'Observações', icon: <HiChat className="w-5 h-5" />, count: observacoes.length },
    { id: 'cidades', label: 'Cidades', icon: <HiLocationMarker className="w-5 h-5" />, count: cidades.length },
    { id: 'modalidades', label: 'Modalidades', icon: <HiTemplate className="w-5 h-5" />, count: modalidades.length },
    { id: 'pacotes', label: 'Pacotes', icon: <HiTag className="w-5 h-5" />, count: pacotes.length },
    { id: 'usuarios', label: 'Usuários', icon: <HiUsers className="w-5 h-5" />, count: usuarios.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'listas':
        return <ListasTab listas={listas} onCreate={handleCreateLista} />;
      case 'observacoes':
        return <ObservacoesTab observacoes={observacoes} onCreate={handleCreateObservacao} />;
      case 'cidades':
        return <CidadesTab cidades={cidades} onCreate={handleCreateCidade} />;
      case 'modalidades':
        return <ModalidadesTab modalidades={modalidades} onCreate={handleCreateModalidade} />;
      case 'pacotes':
        return <PacotesTab pacotes={pacotes} onCreate={handleCreatePacote} />;
      case 'usuarios':
        return <UsuariosTab usuarios={usuarios} onCreate={handleCreateUsuario} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Administrativo</h1>
          <p className="text-gray-400 mt-1">Gerencie configurações e dados do sistema</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-dark-900 rounded-xl border border-dark-700">
        <div className="flex border-b border-dark-700 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-800'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-primary-500/20 text-primary-400' : 'bg-dark-800 text-gray-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

// Componente para a aba de Listas
function ListasTab({ listas, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Listas Operacionais</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Lista</span>
        </button>
      </div>

      <div className="grid gap-6">
        {listas.map(lista => (
          <div key={lista.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">{lista.nome}</h3>
                <p className="text-gray-400 mt-1">Tipo: {lista.tipo}</p>
                {lista.de_chamada && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 mt-2">
                    Lista de Chamada
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Itens ({lista.itens.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {lista.itens.map((item, index) => (
                  <div key={index} className="bg-dark-900 rounded-lg p-3 border border-dark-700">
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para a aba de Observações
function ObservacoesTab({ observacoes, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Observações</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Observação</span>
        </button>
      </div>

      <div className="space-y-4">
        {observacoes.map(observacao => (
          <div key={observacao.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white mb-2">{observacao.texto}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Por: {observacao.autor}</span>
                  <span>Em: {new Date(observacao.timestamp).toLocaleString('pt-BR')}</span>
                  <span>Tipo: {observacao.alvo_tipo}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para a aba de Cidades
function CidadesTab({ cidades, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Cidades</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Cidade</span>
        </button>
      </div>

      <div className="grid gap-4">
        {cidades.map(cidade => (
          <div key={cidade.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">{cidade.nome}</h3>
                <p className="text-gray-400">{cidade.uf} - {cidade.pais}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para a aba de Modalidades
function ModalidadesTab({ modalidades, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Modalidades</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Modalidade</span>
        </button>
      </div>

      <div className="grid gap-4">
        {modalidades.map(modalidade => (
          <div key={modalidade.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{modalidade.nome}</h3>
                <p className="text-gray-400 mt-1">{modalidade.descricao}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                  <span>Capacidade: {modalidade.capacidade}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">Regras: {modalidade.regras}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para a aba de Pacotes
function PacotesTab({ pacotes, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Pacotes</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Novo Pacote</span>
        </button>
      </div>

      <div className="grid gap-4">
        {pacotes.map(pacote => (
          <div key={pacote.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white">{pacote.nome}</h3>
                <p className="text-gray-400 mt-1">{pacote.descricao}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-400">
                  <span className="text-primary-400 font-semibold">R$ {pacote.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300">Benefícios: {pacote.beneficios}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para a aba de Usuários
function UsuariosTab({ usuarios, onCreate }) {
  const getPerfilColor = (perfil) => {
    switch (perfil) {
      case 'Admin': return 'bg-red-500/20 text-red-400';
      case 'Operador': return 'bg-blue-500/20 text-blue-400';
      case 'Financeiro': return 'bg-green-500/20 text-green-400';
      case 'Designer': return 'bg-purple-500/20 text-purple-400';
      case 'Leitor': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Usuários</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Novo Usuário</span>
        </button>
      </div>

      <div className="grid gap-4">
        {usuarios.map(usuario => (
          <div key={usuario.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-black font-semibold">
                  {usuario.nome.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{usuario.nome}</h3>
                  <p className="text-gray-400">{usuario.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerfilColor(usuario.perfil)}`}>
                      {usuario.perfil}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      usuario.ativo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {usuario.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiEye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdministrativeModule;

