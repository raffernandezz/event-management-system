import React, { useState, useEffect } from 'react';
import {
  HiFilter,
  HiPlus,
  HiSearch,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiCalendar,
  HiUsers,
  HiCurrencyDollar,
  HiCheckCircle
} from 'react-icons/hi';

function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        nome: 'Evento Principal 2025 - São Paulo',
        data_inicio: '2025-03-15',
        data_fim: '2025-03-17',
        local: 'Centro de Convenções',
        cidade: 'São Paulo',
        modalidade: 'Palestra, Workshop',
        pacotes: 'Padrão, VIP',
        status: 'ativo',
        inscricoes: 45,
        confirmados: 38,
        receitas: 8750.00,
        despesas: 5800.00
      },
      {
        id: 2,
        nome: 'Workshop de Tecnologia 2025',
        data_inicio: '2025-02-20',
        data_fim: '2025-02-20',
        local: 'Auditório Principal',
        cidade: 'Rio de Janeiro',
        modalidade: 'Workshop',
        pacotes: 'Padrão',
        status: 'concluido',
        inscricoes: 120,
        confirmados: 115,
        receitas: 12000.00,
        despesas: 3500.00
      },
      {
        id: 3,
        nome: 'Seminário de Inovação',
        data_inicio: '2025-04-10',
        data_fim: '2025-04-12',
        local: 'Hotel Windsor',
        cidade: 'Brasília',
        modalidade: 'Palestra, Workshop',
        pacotes: 'Básico, Premium, VIP',
        status: 'planejado',
        inscricoes: 0,
        confirmados: 0,
        receitas: 0.00,
        despesas: 1200.00
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtros
  useEffect(() => {
    let filtered = events;

    if (selectedEvent) {
      filtered = filtered.filter(event => event.id === parseInt(selectedEvent));
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.cidade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [selectedEvent, searchTerm, statusFilter, events]);

  const handleCreateEvent = () => {
    // Em produção, abriria modal de criação
    console.log('Criar novo evento');
    setShowCreateModal(false);
  };

  const handleExport = (type) => {
    // Em produção, geraria arquivo e registraria no log de exportação
    console.log(`Exportando ${type} dos eventos filtrados`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-400';
      case 'concluido': return 'bg-blue-500/20 text-blue-400';
      case 'planejado': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelado': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'concluido': return 'Concluído';
      case 'planejado': return 'Planejado';
      case 'cancelado': return 'Cancelado';
      default: return status;
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
          <h1 className="text-3xl font-bold text-white">Gestão de Eventos</h1>
          <p className="text-gray-400 mt-1">Gerencie todos os seus eventos em um só lugar</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <HiPlus className="w-5 h-5" />
          <span>Criar Evento</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar eventos por nome ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os Status</option>
              <option value="ativo">Ativo</option>
              <option value="planejado">Planejado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <HiFilter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Filtros Avançados */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-dark-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Período
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cidade
                </label>
                <select className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Todas as Cidades</option>
                  <option value="sao-paulo">São Paulo</option>
                  <option value="rio-janeiro">Rio de Janeiro</option>
                  <option value="brasilia">Brasília</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Modalidade
                </label>
                <select className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="">Todas as Modalidades</option>
                  <option value="palestra">Palestra</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Eventos</p>
              <p className="text-3xl font-bold text-white">{events.length}</p>
            </div>
            <HiCalendar className="w-8 h-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Inscrições Totais</p>
              <p className="text-3xl font-bold text-white">
                {events.reduce((acc, event) => acc + event.inscricoes, 0)}
              </p>
            </div>
            <HiUsers className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmados</p>
              <p className="text-3xl font-bold text-white">
                {events.reduce((acc, event) => acc + event.confirmados, 0)}
              </p>
            </div>
            <HiCheckCircle className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-3xl font-bold text-white">
                R$ {events.reduce((acc, event) => acc + event.receitas, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiCurrencyDollar className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Tabela de Eventos */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Lista de Eventos</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <HiDownload className="w-4 h-4" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <HiDownload className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <HiDownload className="w-4 h-4" />
              <span>Excel</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Evento
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Local
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Inscrições
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Financeiro
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{event.nome}</div>
                      <div className="text-sm text-gray-400">{event.modalidade}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {new Date(event.data_inicio).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-400">
                      até {new Date(event.data_fim).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{event.local}</div>
                    <div className="text-sm text-gray-400">{event.cidade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-white">{event.inscricoes}</div>
                    <div className="text-sm text-gray-400">{event.confirmados} confirmados</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-green-400">
                      R$ {event.receitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-red-400">
                      R$ {event.despesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <HiCalendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-400">Nenhum evento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter ? 'Tente ajustar os filtros.' : 'Comece criando seu primeiro evento.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Criar Novo Evento</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do Evento
                </label>
                <input
                  type="text"
                  placeholder="Digite o nome do evento..."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Local
                </label>
                <input
                  type="text"
                  placeholder="Digite o local..."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data de Início
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data de Fim
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  placeholder="Digite a cidade..."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option value="planejado">Planejado</option>
                  <option value="ativo">Ativo</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCreateEvent}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
              >
                Criar Evento
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-gray-300 font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDashboard;

