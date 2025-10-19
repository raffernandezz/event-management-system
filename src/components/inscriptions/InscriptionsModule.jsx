import React, { useState } from 'react';
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiCheckCircle,
  HiXCircle,
  HiDownload,
  HiUserPlus,
  HiX,
  HiCheck,
  HiMapPin,
  HiCreditCard,
  HiTrophy
} from 'react-icons/hi';

function InscriptionsModule() {
  const [inscriptions, setInscriptions] = useState([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInscription, setEditingInscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome_completo: '',
    cpf: '',
    email: '',
    whatsapp: '',
    data_aniversario: '',

    // Endereço
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: '',

    // Dados do prêmio (array para múltiplos prêmios)
    premios: [{
      colocacao: '',
      nome_empresa_profissional: '',
      categoria_certificado: '',
      instagram: '',
      certificado_junto: false,
      incluir_separado: false
    }],

    // Dados pacote
    pacote_escolhido: '',
    tem_placa_mais: false,
    tem_placa_gold: false,
    observacoes: '',

    // Pagamento
    forma_pagamento: '',
    valor_total: 0,
    status_pagamento: 'pendente'
  });

  // Dados de exemplo
  React.useEffect(() => {
    const mockInscriptions = [
      {
        id: 1,
        participante_nome: 'João Silva',
        participante_email: 'joao@email.com',
        participante_telefone: '11999999999',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        status_inscricao: 'confirmada',
        data_inscricao: '2025-01-15',
        valor: 100.00,
        evento: 'Evento Principal 2025 - São Paulo'
      },
      {
        id: 2,
        participante_nome: 'Maria Santos',
        participante_email: 'maria@email.com',
        participante_telefone: '11888888888',
        modalidade: 'Workshop',
        pacote: 'VIP',
        status_inscricao: 'confirmada',
        data_inscricao: '2025-01-16',
        valor: 250.00,
        evento: 'Evento Principal 2025 - São Paulo'
      },
      {
        id: 3,
        participante_nome: 'Pedro Costa',
        participante_email: 'pedro@email.com',
        participante_telefone: '11777777777',
        modalidade: 'Palestra',
        pacote: 'Padrão',
        status_inscricao: 'pendente',
        data_inscricao: '2025-01-17',
        valor: 100.00,
        evento: 'Evento Principal 2025 - São Paulo'
      }
    ];

    setTimeout(() => {
      setInscriptions(mockInscriptions);
      setFilteredInscriptions(mockInscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtros
  React.useEffect(() => {
    let filtered = inscriptions;

    if (searchTerm) {
      filtered = filtered.filter(inscricao =>
        inscricao.participante_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inscricao.participante_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(inscricao => inscricao.status_inscricao === statusFilter);
    }

    if (selectedEvent) {
      filtered = filtered.filter(inscricao => inscricao.evento === selectedEvent);
    }

    setFilteredInscriptions(filtered);
  }, [searchTerm, statusFilter, selectedEvent, inscriptions]);

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

  // Função para buscar dados do CEP
  const buscarCEP = async (cep) => {
    if (cep.length === 8) {
      try {
        // Simulação da API dos Correios - em produção usar API real
        const mockAddressData = {
          '01310100': {
            rua: 'Rua Augusta',
            bairro: 'Consolação',
            cidade: 'São Paulo',
            estado: 'SP'
          },
          '01415001': {
            rua: 'Rua Oscar Freire',
            bairro: 'Jardins',
            cidade: 'São Paulo',
            estado: 'SP'
          }
        };

        const data = mockAddressData[cep];
        if (data) {
          setFormData(prev => ({
            ...prev,
            rua: data.rua,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  // Função para adicionar prêmio
  const adicionarPremio = () => {
    setFormData(prev => ({
      ...prev,
      premios: [...prev.premios, {
        colocacao: '',
        nome_empresa_profissional: '',
        categoria_certificado: '',
        instagram: '',
        certificado_junto: false,
        incluir_separado: false
      }]
    }));
  };

  // Função para remover prêmio
  const removerPremio = (index) => {
    setFormData(prev => ({
      ...prev,
      premios: prev.premios.filter((_, i) => i !== index)
    }));
  };

  // Função para atualizar prêmio
  const atualizarPremio = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      premios: prev.premios.map((premio, i) =>
        i === index ? { ...premio, [field]: value } : premio
      )
    }));
  };

  // Função para abrir modal de edição
  const handleEdit = (inscricao) => {
    setEditingInscription(inscricao);
    setFormData({
      nome_completo: inscricao.participante_nome,
      cpf: inscricao.cpf || '',
      email: inscricao.participante_email,
      whatsapp: inscricao.whatsapp || '',
      data_aniversario: inscricao.data_aniversario || '',
      cep: inscricao.participante_cep,
      rua: inscricao.rua || '',
      numero: inscricao.numero || '',
      bairro: inscricao.bairro || '',
      cidade: inscricao.cidade || '',
      estado: inscricao.estado || '',
      complemento: inscricao.complemento || '',
      premios: inscricao.premios || [{
        colocacao: '',
        nome_empresa_profissional: '',
        categoria_certificado: '',
        instagram: '',
        certificado_junto: false,
        incluir_separado: false
      }],
      pacote_escolhido: inscricao.pacote,
      tem_placa_mais: inscricao.tem_placa_mais || false,
      tem_placa_gold: inscricao.tem_placa_gold || false,
      observacoes: inscricao.observacoes || '',
      forma_pagamento: inscricao.forma_pagamento || '',
      valor_total: inscricao.valor || 0,
      status_pagamento: inscricao.status_pagamento || 'pendente'
    });
    setShowCreateModal(true);
  };

  // Função para salvar inscrição
  const handleSaveInscription = () => {
    // Validação básica
    if (!formData.nome_completo || !formData.cpf || !formData.email) {
      alert('Por favor, preencha os campos obrigatórios: Nome, CPF e Email');
      return;
    }

    const newInscription = {
      id: editingInscription ? editingInscription.id : Date.now(),
      participante_nome: formData.nome_completo,
      cpf: formData.cpf,
      participante_email: formData.email,
      whatsapp: formData.whatsapp,
      data_aniversario: formData.data_aniversario,
      participante_cep: formData.cep,
      rua: formData.rua,
      numero: formData.numero,
      bairro: formData.bairro,
      cidade: formData.cidade,
      estado: formData.estado,
      complemento: formData.complemento,
      premios: formData.premios,
      pacote: formData.pacote_escolhido,
      modalidade: formData.pacote_escolhido, // Usando pacote como modalidade
      tem_placa_mais: formData.tem_placa_mais,
      tem_placa_gold: formData.tem_placa_gold,
      observacoes: formData.observacoes,
      forma_pagamento: formData.forma_pagamento,
      valor: formData.valor_total,
      status_pagamento: formData.status_pagamento,
      status_inscricao: 'pendente',
      data_inscricao: new Date().toISOString().split('T')[0],
      evento: 'Evento Principal 2025 - São Paulo'
    };

    if (editingInscription) {
      setInscriptions(prev => prev.map(i => i.id === editingInscription.id ? newInscription : i));
    } else {
      setInscriptions(prev => [...prev, newInscription]);
    }

    // Reset form
    setFormData({
      nome_completo: '',
      cpf: '',
      email: '',
      whatsapp: '',
      data_aniversario: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      complemento: '',
      premios: [{
        colocacao: '',
        nome_empresa_profissional: '',
        categoria_certificado: '',
        instagram: '',
        certificado_junto: false,
        incluir_separado: false
      }],
      pacote_escolhido: '',
      tem_placa_mais: false,
      tem_placa_gold: false,
      observacoes: '',
      forma_pagamento: '',
      valor_total: 0,
      status_pagamento: 'pendente'
    });

    setEditingInscription(null);
    setShowCreateModal(false);
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
          <h1 className="text-3xl font-bold text-white">Inscrições</h1>
          <p className="text-gray-400 mt-1">Gerencie todas as inscrições dos seus eventos</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
            <HiUserPlus className="w-4 h-4" />
            <span>Nova Inscrição</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-black font-semibold rounded-lg shadow-lg transition-all duration-200">
            <HiPlus className="w-5 h-5" />
            <span>Criar Inscrição</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 p-6">
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

          <div className="flex items-center space-x-4">
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

            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-3 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Todos os Eventos</option>
              <option value="Evento Principal 2025 - São Paulo">Evento Principal 2025 - São Paulo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Inscrições</p>
              <p className="text-3xl font-bold text-white">{inscriptions.length}</p>
            </div>
            <HiUserPlus className="w-8 h-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Confirmadas</p>
              <p className="text-3xl font-bold text-green-400">
                {inscriptions.filter(i => i.status_inscricao === 'confirmada').length}
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
                {inscriptions.filter(i => i.status_inscricao === 'pendente').length}
              </p>
            </div>
            <HiFilter className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl border border-dark-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receita Total</p>
              <p className="text-3xl font-bold text-primary-400">
                R$ {inscriptions.reduce((acc, i) => acc + i.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <HiCurrencyDollar className="w-8 h-8 text-primary-400" />
          </div>
        </div>
      </div>

      {/* Tabela de Inscrições */}
      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Lista de Inscrições</h2>
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
                  Contato
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Evento/Modalidade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {filteredInscriptions.map(inscricao => (
                <tr key={inscricao.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{inscricao.participante_nome}</div>
                    <div className="text-sm text-gray-400">{inscricao.data_inscricao}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{inscricao.participante_email}</div>
                    <div className="text-sm text-gray-400">{inscricao.participante_telefone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{inscricao.evento}</div>
                    <div className="text-sm text-gray-400">{inscricao.modalidade} - {inscricao.pacote}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inscricao.status_inscricao)}`}>
                      {getStatusText(inscricao.status_inscricao)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-white">
                      R$ {inscricao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors">
                        <HiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(inscricao)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-dark-800 rounded-lg transition-colors"
                      >
                        <HiPencil className="w-4 h-4" />
                      </button>
                      {inscricao.status_inscricao === 'pendente' && (
                        <>
                          <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-dark-800 rounded-lg transition-colors">
                            <HiCheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-800 rounded-lg transition-colors">
                            <HiXCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInscriptions.length === 0 && (
          <div className="text-center py-12">
            <HiUserPlus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-400">Nenhuma inscrição encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter ? 'Tente ajustar os filtros.' : 'As inscrições aparecerão aqui.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Criação/Edição */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-dark-900 border border-dark-700 rounded-xl p-6 w-full max-w-4xl mx-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingInscription ? 'Editar Inscrição' : 'Nova Inscrição'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingInscription(null);
                  setFormData({
                    nome_completo: '',
                    cpf: '',
                    email: '',
                    whatsapp: '',
                    data_aniversario: '',
                    cep: '',
                    rua: '',
                    numero: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    complemento: '',
                    premios: [{
                      colocacao: '',
                      nome_empresa_profissional: '',
                      categoria_certificado: '',
                      instagram: '',
                      certificado_junto: false,
                      incluir_separado: false
                    }],
                    pacote_escolhido: '',
                    tem_placa_mais: false,
                    tem_placa_gold: false,
                    observacoes: '',
                    forma_pagamento: '',
                    valor_total: 0,
                    status_pagamento: 'pendente'
                  });
                }}
                className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Parte 1: Dados Pessoais */}
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HiUserPlus className="w-5 h-5 text-primary-400" />
                  <h4 className="text-lg font-medium text-white">Dados Pessoais</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nome_completo}
                      onChange={(e) => setFormData(prev => ({ ...prev, nome_completo: e.target.value }))}
                      placeholder="Digite o nome completo..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      value={formData.cpf}
                      onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                      placeholder="000.000.000-00"
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data de Aniversário
                    </label>
                    <input
                      type="date"
                      value={formData.data_aniversario}
                      onChange={(e) => setFormData(prev => ({ ...prev, data_aniversario: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="seu@email.com"
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Parte 2: Endereço */}
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HiMapPin className="w-5 h-5 text-primary-400" />
                  <h4 className="text-lg font-medium text-white">Endereço</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CEP
                    </label>
                    <input
                      type="text"
                      value={formData.cep}
                      onChange={(e) => {
                        const cep = e.target.value.replace(/\D/g, '');
                        setFormData(prev => ({ ...prev, cep }));
                        if (cep.length === 8) {
                          buscarCEP(cep);
                        }
                      }}
                      placeholder="00000-000"
                      maxLength="8"
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Rua
                    </label>
                    <input
                      type="text"
                      value={formData.rua}
                      onChange={(e) => setFormData(prev => ({ ...prev, rua: e.target.value }))}
                      placeholder="Nome da rua..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => setFormData(prev => ({ ...prev, numero: e.target.value }))}
                      placeholder="Número..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bairro
                    </label>
                    <input
                      type="text"
                      value={formData.bairro}
                      onChange={(e) => setFormData(prev => ({ ...prev, bairro: e.target.value }))}
                      placeholder="Nome do bairro..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.cidade}
                      onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                      placeholder="Nome da cidade..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Estado
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecionar estado</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="GO">Goiás</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="PE">Pernambuco</option>
                      <option value="MA">Maranhão</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="PB">Paraíba</option>
                      <option value="AL">Alagoas</option>
                      <option value="SE">Sergipe</option>
                      <option value="PI">Piauí</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="AC">Acre</option>
                      <option value="AM">Amazonas</option>
                      <option value="RR">Roraima</option>
                      <option value="PA">Pará</option>
                      <option value="AP">Amapá</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={formData.complemento}
                      onChange={(e) => setFormData(prev => ({ ...prev, complemento: e.target.value }))}
                      placeholder="Complemento, apartamento, sala, etc..."
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Parte 3: Dados do Prêmio */}
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <HiTrophy className="w-5 h-5 text-primary-400" />
                    <h4 className="text-lg font-medium text-white">Dados do Prêmio</h4>
                  </div>
                  <button
                    onClick={adicionarPremio}
                    className="flex items-center space-x-2 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
                  >
                    <HiPlus className="w-4 h-4" />
                    <span>Adicionar Prêmio</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.premios.map((premio, index) => (
                    <div key={index} className="bg-dark-950 rounded-lg p-4 border border-dark-700">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-md font-medium text-white">Prêmio {index + 1}</h5>
                        {formData.premios.length > 1 && (
                          <button
                            onClick={() => removerPremio(index)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <HiX className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Colocação
                          </label>
                          <select
                            value={premio.colocacao}
                            onChange={(e) => atualizarPremio(index, 'colocacao', e.target.value)}
                            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            <option value="">Selecionar colocação</option>
                            <option value="1">1º Lugar</option>
                            <option value="2">2º Lugar</option>
                            <option value="3">3º Lugar</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Nome da Empresa ou Profissional
                          </label>
                          <input
                            type="text"
                            value={premio.nome_empresa_profissional}
                            onChange={(e) => atualizarPremio(index, 'nome_empresa_profissional', e.target.value)}
                            placeholder="Nome da empresa ou profissional..."
                            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Categoria do Certificado
                          </label>
                          <input
                            type="text"
                            value={premio.categoria_certificado}
                            onChange={(e) => atualizarPremio(index, 'categoria_certificado', e.target.value)}
                            placeholder="Categoria do certificado..."
                            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Instagram
                          </label>
                          <input
                            type="text"
                            value={premio.instagram}
                            onChange={(e) => atualizarPremio(index, 'instagram', e.target.value)}
                            placeholder="@instagram"
                            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <div className="md:col-span-2 flex items-center space-x-6">
                          <label className="flex items-center space-x-2 text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={premio.certificado_junto}
                              onChange={(e) => atualizarPremio(index, 'certificado_junto', e.target.checked)}
                              className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                            />
                            <span>Certificado junto</span>
                          </label>

                          <label className="flex items-center space-x-2 text-sm text-gray-300">
                            <input
                              type="checkbox"
                              checked={premio.incluir_separado}
                              onChange={(e) => atualizarPremio(index, 'incluir_separado', e.target.checked)}
                              className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                            />
                            <span>Incluir separado</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parte 4: Dados do Pacote */}
              <div className="bg-dark-800 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <HiCreditCard className="w-5 h-5 text-primary-400" />
                  <h4 className="text-lg font-medium text-white">Dados do Pacote</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pacote Escolhido
                    </label>
                    <select
                      value={formData.pacote_escolhido}
                      onChange={(e) => setFormData(prev => ({ ...prev, pacote_escolhido: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecionar pacote</option>
                      <option value="Padrão">Padrão (R$ 100,00)</option>
                      <option value="VIP">VIP (R$ 250,00)</option>
                      <option value="Premium">Premium (R$ 400,00)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Valor Total
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.valor_total}
                      onChange={(e) => setFormData(prev => ({ ...prev, valor_total: parseFloat(e.target.value) || 0 }))}
                      placeholder="0,00"
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center space-x-6">
                    <label className="flex items-center space-x-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.tem_placa_mais}
                        onChange={(e) => setFormData(prev => ({ ...prev, tem_placa_mais: e.target.checked }))}
                        className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span>Tem placa a mais</span>
                    </label>

                    <label className="flex items-center space-x-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={formData.tem_placa_gold}
                        onChange={(e) => setFormData(prev => ({ ...prev, tem_placa_gold: e.target.checked }))}
                        className="rounded border-dark-700 text-primary-500 focus:ring-primary-500"
                      />
                      <span>Tem placa Gold</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Observações
                    </label>
                    <textarea
                      value={formData.observacoes}
                      onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                      placeholder="Observações adicionais..."
                      rows={3}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Forma de Pagamento
                    </label>
                    <select
                      value={formData.forma_pagamento}
                      onChange={(e) => setFormData(prev => ({ ...prev, forma_pagamento: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Selecionar forma</option>
                      <option value="PIX">PIX</option>
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="Boleto">Boleto</option>
                      <option value="Dinheiro">Dinheiro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status do Pagamento
                    </label>
                    <select
                      value={formData.status_pagamento}
                      onChange={(e) => setFormData(prev => ({ ...prev, status_pagamento: e.target.value }))}
                      className="w-full px-3 py-2 bg-dark-950 border border-dark-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="pendente">Pendente</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="recusado">Recusado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex space-x-3 mt-8 pt-6 border-t border-dark-700">
              <button
                onClick={handleSaveInscription}
                className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-black font-semibold rounded-lg transition-colors"
              >
                {editingInscription ? 'Atualizar Inscrição' : 'Criar Inscrição'}
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingInscription(null);
                }}
                className="px-4 py-3 bg-dark-800 hover:bg-dark-700 text-gray-300 font-medium rounded-lg transition-colors"
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

export default InscriptionsModule;
