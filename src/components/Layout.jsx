import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiMenu,
  HiX,
  HiHome,
  HiUsers,
  HiCheckCircle,
  HiPalette,
  HiCog,
  HiTruck,
  HiCurrencyDollar,
  HiShieldCheck,
  HiCalendar,
  HiChartBar,
  HiPrinter,
  HiLogout,
  HiChevronLeft,
  HiUserCircle,
  HiTemplate,
  HiDocumentText,
  HiLocationMarker,
  HiTag,
  HiArchive,
  HiEye,
  HiPlus,
} from 'react-icons/hi';

// Contexto para gerenciar o evento ativo globalmente
export const EventContext = createContext({
  selectedEvent: '',
  setSelectedEvent: () => {},
  events: [],
  createEvent: () => {},
  loading: false
});

const drawerWidth = 280;

const menuItems = [
  {
    text: 'Dashboard',
    icon: <HiHome className="w-5 h-5" />,
    path: '/dashboard',
    category: 'principal',
  },
  {
    text: 'Inscrições',
    icon: <HiUsers className="w-5 h-5" />,
    path: '/inscricoes',
    category: 'cadastros',
  },
  {
    text: 'Central de Confirmações',
    icon: <HiCheckCircle className="w-5 h-5" />,
    path: '/confirmacoes',
    category: 'cadastros',
    subItems: [
      { text: 'Confirmados', path: '/confirmacoes/confirmados' },
      { text: 'Vendas', path: '/confirmacoes/vendas' },
    ],
  },
  {
    text: 'Artes & Certificados',
    icon: <HiPalette className="w-5 h-5" />,
    path: '/artes',
    category: 'design',
    subItems: [
      { text: 'Artes Instagram', path: '/artes/instagram' },
      { text: 'Certificados', path: '/artes/certificados' },
      { text: 'Placa Ouro', path: '/artes/placa-ouro' },
    ],
  },
  {
    text: 'Administrativo',
    icon: <HiCog className="w-5 h-5" />,
    path: '/administrativo',
    category: 'admin',
    subItems: [
      { text: 'Listas', path: '/administrativo/listas' },
      { text: 'Observações', path: '/administrativo/observacoes' },
      { text: 'Cidades', path: '/administrativo/cidades' },
      { text: 'Modalidades', path: '/administrativo/modalidades' },
      { text: 'Pacotes', path: '/administrativo/pacotes' },
      { text: 'Usuários', path: '/administrativo/usuarios' },
    ],
  },
  {
    text: 'Envios',
    icon: <HiTruck className="w-5 h-5" />,
    path: '/envios',
    category: 'logistica',
  },
  {
    text: 'Portaria',
    icon: <HiShieldCheck className="w-5 h-5" />,
    path: '/portaria',
    category: 'operacional',
    subItems: [
      { text: 'Recepção', path: '/portaria/recepcao' },
      { text: 'Conferência', path: '/portaria/conferencia' },
      { text: 'Chamada', path: '/portaria/chamada' },
    ],
  },
  {
    text: 'Calendário',
    icon: <HiCalendar className="w-5 h-5" />,
    path: '/calendario',
    category: 'principal',
  },
  {
    text: 'Financeiro',
    icon: <HiCurrencyDollar className="w-5 h-5" />,
    path: '/financeiro',
    category: 'financeiro',
    subItems: [
      { text: 'Receitas', path: '/financeiro/receitas' },
      { text: 'Despesas', path: '/financeiro/despesas' },
      { text: 'Resumos', path: '/financeiro/resumos' },
      { text: 'Notas Fiscais', path: '/financeiro/notas-fiscais' },
    ],
  },
  {
    text: 'Auditoria',
    icon: <HiChartBar className="w-5 h-5" />,
    path: '/auditoria',
    category: 'admin',
  },
];

