import React, { useState, useEffect } from 'react';
import {
  HiCheckCircle,
  HiCurrencyDollar,
  HiUsers,
  HiCalendar,
  HiMail,
  HiDownload,
  HiFilter,
  HiSearch,
  HiEye,
  HiPencil,
  HiCheck,
  HiX,
  HiTrendingUp,
  HiChartBar
} from 'react-icons/hi';

function ConfirmationCenter() {
  const [activeTab, setActiveTab] = useState('confirmados');
  const [confirmedInscriptions, setConfirmedInscriptions] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockConfirmedInscriptions = [
      {
        id: 1,
        participante_nome: 'João Silva',
        participante_email: 'joao@email.com',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        valor: 100.00,
        data_confirmacao: '2025-01-15',
        canal: 'site',
        vendedor: 'Sistema',
        status: 'confirmada',
        premios: [
          {
            colocacao: '1',
            nome_empresa_profissional: 'Empresa ABC',
            categoria_certificado: 'Melhor Produto',
            instagram: '@empresa_abc',
            certificado_junto: true
          }
        ]
      },
      {
        id: 2,
        participante_nome: 'Maria Santos',
        participante_email: 'maria@email.com',
        modalidade: 'Workshop',
        pacote: 'VIP',
        valor: 250.00,
        data_confirmacao: '2025-01-16',
        canal: 'manual',
        vendedor: 'Vendedor A',
        status: 'confirmada',
        premios: [
          {
            colocacao: '2',
            nome_empresa_profissional: 'Profissional XYZ',
            categoria_certificado: 'Inovação',
            instagram: '@profissional_xyz',
            certificado_junto: false,
            incluir_separado: true
          }
        ]
      },
      {
        id: 3,
        participante_nome: 'Pedro Costa',
        participante_email: 'pedro@email.com',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        valor: 100.00,
        data_confirmacao: '2025-01-17',
        canal: 'site',
        vendedor: 'Sistema',
        status: 'pendente',
        premios: []
      }
    ];

    const mockSalesData = [
      { periodo: 'Jan 2025', receitas_inscricoes: 450.00, vendas_extras: 150.00, total: 600.00 },
      { periodo: 'Fev 2025', receitas_inscricoes: 1200.00, vendas_extras: 300.00, total: 1500.00 },
      { periodo: 'Mar 2025', receitas_inscricoes: 8750.00, vendas_extras: 500.00, total: 9250.00 }
    ];

    setTimeout(() => {
      setConfirmedInscriptions(mockConfirmedInscriptions);
      setSalesData(mockSalesData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtros para confirmados
  const filteredConfirmedInscriptions = confirmedInscriptions.filter(inscricao => {
    const matchesSearch = inscricao.participante_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inscricao.participante_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || inscricao.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBulkEmail = () => {
    const selected = filteredConfirmedInscriptions.filter(i => i.status === 'confirmada');
    console.log('Enviando email para', selected.length, 'inscrições confirmadas');
    // Em produção, implementaria envio de email
  };

  const handleConfirmInscription = (id) => {
    setConfirmedInscriptions(prev =>
      prev.map(i => i.id === id ? { ...i, status: 'confirmada' } : i)
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada': return 'bg-green-500/20 text-green-400';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelada': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmada': return 'Confirmada';
      case 'pendente': return 'Pendente';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const getCanalColor = (canal) => {
    switch (canal) {
      case 'site': return 'bg-blue-500/20 text-blue-400';
      case 'manual': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
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
          <h1 className="text-3xl font-bold text-white">Central de Confirmações</h1>
          <p className="text-gray-400 mt-1">Acompanhe confirmações e desempenho de vendas</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBulkEmail}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
          >
            <HiMail className="w-4 h-4" />
            <span>Email em Massa</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-dark-900 rounded-xl border border-dark-700">
        <div className="flex border-b border-dark-700">
          <button
            onClick={() => setActiveTab('confirmados')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'confirmados'
                ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-800'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <HiCheckCircle className="w-5 h-5 inline mr-2" />
            Confirmados
          </button>
          <button
            onClick={() => setActiveTab('vendas')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'vendas'
                ? 'text-primary-400 border-b-2 border-primary-400 bg-dark-800'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <HiCurrencyDollar className="w-5 h-5 inline mr-2" />
            Vendas
          </button>
        </div>

        <div className="p-6">
          {/* Tab: Confirmados */}
          {activeTab === 'confirmados' && (
            <div className="space-y-6">
              {/* Filtros */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 relative">
                  <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou email..."
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
                  <option value="confirmada">Confirmada</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Confirmados</p>
                      <p className="text-3xl font-bold text-green-400">
                        {confirmedInscriptions.filter(i => i.status === 'confirmada').length}
                      </p>
                    </div>
                    <HiCheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Pendentes</p>
                      <p className="text-3xl font-bold text-yellow-400">
                        {confirmedInscriptions.filter(i => i.status === 'pendente').length}
                      </p>
                    </div>
                    <HiUsers className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Receita Confirmada</p>
                      <p className="text-3xl font-bold text-primary-400">
                        R$ {confirmedInscriptions.filter(i => i.status === 'confirmada').reduce((acc, i) => acc + i.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <HiCurrencyDollar className="w-8 h-8 text-primary-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Taxa Conversão</p>
                      <p className="text-3xl font-bold text-blue-400">
                        {confirmedInscriptions.length > 0 ? Math.round((confirmedInscriptions.filter(i => i.status === 'confirmada').length / confirmedInscriptions.length) * 100) : 0}%
                      </p>
                    </div>
                    <HiTrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Tabela de Confirmados */}
              <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
                <div className="p-6 border-b border-dark-700 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Lista de Confirmações</h2>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
                      <HiDownload className="w-4 h-4" />
                      <span>Exportar</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Participante
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Modalidade/Pacote
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status/Canal
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Valor
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Prêmios
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {filteredConfirmedInscriptions.map(inscricao => (
                        <tr key={inscricao.id} className="hover:bg-dark-800 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-white">{inscricao.participante_nome}</div>
                            <div className="text-sm text-gray-400">{inscricao.participante_email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-white">{inscricao.modalidade}</div>
                            <div className="text-sm text-gray-400">{inscricao.pacote}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inscricao.status)}`}>
                              {getStatusText(inscricao.status)}
                            </span>
                            <div className="mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCanalColor(inscricao.canal)}`}>
                                {inscricao.canal === 'site' ? 'Site' : 'Manual'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-sm font-medium text-white">
                              R$ {inscricao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-sm text-gray-400">
                              {inscricao.premios?.length || 0} prêmio(s)
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
                              {inscricao.status === 'pendente' && (
                                <button
                                  onClick={() => handleConfirmInscription(inscricao.id)}
                                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-dark-800 rounded-lg transition-colors"
                                >
                                  <HiCheck className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredConfirmedInscriptions.length === 0 && (
                  <div className="text-center py-12">
                    <HiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-400">Nenhuma confirmação encontrada</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm || statusFilter ? 'Tente ajustar os filtros.' : 'As confirmações aparecerão aqui.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab: Vendas */}
          {activeTab === 'vendas' && (
            <div className="space-y-6">
              {/* Estatísticas de Vendas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Receita Total</p>
                      <p className="text-3xl font-bold text-primary-400">
                        R$ {salesData.reduce((acc, sale) => acc + sale.total, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <HiCurrencyDollar className="w-8 h-8 text-primary-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Inscrições</p>
                      <p className="text-3xl font-bold text-green-400">
                        R$ {salesData.reduce((acc, sale) => acc + sale.receitas_inscricoes, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <HiUsers className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Vendas Extras</p>
                      <p className="text-3xl font-bold text-blue-400">
                        R$ {salesData.reduce((acc, sale) => acc + sale.vendas_extras, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <HiTrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Gráfico de Vendas */}
              <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Desempenho de Vendas</h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Inscrições</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Vendas Extras</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 flex items-end justify-between space-x-4">
                  {salesData.map((sale, index) => (
                    <div key={sale.periodo} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full h-full flex items-end justify-center space-x-1">
                        <div
                          className="bg-primary-500 rounded-t min-h-[20px] flex-1 transition-all duration-300 hover:opacity-80"
                          style={{ height: `${(sale.receitas_inscricoes / 1000) * 100}%` }}
                          title={`Inscrições: R$ ${sale.receitas_inscricoes}`}
                        ></div>
                        <div
                          className="bg-green-500 rounded-t min-h-[20px] flex-1 transition-all duration-300 hover:opacity-80"
                          style={{ height: `${(sale.vendas_extras / 1000) * 100}%` }}
                          title={`Vendas Extras: R$ ${sale.vendas_extras}`}
                        ></div>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">{sale.periodo}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabela de Vendas por Período */}
              <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
                <div className="p-6 border-b border-dark-700">
                  <h2 className="text-xl font-semibold text-white">Vendas por Período</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Período
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Inscrições
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Vendas Extras
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {salesData.map((sale, index) => (
                        <tr key={sale.periodo} className="hover:bg-dark-800 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-white">{sale.periodo}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-sm text-green-400">
                              R$ {sale.receitas_inscricoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-sm text-blue-400">
                              R$ {sale.vendas_extras.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-sm font-medium text-white">
                              R$ {sale.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCenter;

