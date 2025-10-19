import React, { useState, useContext } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
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
  HiDocumentText,
  HiClipboardList,
  HiChat,
  HiLocationMarker,
  HiTag,
  HiUserGroup,
  HiTemplate,
  HiPrinter,
  HiEye,
  HiPencil,
  HiDownload,
  HiArchive,
  HiCreditCard,
  HiReceiptRefund,
  HiQrcode,
  HiPhone,
  HiUser,
  HiDocument,
  HiSparkles,
  HiOfficeBuilding,
  HiPresentationChartBar,
  HiClipboard,
  HiNewspaper,
  HiPhotograph,
  HiBadgeCheck,
  HiTrophy,
  HiCog as HiCogIcon,
  HiDatabase,
  HiExclamationTriangle,
  HiCheck,
  HiX,
  HiArrowRight,
  HiArrowLeft
} from 'react-icons/hi';
import { EventContext } from '../../Layout';

function EventManagementDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');
  const { selectedEvent, events } = useContext(EventContext);

  // Não mostrar nada se não há evento selecionado
  if (!selectedEvent) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <HiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Nenhum Evento Selecionado</h3>
          <p className="text-gray-400">Selecione um evento ativo para continuar</p>
        </div>
      </div>
    );
  }

  const selectedEventData = events.find(e => e.id.toString() === selectedEvent);

  // Estrutura da sidebar conforme especificado
  const sidebarModules = [
    {
      category: 'Central de Confirmações',
      icon: <HiCheckCircle className="w-5 h-5" />,
      items: [
        { id: 'confirmacoes-confirmados', name: 'Confirmados', icon: <HiCheckCircle className="w-4 h-4" /> },
        { id: 'confirmacoes-vendas', name: 'Vendas', icon: <HiPresentationChartBar className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Artes & Certificados',
      icon: <HiPalette className="w-5 h-5" />,
      items: [
        { id: 'artes-instagram', name: 'Artes Instagram', icon: <HiPhotograph className="w-4 h-4" /> },
        { id: 'artes-certificados', name: 'Certificados', icon: <HiBadgeCheck className="w-4 h-4" /> },
        { id: 'artes-placas', name: 'Placa Ouro', icon: <HiTrophy className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Administrativo',
      icon: <HiCogIcon className="w-5 h-5" />,
      items: [
        { id: 'admin-listas', name: 'Listas', icon: <HiClipboardList className="w-4 h-4" /> },
        { id: 'admin-observacoes', name: 'Observações', icon: <HiChat className="w-4 h-4" /> },
        { id: 'admin-cidades', name: 'Cidades', icon: <HiLocationMarker className="w-4 h-4" /> },
        { id: 'admin-modalidades', name: 'Modalidades', icon: <HiTemplate className="w-4 h-4" /> },
        { id: 'admin-inscricoes', name: 'Inscrições', icon: <HiUserGroup className="w-4 h-4" /> },
        { id: 'admin-pacotes', name: 'Pacotes', icon: <HiTag className="w-4 h-4" /> },
        { id: 'admin-usuarios', name: 'Usuários', icon: <HiUsers className="w-4 h-4" /> },
        { id: 'admin-pdfs', name: 'Administrar PDFs', icon: <HiDocument className="w-4 h-4" /> },
        { id: 'admin-auditoria', name: 'Auditoria', icon: <HiChartBar className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Envios',
      icon: <HiTruck className="w-5 h-5" />,
      items: [
        { id: 'envios-preparacao', name: 'Preparação', icon: <HiClipboard className="w-4 h-4" /> },
        { id: 'envios-producao', name: 'Produção', icon: <HiCogIcon className="w-4 h-4" /> },
        { id: 'envios-embalado', name: 'Embalado', icon: <HiArchive className="w-4 h-4" /> },
        { id: 'envios-enviado', name: 'Enviado', icon: <HiArrowRight className="w-4 h-4" /> },
        { id: 'envios-entrega', name: 'Entrega', icon: <HiCheck className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Financeiro',
      icon: <HiCurrencyDollar className="w-5 h-5" />,
      items: [
        { id: 'financeiro-receitas', name: 'Receitas', icon: <HiArrowUp className="w-4 h-4" /> },
        { id: 'financeiro-despesas', name: 'Despesas', icon: <HiArrowDown className="w-4 h-4" /> },
        { id: 'financeiro-resumos', name: 'Resumos', icon: <HiChartBar className="w-4 h-4" /> },
        { id: 'financeiro-notas', name: 'Notas Fiscais', icon: <HiDocumentText className="w-4 h-4" /> }
      ]
    },
    {
      category: 'Portaria',
      icon: <HiShieldCheck className="w-5 h-5" />,
      items: [
        { id: 'portaria-recepcao', name: 'Recepção', icon: <HiUser className="w-4 h-4" /> },
        { id: 'portaria-conferencia', name: 'Conferência', icon: <HiCheckCircle className="w-4 h-4" /> },
        { id: 'portaria-chamada', name: 'Chamada', icon: <HiPhone className="w-4 h-4" /> }
      ]
    }
  ];

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardContent />;
      case 'confirmacoes-confirmados':
        return <ConfirmadosContent />;
      case 'confirmacoes-vendas':
        return <VendasContent />;
      case 'artes-instagram':
        return <ArtesInstagramContent />;
      case 'artes-certificados':
        return <CertificadosContent />;
      case 'artes-placas':
        return <PlacasOuroContent />;
      case 'admin-listas':
        return <ListasContent />;
      case 'admin-observacoes':
        return <ObservacoesContent />;
      case 'admin-cidades':
        return <CidadesContent />;
      case 'admin-modalidades':
        return <ModalidadesContent />;
      case 'admin-inscricoes':
        return <InscricoesAdminContent />;
      case 'admin-pacotes':
        return <PacotesContent />;
      case 'admin-usuarios':
        return <UsuariosContent />;
      case 'admin-pdfs':
        return <PDFsContent />;
      case 'admin-auditoria':
        return <AuditoriaContent />;
      case 'envios-preparacao':
        return <EnviosPreparacaoContent />;
      case 'envios-producao':
        return <EnviosProducaoContent />;
      case 'envios-embalado':
        return <EnviosEmbaladoContent />;
      case 'envios-enviado':
        return <EnviosEnviadoContent />;
      case 'envios-entrega':
        return <EnviosEntregaContent />;
      case 'financeiro-receitas':
        return <ReceitasContent />;
      case 'financeiro-despesas':
        return <DespesasContent />;
      case 'financeiro-resumos':
        return <ResumosContent />;
      case 'financeiro-notas':
        return <NotasFiscaisContent />;
      case 'portaria-recepcao':
        return <RecepcaoContent />;
      case 'portaria-conferencia':
        return <ConferenciaContent />;
      case 'portaria-chamada':
        return <ChamadaContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-full bg-dark-950">
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-80' : 'w-20'}
        bg-dark-900 border-r border-dark-700 transition-all duration-300 flex flex-col
      `}>
        {/* Header da Sidebar */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <HiCalendar className="w-4 h-4 text-black" />
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="text-sm font-bold text-white">Gestão de Eventos</h2>
                  <p className="text-xs text-gray-400">{selectedEventData?.nome}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <HiChevronLeft className="w-4 h-4" /> : <HiChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {sidebarModules.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-primary-400">
                  {category.icon}
                </div>
                {sidebarOpen && (
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    {category.category}
                  </h3>
                )}
              </div>

              {/* Category Items */}
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleModuleClick(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${activeModule === item.id
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-dark-800'
                      }
                    `}
                  >
                    <div className={activeModule === item.id ? 'text-primary-400' : 'text-gray-400'}>
                      {item.icon}
                    </div>
                    {sidebarOpen && (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-dark-900 border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">
                {getModuleTitle(activeModule)}
              </h1>
              {sidebarOpen && (
                <div className="text-sm text-gray-400">
                  Evento: {selectedEventData?.nome}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 hover:text-white rounded-lg transition-colors">
                <HiDownload className="w-4 h-4 inline mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para obter título do módulo
function getModuleTitle(moduleId) {
  const titles = {
    'dashboard': 'Dashboard',
    'confirmacoes-confirmados': 'Confirmados',
    'confirmacoes-vendas': 'Vendas',
    'artes-instagram': 'Artes Instagram',
    'artes-certificados': 'Certificados',
    'artes-placas': 'Placas Ouro',
    'admin-listas': 'Listas',
    'admin-observacoes': 'Observações',
    'admin-cidades': 'Cidades',
    'admin-modalidades': 'Modalidades',
    'admin-inscricoes': 'Inscrições',
    'admin-pacotes': 'Pacotes',
    'admin-usuarios': 'Usuários',
    'admin-pdfs': 'Administrar PDFs',
    'admin-auditoria': 'Auditoria',
    'envios-preparacao': 'Preparação',
    'envios-producao': 'Produção',
    'envios-embalado': 'Embalado',
    'envios-enviado': 'Enviado',
    'envios-entrega': 'Entrega',
    'financeiro-receitas': 'Receitas',
    'financeiro-despesas': 'Despesas',
    'financeiro-resumos': 'Resumos',
    'financeiro-notas': 'Notas Fiscais',
    'portaria-recepcao': 'Recepção',
    'portaria-conferencia': 'Conferência',
    'portaria-chamada': 'Chamada'
  };
  return titles[moduleId] || 'Dashboard';
}

// Componentes de conteúdo para cada módulo (placeholders)
function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Inscrições</p>
              <p className="text-3xl font-bold text-white">156</p>
            </div>
            <HiUsers className="w-8 h-8 text-primary-400" />
          </div>
        </div>
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmadas</p>
              <p className="text-3xl font-bold text-green-400">142</p>
            </div>
            <HiCheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-3xl font-bold text-primary-400">R$ 15.600,00</p>
            </div>
            <HiCurrencyDollar className="w-8 h-8 text-primary-400" />
          </div>
        </div>
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Envios Pendentes</p>
              <p className="text-3xl font-bold text-yellow-400">8</p>
            </div>
            <HiTruck className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmadosContent() {
  return <div className="text-white">Conteúdo de Confirmados</div>;
}

function VendasContent() {
  return <div className="text-white">Conteúdo de Vendas</div>;
}

function ArtesInstagramContent() {
  return <div className="text-white">Conteúdo de Artes Instagram</div>;
}

function CertificadosContent() {
  return <div className="text-white">Conteúdo de Certificados</div>;
}

function PlacasOuroContent() {
  return <div className="text-white">Conteúdo de Placas Ouro</div>;
}

function ListasContent() {
  return <div className="text-white">Conteúdo de Listas</div>;
}

function ObservacoesContent() {
  return <div className="text-white">Conteúdo de Observações</div>;
}

function CidadesContent() {
  return <div className="text-white">Conteúdo de Cidades</div>;
}

function ModalidadesContent() {
  return <div className="text-white">Conteúdo de Modalidades</div>;
}

function InscricoesAdminContent() {
  return <div className="text-white">Conteúdo de Inscrições (Admin)</div>;
}

function PacotesContent() {
  return <div className="text-white">Conteúdo de Pacotes</div>;
}

function UsuariosContent() {
  return <div className="text-white">Conteúdo de Usuários</div>;
}

function PDFsContent() {
  return <div className="text-white">Conteúdo de Administrar PDFs</div>;
}

function AuditoriaContent() {
  return <div className="text-white">Conteúdo de Auditoria</div>;
}

function EnviosPreparacaoContent() {
  return <div className="text-white">Conteúdo de Envios - Preparação</div>;
}

function EnviosProducaoContent() {
  return <div className="text-white">Conteúdo de Envios - Produção</div>;
}

function EnviosEmbaladoContent() {
  return <div className="text-white">Conteúdo de Envios - Embalado</div>;
}

function EnviosEnviadoContent() {
  return <div className="text-white">Conteúdo de Envios - Enviado</div>;
}

function EnviosEntregaContent() {
  return <div className="text-white">Conteúdo de Envios - Entrega</div>;
}

function ReceitasContent() {
  return <div className="text-white">Conteúdo de Receitas</div>;
}

function DespesasContent() {
  return <div className="text-white">Conteúdo de Despesas</div>;
}

function ResumosContent() {
  return <div className="text-white">Conteúdo de Resumos</div>;
}

function NotasFiscaisContent() {
  return <div className="text-white">Conteúdo de Notas Fiscais</div>;
}

function RecepcaoContent() {
  return <div className="text-white">Conteúdo de Recepção</div>;
}

function ConferenciaContent() {
  return <div className="text-white">Conteúdo de Conferência</div>;
}

function ChamadaContent() {
  return <div className="text-white">Conteúdo de Chamada</div>;
}

export default EventManagementDashboard;