// Componente interno do Layout (sem contexto)
function LayoutContent({ children, user, onLogout }) {
  const [open, setOpen] = useState(true);
  const { selectedEvent, setSelectedEvent, events, createEvent, loading } = useContext(EventContext);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleCreateEvent = () => {
    setShowCreateEventModal(true);
  };

  const getUserPermissions = (perfil) => {
    switch (perfil) {
      case 'Admin':
        return menuItems;
      case 'Operador':
        return menuItems.filter(item =>
          item.category === 'cadastros' || item.category === 'operacional'
        );
      case 'Financeiro':
        return menuItems.filter(item =>
          item.category === 'financeiro' || item.text === 'Dashboard'
        );
      case 'Designer':
        return menuItems.filter(item =>
          item.category === 'design' || item.text === 'Dashboard'
        );
      case 'Leitor':
        return menuItems.filter(item =>
          item.text === 'Dashboard' || item.path === '/auditoria'
        );
      default:
        return [];
    }
  };

  const allowedMenuItems = getUserPermissions(user.perfil);

  // Estado para formulário de criação de evento
  const [newEventData, setNewEventData] = useState({
    nome: '',
    data_inicio: '',
    data_fim: '',
    local: '',
    cidade: ''
  });

  const handleCreateEventSubmit = () => {
    if (newEventData.nome && newEventData.data_inicio && newEventData.data_fim) {
      createEvent(newEventData);
      setNewEventData({
        nome: '',
        data_inicio: '',
        data_fim: '',
        local: '',
        cidade: ''
      });
      setShowCreateEventModal(false);
    }
  };

  const selectedEventData = events.find(e => e.id.toString() === selectedEvent);

  const drawer = (
    <div className="h-full bg-dark-900 border-r border-dark-700">
      {/* BOTÃO VOLTAR AO HUB - SUPER VISÍVEL */}
      <div className="p-2 bg-red-500 border-b-4 border-red-600">
        <button 
          onClick={() => navigate('/hub')}
          className="w-full flex items-center justify-center p-6 text-center text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-black text-2xl shadow-2xl border-4 border-white"
        >
          <HiChevronLeft className="w-8 h-8 mr-3" />
          🏠 VOLTAR AO HUB 🏠
        </button>
      </div>
      
      <div className="p-4 flex items-center border-b border-dark-700">
        <h2 className="text-lg font-bold text-primary-500">
          Gestão de Eventos
        </h2>
      </div>
      <nav className="p-2">
        {allowedMenuItems.map((item) => (
          <div key={item.text} className="mb-1">
            <button className="w-full flex items-center p-3 text-left text-gray-300 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
              <span className="mr-3 text-primary-400">
                  {item.icon}
              </span>
              <span className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                {item.text}
              </span>
            </button>
            {item.subItems && open && (
              <div className="ml-6 space-y-1">
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.text}
                    className="w-full text-left p-2 text-sm text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded transition-colors"
                  >
                    {subItem.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <EventProvider user={user}>
      <div className="flex min-h-screen bg-dark-950">
        {/* Sidebar */}
        <div className={`
          ${open ? 'w-72' : 'w-0'}
          transition-all duration-300 ease-in-out overflow-hidden
          border-r border-dark-700 bg-dark-900
        `}>
          {drawer}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className={`
            ${open ? 'ml-72' : 'ml-0'}
            transition-all duration-300 ease-in-out
            bg-dark-900 border-b border-dark-700 px-4 py-3
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDrawerToggle}
                  className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  {open ? <HiChevronLeft className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
                </button>
                <h1 className="text-xl font-semibold text-white">
                  Sistema de Gestão de Eventos
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                {/* Event Selector */}
                <div className="min-w-64">
                  <select
                    value={selectedEvent}
                    onChange={handleEventChange}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="">
                      {loading ? 'Carregando eventos...' : 'Selecionar Evento'}
                    </option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>
                        {event.nome} - {event.cidade}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botão Criar Evento */}
                <button
                  onClick={handleCreateEvent}
                  disabled={loading}
                  className="flex items-center space-x-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Criar Novo Evento"
                >
                  <HiPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Novo Evento</span>
                </button>

                {/* Info do Evento Selecionado */}
                {selectedEventData && (
                  <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-dark-800 rounded-lg border border-dark-700">
                    <HiCalendar className="w-4 h-4 text-primary-400" />
                    <div className="text-sm">
                      <div className="text-white font-medium">{selectedEventData.nome}</div>
                      <div className="text-gray-400 text-xs">
                        {new Date(selectedEventData.data_inicio).toLocaleDateString('pt-BR')} - {new Date(selectedEventData.data_fim).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                )}

                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-black font-semibold">
                    {user.nome.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white">{user.nome}</p>
                    <span className="text-xs px-2 py-1 bg-primary-500 text-black rounded-full">
                      {user.perfil}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <HiLogout className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className={`
            ${open ? 'ml-72' : 'ml-0'}
            transition-all duration-300 ease-in-out
            flex-1 p-6 bg-dark-950
          `}>
            {children}
          </main>
        </div>

        {/* Modal de Criação de Evento */}
        {showCreateEventModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Criar Novo Evento</h3>
                <button
                  onClick={() => setShowCreateEventModal(false)}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome do Evento *
                  </label>
                  <input
                    type="text"
                    value={newEventData.nome}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Digite o nome do evento..."
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data de Início *
                    </label>
                    <input
                      type="date"
                      value={newEventData.data_inicio}
                      onChange={(e) => setNewEventData(prev => ({ ...prev, data_inicio: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data de Fim *
                    </label>
                    <input
                      type="date"
                      value={newEventData.data_fim}
                      onChange={(e) => setNewEventData(prev => ({ ...prev, data_fim: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Local
                  </label>
                  <input
                    type="text"
                    value={newEventData.local}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, local: e.target.value }))}
                    placeholder="Digite o local do evento..."
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={newEventData.cidade}
                    onChange={(e) => setNewEventData(prev => ({ ...prev, cidade: e.target.value }))}
                    placeholder="Digite a cidade..."
                    className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleCreateEventSubmit}
                    disabled={!newEventData.nome || !newEventData.data_inicio || !newEventData.data_fim}
                    className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-medium rounded-lg transition-colors"
                  >
                    Criar Evento
                  </button>
                  <button
                    onClick={() => setShowCreateEventModal(false)}
                    className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 font-medium rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EventProvider>
  );
}

// Componente Provider do Contexto de Evento
function EventProvider({ children, user }) {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar eventos do banco de dados
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Em produção, seria uma chamada para API
        const mockEvents = [
          {
            id: 1,
            nome: 'Evento Principal 2025 - São Paulo',
            data_inicio: '2025-03-15',
            data_fim: '2025-03-17',
            local: 'Centro de Convenções',
            cidade: 'São Paulo',
            status: 'ativo'
          },
          {
            id: 2,
            nome: 'Workshop de Tecnologia 2025',
            data_inicio: '2025-02-20',
            data_fim: '2025-02-20',
            local: 'Auditório Principal',
            cidade: 'Rio de Janeiro',
            status: 'concluido'
          }
        ];

        setTimeout(() => {
          setEvents(mockEvents);
          // Selecionar automaticamente o primeiro evento ativo se nenhum estiver selecionado
          if (!selectedEvent && mockEvents.length > 0) {
            const activeEvent = mockEvents.find(e => e.status === 'ativo');
            if (activeEvent) {
              setSelectedEvent(activeEvent.id.toString());
            }
          }
        }, 500);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const createEvent = async (eventData) => {
    setLoading(true);
    try {
      // Em produção, seria uma chamada para API
      const newEvent = {
        id: Date.now(),
        ...eventData,
        status: 'ativo',
        created_at: new Date().toISOString()
      };

      setEvents(prev => [...prev, newEvent]);
      setSelectedEvent(newEvent.id.toString());

      // Em produção, salvar no banco de dados
      console.log('Evento criado:', newEvent);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    selectedEvent,
    setSelectedEvent,
    events,
    createEvent,
    loading
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

function Layout({ children, user, onLogout }) {
  return <LayoutContent children={children} user={user} onLogout={onLogout} />;
}

export default Layout;
