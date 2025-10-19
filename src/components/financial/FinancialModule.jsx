import React, { useState, useEffect } from 'react';
import {
  HiCurrencyDollar,
  HiTrendingUp,
  HiTrendingDown,
  HiChartBar,
  HiDocumentText,
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiArrowUp,
  HiArrowDown,
  HiCalculator,
  HiReceiptRefund,
  HiDocument,
  HiChartPie
} from 'react-icons/hi';

function FinancialModule() {
  const [activeTab, setActiveTab] = useState('receitas');
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [notasFiscais, setNotasFiscais] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockReceitas = [
      {
        id: 1,
        evento_id: 1,
        origem: 'inscricao',
        valor: 100.00,
        data: '2025-01-15',
        forma: 'PIX',
        referencia: 'Inscrição João Silva',
        observacoes: 'Pagamento confirmado automaticamente'
      },
      {
        id: 2,
        evento_id: 1,
        origem: 'inscricao',
        valor: 250.00,
        data: '2025-01-16',
        forma: 'Cartão de Crédito',
        referencia: 'Inscrição Maria Santos - VIP',
        observacoes: 'Aprovação manual necessária'
      },
      {
        id: 3,
        evento_id: 1,
        origem: 'venda_extra',
        valor: 50.00,
        data: '2025-01-17',
        forma: 'Dinheiro',
        referencia: 'Venda adicional no evento',
        observacoes: 'Registrado pelo operador'
      }
    ];

    const mockDespesas = [
      {
        id: 1,
        evento_id: 1,
        categoria: 'Local',
        valor: 5000.00,
        data: '2025-01-10',
        fornecedor: 'Centro de Convenções Ltda',
        comprovante: '/comprovantes/despesa-001.pdf',
        observacoes: 'Aluguel do espaço principal'
      },
      {
        id: 2,
        evento_id: 1,
        categoria: 'Material',
        valor: 800.00,
        data: '2025-01-12',
        fornecedor: 'Gráfica ABC',
        comprovante: '/comprovantes/despesa-002.pdf',
        observacoes: 'Impressão de materiais promocionais'
      },
      {
        id: 3,
        evento_id: 1,
        categoria: 'Serviços',
        valor: 1200.00,
        data: '2025-01-14',
        fornecedor: 'Empresa de Som Ltda',
        comprovante: '/comprovantes/despesa-003.pdf',
        observacoes: 'Serviços de som e iluminação'
      }
    ];

    const mockNotasFiscais = [
      {
        id: 1,
        evento_id: 1,
        numero: 'NF-001',
        tipo: 'entrada',
        valor: 5000.00,
        data: '2025-01-10',
        link_arquivo: '/nfs/nf-001.pdf',
        fornecedor: 'Centro de Convenções Ltda'
      },
      {
        id: 2,
        evento_id: 1,
        numero: 'NF-002',
        tipo: 'entrada',
        valor: 800.00,
        data: '2025-01-12',
        link_arquivo: '/nfs/nf-002.pdf',
        fornecedor: 'Gráfica ABC'
      }
    ];

    setTimeout(() => {
      setReceitas(mockReceitas);
      setDespesas(mockDespesas);
      setNotasFiscais(mockNotasFiscais);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateReceita = () => {
    console.log('Criar nova receita');
  };

  const handleCreateDespesa = () => {
    console.log('Criar nova despesa');
  };

  const handleCreateNotaFiscal = () => {
    console.log('Criar nova nota fiscal');
  };

  const getOrigemColor = (origem) => {
    switch (origem) {
      case 'inscricao': return 'bg-green-500/20 text-green-400';
      case 'venda_extra': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'Local': return 'bg-purple-500/20 text-purple-400';
      case 'Material': return 'bg-orange-500/20 text-orange-400';
      case 'Serviços': return 'bg-blue-500/20 text-blue-400';
      case 'Marketing': return 'bg-pink-500/20 text-pink-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTipoNFColor = (tipo) => {
    switch (tipo) {
      case 'entrada': return 'bg-green-500/20 text-green-400';
      case 'saida': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const tabs = [
    { id: 'receitas', label: 'Receitas', icon: <HiTrendingUp className="w-5 h-5" />, count: receitas.length },
    { id: 'despesas', label: 'Despesas', icon: <HiTrendingDown className="w-5 h-5" />, count: despesas.length },
    { id: 'resumos', label: 'Resumos', icon: <HiChartBar className="w-5 h-5" />, count: 1 },
    { id: 'notas-fiscais', label: 'Notas Fiscais', icon: <HiDocumentText className="w-5 h-5" />, count: notasFiscais.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'receitas':
        return <ReceitasTab receitas={receitas} onCreate={handleCreateReceita} />;
      case 'despesas':
        return <DespesasTab despesas={despesas} onCreate={handleCreateDespesa} />;
      case 'resumos':
        return <ResumosTab receitas={receitas} despesas={despesas} />;
      case 'notas-fiscais':
        return <NotasFiscaisTab notasFiscais={notasFiscais} onCreate={handleCreateNotaFiscal} />;
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
          <h1 className="text-3xl font-bold text-white">Financeiro</h1>
          <p className="text-gray-400 mt-1">Controle receitas, despesas e relatórios financeiros</p>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-3xl font-bold text-green-400">
                R$ {receitas.reduce((acc, r) => acc + r.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiTrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-3xl font-bold text-red-400">
                R$ {despesas.reduce((acc, d) => acc + d.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiTrendingDown className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Saldo</p>
              <p className={`text-3xl font-bold ${(receitas.reduce((acc, r) => acc + r.valor, 0) - despesas.reduce((acc, d) => acc + d.valor, 0)) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {(receitas.reduce((acc, r) => acc + r.valor, 0) - despesas.reduce((acc, d) => acc + d.valor, 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiCalculator className="w-8 h-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ticket Médio</p>
              <p className="text-3xl font-bold text-blue-400">
                R$ {receitas.length > 0 ? (receitas.reduce((acc, r) => acc + r.valor, 0) / receitas.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
              </p>
            </div>
            <HiChartBar className="w-8 h-8 text-blue-400" />
          </div>
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

// Componente para Receitas
function ReceitasTab({ receitas, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Receitas</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Receita</span>
        </button>
      </div>

      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Lista de Receitas</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
            <HiDownload className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Origem
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Forma
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Referência
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {receitas.map(receita => (
                <tr key={receita.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrigemColor(receita.origem)}`}>
                      {receita.origem === 'inscricao' ? 'Inscrição' : 'Venda Extra'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-green-400">
                      R$ {receita.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {new Date(receita.data).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{receita.forma}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{receita.referencia}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiPencil className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente para Despesas
function DespesasTab({ despesas, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Despesas</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Despesa</span>
        </button>
      </div>

      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Lista de Despesas</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
            <HiDownload className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Observações
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {despesas.map(despesa => (
                <tr key={despesa.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoriaColor(despesa.categoria)}`}>
                      {despesa.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-red-400">
                      R$ {despesa.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {new Date(despesa.data).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{despesa.fornecedor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{despesa.observacoes}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiPencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente para Resumos
function ResumosTab({ receitas, despesas }) {
  const totalReceitas = receitas.reduce((acc, r) => acc + r.valor, 0);
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  const ticketMedio = receitas.length > 0 ? totalReceitas / receitas.length : 0;

  // Dados para gráfico de categorias de despesas
  const despesasPorCategoria = despesas.reduce((acc, despesa) => {
    acc[despesa.categoria] = (acc[despesa.categoria] || 0) + despesa.valor;
    return acc;
  }, {});

  const receitasPorOrigem = receitas.reduce((acc, receita) => {
    acc[receita.origem] = (acc[receita.origem] || 0) + receita.valor;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Resumos Financeiros</h2>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-2xl font-bold text-green-400">
                R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiTrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-2xl font-bold text-red-400">
                R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiTrendingDown className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Saldo</p>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiCalculator className="w-8 h-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ticket Médio</p>
              <p className="text-2xl font-bold text-blue-400">
                R$ {ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiChartBar className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Gráfico de Despesas por Categoria */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Despesas por Categoria</h3>
        <div className="space-y-4">
          {Object.entries(despesasPorCategoria).map(([categoria, valor]) => {
            const percentage = totalDespesas > 0 ? (valor / totalDespesas) * 100 : 0;
            return (
              <div key={categoria} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoriaColor(categoria)}`}>
                    {categoria}
                  </span>
                  <span className="text-white font-medium">
                    R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-12">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de Receitas por Origem */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Receitas por Origem</h3>
        <div className="space-y-4">
          {Object.entries(receitasPorOrigem).map(([origem, valor]) => {
            const percentage = totalReceitas > 0 ? (valor / totalReceitas) * 100 : 0;
            return (
              <div key={origem} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrigemColor(origem)}`}>
                    {origem === 'inscricao' ? 'Inscrições' : 'Vendas Extras'}
                  </span>
                  <span className="text-white font-medium">
                    R$ {valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-dark-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-12">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Componente para Notas Fiscais
function NotasFiscaisTab({ notasFiscais, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Notas Fiscais</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Nota Fiscal</span>
        </button>
      </div>

      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Lista de Notas Fiscais</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
            <HiDownload className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fornecedor
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {notasFiscais.map(nota => (
                <tr key={nota.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono text-primary-400">{nota.numero}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTipoNFColor(nota.tipo)}`}>
                      {nota.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-medium ${nota.tipo === 'entrada' ? 'text-green-400' : 'text-red-400'}`}>
                      R$ {nota.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {new Date(nota.data).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{nota.fornecedor}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Funções auxiliares (reutilizadas)
function getOrigemColor(origem) {
  switch (origem) {
    case 'inscricao': return 'bg-green-500/20 text-green-400';
    case 'venda_extra': return 'bg-blue-500/20 text-blue-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}

function getCategoriaColor(categoria) {
  switch (categoria) {
    case 'Local': return 'bg-purple-500/20 text-purple-400';
    case 'Material': return 'bg-orange-500/20 text-orange-400';
    case 'Serviços': return 'bg-blue-500/20 text-blue-400';
    case 'Marketing': return 'bg-pink-500/20 text-pink-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}

function getTipoNFColor(tipo) {
  switch (tipo) {
    case 'entrada': return 'bg-green-500/20 text-green-400';
    case 'saida': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}

export default FinancialModule;

