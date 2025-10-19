import React, { useState, useEffect } from 'react';
import {
  HiChartBar,
  HiSearch,
  HiFilter,
  HiEye,
  HiDownload,
  HiClock,
  HiUser,
  HiCog,
  HiDocumentText,
  HiDatabase,
  HiExclamationTriangle,
  HiCheckCircle,
  HiXCircle,
  HiPencil,
  HiTrash,
  HiPlus,
  HiArchive,
  HiPrinter,
  HiMail,
  HiCreditCard,
  HiTruck,
  HiUsers,
  HiShieldCheck,
  HiCalendar,
  HiTemplate,
  HiClipboardList
} from 'react-icons/hi';

function AuditModule() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockAuditLogs = [
      {
        id: 1,
        usuario_id: 1,
        evento_id: 1,
        modulo: 'inscricoes',
        acao: 'criar',
        registro_id: 1,
        dados_antes: null,
        dados_depois: JSON.stringify({
          participante_nome: 'João Silva',
          participante_email: 'joao@email.com',
          modalidade: 'Palestra',
          pacote: 'Padrão'
        }),
        resumo: 'Nova inscrição criada',
        timestamp: '2025-01-15T10:30:00Z',
        usuario_nome: 'Administrador',
        ip_address: '192.168.1.100'
      },
      {
        id: 2,
        usuario_id: 2,
        evento_id: 1,
        modulo: 'confirmacoes',
        acao: 'confirmar',
        registro_id: 1,
        dados_antes: JSON.stringify({ status_inscricao: 'pendente' }),
        dados_depois: JSON.stringify({ status_inscricao: 'confirmada' }),
        resumo: 'Inscrição confirmada',
        timestamp: '2025-01-15T14:20:00Z',
        usuario_nome: 'Operador',
        ip_address: '192.168.1.101'
      },
      {
        id: 3,
        usuario_id: 1,
        evento_id: 1,
        modulo: 'financeiro',
        acao: 'criar',
        registro_id: 1,
        dados_antes: null,
        dados_depois: JSON.stringify({
          origem: 'inscricao',
          valor: 100.00,
          forma: 'PIX'
        }),
        resumo: 'Receita criada automaticamente',
        timestamp: '2025-01-15T14:21:00Z',
        usuario_nome: 'Administrador',
        ip_address: '192.168.1.100'
      },
      {
        id: 4,
        usuario_id: 3,
        evento_id: 1,
        modulo: 'despesas',
        acao: 'criar',
        registro_id: 1,
        dados_antes: null,
        dados_depois: JSON.stringify({
          categoria: 'Local',
          valor: 5000.00,
          fornecedor: 'Centro de Convenções Ltda'
        }),
        resumo: 'Nova despesa registrada',
        timestamp: '2025-01-16T09:15:00Z',
        usuario_nome: 'Financeiro',
        ip_address: '192.168.1.102'
      },
      {
        id: 5,
        usuario_id: 1,
        evento_id: 1,
        modulo: 'certificados',
        acao: 'emitir',
        registro_id: 1,
        dados_antes: null,
        dados_depois: JSON.stringify({
          numero: 'CERT-2025-001',
          participante_nome: 'João Silva'
        }),
        resumo: 'Certificado emitido',
        timestamp: '2025-01-16T16:45:00Z',
        usuario_nome: 'Administrador',
        ip_address: '192.168.1.100'
      },
      {
        id: 6,
        usuario_id: 2,
        evento_id: 1,
        modulo: 'envios',
        acao: 'criar',
        registro_id: 1,
        dados_antes: null,
        dados_depois: JSON.stringify({
          destinatario_nome: 'João Silva',
          status_pipeline: 'preparacao'
        }),
        resumo: 'Novo envio criado',
        timestamp: '2025-01-17T08:30:00Z',
        usuario_nome: 'Operador',
        ip_address: '192.168.1.101'
      }
    ];

    setTimeout(() => {
      setAuditLogs(mockAuditLogs);
      setFilteredLogs(mockAuditLogs);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtros
  useEffect(() => {
    let filtered = auditLogs;

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.usuario_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.modulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.acao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resumo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (moduleFilter) {
      filtered = filtered.filter(log => log.modulo === moduleFilter);
    }

    if (userFilter) {
      filtered = filtered.filter(log => log.usuario_id === parseInt(userFilter));
    }

    if (actionFilter) {
      filtered = filtered.filter(log => log.acao === actionFilter);
    }

    setFilteredLogs(filtered);
  }, [searchTerm, moduleFilter, userFilter, actionFilter, auditLogs]);

  const handleExportAudit = () => {
    console.log('Exportando logs de auditoria');
    // Em produção, geraria arquivo e registraria no log de exportação
  };

  const getModuleIcon = (modulo) => {
    switch (modulo) {
      case 'inscricoes': return <HiUsers className="w-4 h-4" />;
      case 'confirmacoes': return <HiCheckCircle className="w-4 h-4" />;
      case 'financeiro': return <HiCurrencyDollar className="w-4 h-4" />;
      case 'despesas': return <HiCreditCard className="w-4 h-4" />;
      case 'certificados': return <HiTemplate className="w-4 h-4" />;
      case 'envios': return <HiTruck className="w-4 h-4" />;
      case 'portaria': return <HiShieldCheck className="w-4 h-4" />;
      case 'administrativo': return <HiCog className="w-4 h-4" />;
      default: return <HiDocumentText className="w-4 h-4" />;
    }
  };

  const getActionColor = (acao) => {
    switch (acao) {
      case 'criar': return 'bg-green-500/20 text-green-400';
      case 'editar': return 'bg-blue-500/20 text-blue-400';
      case 'excluir': return 'bg-red-500/20 text-red-400';
      case 'confirmar': return 'bg-purple-500/20 text-purple-400';
      case 'cancelar': return 'bg-yellow-500/20 text-yellow-400';
      case 'emitir': return 'bg-indigo-500/20 text-indigo-400';
      case 'exportar': return 'bg-orange-500/20 text-orange-400';
      case 'login': return 'bg-cyan-500/20 text-cyan-400';
      case 'logout': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getActionText = (acao) => {
    switch (acao) {
      case 'criar': return 'Criar';
      case 'editar': return 'Editar';
      case 'excluir': return 'Excluir';
      case 'confirmar': return 'Confirmar';
      case 'cancelar': return 'Cancelar';
      case 'emitir': return 'Emitir';
      case 'exportar': return 'Exportar';
      case 'login': return 'Login';
      case 'logout': return 'Logout';
      default: return acao;
    }
  };

  const getModuleText = (modulo) => {
    switch (modulo) {
      case 'inscricoes': return 'Inscrições';
      case 'confirmacoes': return 'Confirmações';
      case 'financeiro': return 'Financeiro';
      case 'despesas': return 'Despesas';
      case 'certificados': return 'Certificados';
      case 'envios': return 'Envios';
      case 'portaria': return 'Portaria';
      case 'administrativo': return 'Administrativo';
      default: return modulo;
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
          <h1 className="text-3xl font-bold text-white">Auditoria</h1>
          <p className="text-gray-400 mt-1">Registre e monitore todas as ações críticas do sistema</p>
        </div>
        <button
          onClick={handleExportAudit}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black font-semibold rounded-lg shadow-lg transition-all duration-200"
        >
          <HiDownload className="w-5 h-5" />
          <span>Exportar Logs</span>
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Logs</p>
              <p className="text-3xl font-bold text-white">{auditLogs.length}</p>
            </div>
            <HiDocumentText className="w-8 h-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hoje</p>
              <p className="text-3xl font-bold text-green-400">
                {auditLogs.filter(log => new Date(log.timestamp).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <HiClock className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Última Semana</p>
              <p className="text-3xl font-bold text-blue-400">
                {auditLogs.filter(log => {
                  const logDate = new Date(log.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return logDate >= weekAgo;
                }).length}
              </p>
            </div>
            <HiChartBar className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Usuários Ativos</p>
              <p className="text-3xl font-bold text-purple-400">
                {new Set(auditLogs.map(log => log.usuario_id)).size}
              </p>
            </div>
            <HiUsers className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos os Módulos</option>
            <option value="inscricoes">Inscrições</option>
            <option value="confirmacoes">Confirmações</option>
            <option value="financeiro">Financeiro</option>
            <option value="despesas">Despesas</option>
            <option value="certificados">Certificados</option>
            <option value="envios">Envios</option>
            <option value="portaria">Portaria</option>
            <option value="administrativo">Administrativo</option>
          </select>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas as Ações</option>
            <option value="criar">Criar</option>
            <option value="editar">Editar</option>
            <option value="excluir">Excluir</option>
            <option value="confirmar">Confirmar</option>
            <option value="cancelar">Cancelar</option>
            <option value="emitir">Emitir</option>
            <option value="exportar">Exportar</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todos os Usuários</option>
            <option value="1">Administrador</option>
            <option value="2">Operador</option>
            <option value="3">Financeiro</option>
          </select>
        </div>
      </div>

      {/* Lista de Logs */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Logs de Auditoria</h2>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-400">
              {filteredLogs.length} de {auditLogs.length} registros
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Módulo/Ação
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Resumo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Registro ID
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {new Date(log.timestamp).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-black font-semibold text-sm">
                        {log.usuario_nome.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{log.usuario_nome}</div>
                        <div className="text-xs text-gray-400">{log.ip_address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-gray-400">{getModuleIcon(log.modulo)}</span>
                      <span className="text-sm text-white">{getModuleText(log.modulo)}</span>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.acao)}`}>
                      {getActionText(log.acao)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{log.resumo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-mono text-primary-400">#{log.registro_id}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                      <HiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <HiDocumentText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-400">Nenhum log encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || moduleFilter || userFilter || actionFilter ? 'Tente ajustar os filtros.' : 'Os logs aparecerão aqui conforme ações forem realizadas.'}
            </p>
          </div>
        )}
      </div>

      {/* Logs Recentes por Módulo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ações Recentes por Módulo</h3>
          <div className="space-y-3">
            {Object.entries(
              auditLogs.reduce((acc, log) => {
                acc[log.modulo] = (acc[log.modulo] || 0) + 1;
                return acc;
              }, {})
            ).map(([modulo, count]) => (
              <div key={modulo} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">{getModuleIcon(modulo)}</span>
                  <span className="text-white">{getModuleText(modulo)}</span>
                </div>
                <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Ações Recentes por Tipo</h3>
          <div className="space-y-3">
            {Object.entries(
              auditLogs.reduce((acc, log) => {
                acc[log.acao] = (acc[log.acao] || 0) + 1;
                return acc;
              }, {})
            ).map(([acao, count]) => (
              <div key={acao} className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(acao)}`}>
                  {getActionText(acao)}
                </span>
                <span className="text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditModule;

