import React, { useState, useEffect } from 'react';
import {
  HiTruck,
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiClipboardList,
  HiClock,
  HiCheckCircle,
  HiPackage,
  HiArchiveBox,
  HiPaperAirplane,
  HiMapPin,
  HiQrcode,
  HiPrinter,
  HiArrowRight,
  HiArrowLeft
} from 'react-icons/hi';

function ShippingModule() {
  const [envios, setEnvios] = useState([]);
  const [filteredEnvios, setFilteredEnvios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockEnvios = [
      {
        id: 1,
        evento_id: 1,
        inscricao_id: 1,
        destinatario_nome: 'João Silva',
        destinatario_endereco: 'Rua Augusta, 123',
        destinatario_cep: '01310-100',
        status_pipeline: 'preparacao',
        codigo_rastreio: '',
        historico_status: [
          { status: 'preparacao', data: '2025-01-15T10:00:00Z', usuario: 'Operador' }
        ],
        data_criacao: '2025-01-15T10:00:00Z'
      },
      {
        id: 2,
        evento_id: 1,
        inscricao_id: 2,
        destinatario_nome: 'Maria Santos',
        destinatario_endereco: 'Rua Oscar Freire, 456',
        destinatario_cep: '01415-001',
        status_pipeline: 'producao',
        codigo_rastreio: 'BR123456789',
        historico_status: [
          { status: 'preparacao', data: '2025-01-16T09:00:00Z', usuario: 'Operador' },
          { status: 'producao', data: '2025-01-16T14:00:00Z', usuario: 'Produção' }
        ],
        data_criacao: '2025-01-16T09:00:00Z'
      },
      {
        id: 3,
        evento_id: 1,
        destinatario_nome: 'Empresa ABC',
        destinatario_endereco: 'Av. Paulista, 1000',
        destinatario_cep: '01310-100',
        status_pipeline: 'embalado',
        codigo_rastreio: 'BR987654321',
        historico_status: [
          { status: 'preparacao', data: '2025-01-14T08:00:00Z', usuario: 'Operador' },
          { status: 'producao', data: '2025-01-14T16:00:00Z', usuario: 'Produção' },
          { status: 'embalado', data: '2025-01-17T11:00:00Z', usuario: 'Embalagem' }
        ],
        data_criacao: '2025-01-14T08:00:00Z'
      },
      {
        id: 4,
        evento_id: 1,
        destinatario_nome: 'Profissional XYZ',
        destinatario_endereco: 'Rua Haddock Lobo, 789',
        destinatario_cep: '01414-001',
        status_pipeline: 'enviado',
        codigo_rastreio: 'BR555666777',
        historico_status: [
          { status: 'preparacao', data: '2025-01-13T10:00:00Z', usuario: 'Operador' },
          { status: 'producao', data: '2025-01-13T15:00:00Z', usuario: 'Produção' },
          { status: 'embalado', data: '2025-01-16T09:00:00Z', usuario: 'Embalagem' },
          { status: 'enviado', data: '2025-01-17T08:00:00Z', usuario: 'Correios' }
        ],
        data_criacao: '2025-01-13T10:00:00Z'
      },
      {
        id: 5,
        evento_id: 1,
        destinatario_nome: 'Cliente Especial',
        destinatario_endereco: 'Rua Bela Cintra, 321',
        destinatario_cep: '01415-000',
        status_pipeline: 'entrega',
        codigo_rastreio: 'BR111222333',
        historico_status: [
          { status: 'preparacao', data: '2025-01-12T14:00:00Z', usuario: 'Operador' },
          { status: 'producao', data: '2025-01-12T18:00:00Z', usuario: 'Produção' },
          { status: 'embalado', data: '2025-01-15T10:00:00Z', usuario: 'Embalagem' },
          { status: 'enviado', data: '2025-01-16T07:00:00Z', usuario: 'Correios' },
          { status: 'entrega', data: '2025-01-17T16:00:00Z', usuario: 'Entregador' }
        ],
        data_criacao: '2025-01-12T14:00:00Z'
      }
    ];

    setTimeout(() => {
      setEnvios(mockEnvios);
      setFilteredEnvios(mockEnvios);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtros
  useEffect(() => {
    let filtered = envios;

    if (searchTerm) {
      filtered = filtered.filter(envio =>
        envio.destinatario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        envio.codigo_rastreio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(envio => envio.status_pipeline === statusFilter);
    }

    setFilteredEnvios(filtered);
  }, [searchTerm, statusFilter, envios]);

  const handleCreateEnvio = () => {
    setShowCreateModal(true);
  };

  const handleAdvanceStatus = (envioId, newStatus) => {
    setEnvios(prev => prev.map(envio => {
      if (envio.id === envioId) {
        return {
          ...envio,
          status_pipeline: newStatus,
          historico_status: [
            ...envio.historico_status,
            {
              status: newStatus,
              data: new Date().toISOString(),
              usuario: 'Sistema'
            }
          ]
        };
      }
      return envio;
    }));
  };

  const handleRetreatStatus = (envioId, previousStatus) => {
    setEnvios(prev => prev.map(envio => {
      if (envio.id === envioId) {
        return {
          ...envio,
          status_pipeline: previousStatus,
          historico_status: [
            ...envio.historico_status,
            {
              status: previousStatus,
              data: new Date().toISOString(),
              usuario: 'Sistema'
            }
          ]
        };
      }
      return envio;
    }));
  };

  const handleGenerateEtiqueta = (envio) => {
    console.log('Gerar etiqueta para envio:', envio.id);
    // Em produção, geraria PDF da etiqueta
  };

  const handleUpdateTracking = (envioId, codigo) => {
    setEnvios(prev => prev.map(envio =>
      envio.id === envioId ? { ...envio, codigo_rastreio: codigo } : envio
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparacao': return 'bg-yellow-500/20 text-yellow-400';
      case 'producao': return 'bg-blue-500/20 text-blue-400';
      case 'embalado': return 'bg-purple-500/20 text-purple-400';
      case 'enviado': return 'bg-orange-500/20 text-orange-400';
      case 'entrega': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'preparacao': return 'Preparação';
      case 'producao': return 'Produção';
      case 'embalado': return 'Embalado';
      case 'enviado': return 'Enviado';
      case 'entrega': return 'Entrega';
      default: return status;
    }
  };

  const getNextStatus = (currentStatus) => {
    const pipeline = ['preparacao', 'producao', 'embalado', 'enviado', 'entrega'];
    const currentIndex = pipeline.indexOf(currentStatus);
    return currentIndex < pipeline.length - 1 ? pipeline[currentIndex + 1] : null;
  };

  const getPreviousStatus = (currentStatus) => {
    const pipeline = ['preparacao', 'producao', 'embalado', 'enviado', 'entrega'];
    const currentIndex = pipeline.indexOf(currentStatus);
    return currentIndex > 0 ? pipeline[currentIndex - 1] : null;
  };

  const statusColumns = [
    { status: 'preparacao', title: 'Preparação', icon: <HiClipboardList className="w-5 h-5" />, color: 'yellow' },
    { status: 'producao', title: 'Produção', icon: <HiCog className="w-5 h-5" />, color: 'blue' },
    { status: 'embalado', title: 'Embalado', icon: <HiArchiveBox className="w-5 h-5" />, color: 'purple' },
    { status: 'enviado', title: 'Enviado', icon: <HiPaperAirplane className="w-5 h-5" />, color: 'orange' },
    { status: 'entrega', title: 'Entrega', icon: <HiCheckCircle className="w-5 h-5" />, color: 'green' }
  ];

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
          <h1 className="text-3xl font-bold text-white">Envios</h1>
          <p className="text-gray-400 mt-1">Gerencie o pipeline de produção e entrega</p>
        </div>
        <button
          onClick={handleCreateEnvio}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          <HiPlus className="w-5 h-5" />
          <span>Novo Envio</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por destinatário ou código de rastreio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos os Status</option>
            <option value="preparacao">Preparação</option>
            <option value="producao">Produção</option>
            <option value="embalado">Embalado</option>
            <option value="enviado">Enviado</option>
            <option value="entrega">Entrega</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {statusColumns.map(column => {
            const columnEnvios = filteredEnvios.filter(envio => envio.status_pipeline === column.status);

            return (
              <div key={column.status} className="bg-dark-800 rounded-lg border border-dark-700">
                <div className={`p-4 border-b border-dark-700 bg-gradient-to-r from-${column.color}-500/10 to-${column.color}-600/10`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`text-${column.color}-400`}>{column.icon}</span>
                      <h3 className="font-semibold text-white">{column.title}</h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-${column.color}-500/20 text-${column.color}-400`}>
                      {columnEnvios.length}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {columnEnvios.map(envio => (
                    <div key={envio.id} className="bg-dark-950 rounded-lg p-4 border border-dark-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white mb-1">{envio.destinatario_nome}</h4>
                          <p className="text-xs text-gray-400 mb-2">{envio.destinatario_endereco}</p>
                          <p className="text-xs text-gray-400">CEP: {envio.destinatario_cep}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded transition-colors">
                            <HiEye className="w-3 h-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded transition-colors">
                            <HiPencil className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Código de Rastreio */}
                      {envio.codigo_rastreio && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-400 mb-1">Código de Rastreio:</p>
                          <p className="text-xs font-mono text-primary-400">{envio.codigo_rastreio}</p>
                        </div>
                      )}

                      {/* Histórico de Status */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-400 mb-1">Última atualização:</p>
                        <p className="text-xs text-gray-300">
                          {envio.historico_status.length > 0
                            ? new Date(envio.historico_status[envio.historico_status.length - 1].data).toLocaleDateString('pt-BR')
                            : 'N/A'
                          }
                        </p>
                      </div>

                      {/* Botões de Ação */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {getPreviousStatus(envio.status_pipeline) && (
                            <button
                              onClick={() => handleRetreatStatus(envio.id, getPreviousStatus(envio.status_pipeline))}
                              className="p-1 text-gray-400 hover:text-yellow-400 hover:bg-dark-800 rounded transition-colors"
                              title="Voltar status"
                            >
                              <HiArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {getNextStatus(envio.status_pipeline) && (
                            <button
                              onClick={() => handleAdvanceStatus(envio.id, getNextStatus(envio.status_pipeline))}
                              className="p-1 text-gray-400 hover:text-green-400 hover:bg-dark-800 rounded transition-colors"
                              title="Avançar status"
                            >
                              <HiArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleGenerateEtiqueta(envio)}
                            className="p-1 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded transition-colors"
                            title="Gerar etiqueta"
                          >
                            <HiPrinter className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {statusColumns.map(column => {
          const count = filteredEnvios.filter(envio => envio.status_pipeline === column.status).length;
          const percentage = filteredEnvios.length > 0 ? (count / filteredEnvios.length) * 100 : 0;

          return (
            <div key={column.status} className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-${column.color}-400`}>{column.icon}</span>
                <span className="text-2xl font-bold text-white">{count}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{column.title}</p>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div
                  className={`bg-${column.color}-500 h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{percentage.toFixed(1)}% do total</p>
            </div>
          );
        })}
      </div>

      {/* Modal de Criação */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Novo Envio</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Destinatário
                </label>
                <input
                  type="text"
                  placeholder="Nome do destinatário..."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CEP
                </label>
                <input
                  type="text"
                  placeholder="00000-000"
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  placeholder="Endereço completo..."
                  className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors">
                  Criar Envio
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
        </div>
      )}
    </div>
  );
}

export default ShippingModule;

