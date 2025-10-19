import React, { useState } from 'react';
import { HiPlus, HiPaperClip, HiLink, HiX } from 'react-icons/hi';
import Calendar from './Calendar';

function MainHub() {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    attachment: null,
    links: ['']
  });

  // Cards principais (serão expandidos pelo usuário)
  const cards = [
    {
      id: 1,
      title: 'Gestão de Eventos',
      description: 'Dashboard completo para gerenciamento de eventos',
      gradient: 'from-blue-500 to-blue-600',
      icon: '📅',
      path: '/eventos',
      category: 'principal'
    },
    {
      id: 2,
      title: 'ERP',
      description: 'Sistema integrado de gestão empresarial',
      gradient: 'from-green-500 to-green-600',
      icon: '🏢',
      path: '/erp',
      category: 'principal'
    },
    // Cards adicionais que podem ser criados pelo usuário
    {
      id: 3,
      title: 'Inscrições',
      description: 'Gerencie todas as inscrições dos seus eventos',
      gradient: 'from-purple-500 to-purple-600',
      icon: '👥',
      path: '/inscricoes',
      category: 'cadastros'
    },
    {
      id: 4,
      title: 'Confirmações',
      description: 'Acompanhe confirmações e vendas',
      gradient: 'from-emerald-500 to-emerald-600',
      icon: '✅',
      path: '/confirmacoes',
      category: 'cadastros'
    },
    {
      id: 5,
      title: 'Artes & Certificados',
      description: 'Crie e gerencie artes e certificados',
      gradient: 'from-pink-500 to-pink-600',
      icon: '🎨',
      path: '/artes',
      category: 'design'
    },
    {
      id: 6,
      title: 'Administrativo',
      description: 'Configurações e dados do sistema',
      gradient: 'from-orange-500 to-orange-600',
      icon: '⚙️',
      path: '/administrativo',
      category: 'admin'
    },
    {
      id: 7,
      title: 'Envios',
      description: 'Controle de produção e entregas',
      gradient: 'from-indigo-500 to-indigo-600',
      icon: '📦',
      path: '/envios',
      category: 'logistica'
    },
    {
      id: 8,
      title: 'Financeiro',
      description: 'Receitas, despesas e relatórios',
      gradient: 'from-yellow-500 to-yellow-600',
      icon: '💰',
      path: '/financeiro',
      category: 'financeiro'
    },
    {
      id: 9,
      title: 'Portaria',
      description: 'Controle de acesso e check-in',
      gradient: 'from-red-500 to-red-600',
      icon: '🚪',
      path: '/portaria',
      category: 'operacional'
    },
    {
      id: 10,
      title: 'Auditoria',
      description: 'Logs e rastreamento de ações',
      gradient: 'from-gray-500 to-gray-600',
      icon: '📊',
      path: '/auditoria',
      category: 'admin'
    }
  ];

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      // Em produção, salvaria no banco de dados
      console.log('Nova tarefa:', newTask);
      setNewTask({
        name: '',
        attachment: null,
        links: ['']
      });
      setShowTaskModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTask(prev => ({ ...prev, attachment: file }));
    }
  };

  const handleAddLink = () => {
    setNewTask(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const handleRemoveLink = (index) => {
    setNewTask(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleLinkChange = (index, value) => {
    setNewTask(prev => ({
      ...prev,
      links: prev.links.map((link, i) => i === index ? value : link)
    }));
  };

  // Agrupar cards por categoria
  const cardsByCategory = cards.reduce((acc, card) => {
    if (!acc[card.category]) {
      acc[card.category] = [];
    }
    acc[card.category].push(card);
    return acc;
  }, {});

  const categories = [
    { id: 'principal', name: 'Principais', color: 'blue' },
    { id: 'cadastros', name: 'Cadastros', color: 'purple' },
    { id: 'design', name: 'Design', color: 'pink' },
    { id: 'admin', name: 'Administrativo', color: 'orange' },
    { id: 'logistica', name: 'Logística', color: 'indigo' },
    { id: 'financeiro', name: 'Financeiro', color: 'yellow' },
    { id: 'operacional', name: 'Operacional', color: 'red' }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950">
      {/* Header com botão de adicionar tarefa */}
      <div className="flex items-center justify-between mb-8 p-6 bg-dark-900/50 backdrop-blur-sm border-b border-dark-700">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Hub Principal
          </h1>
          <p className="text-gray-400 text-lg">Centro de controle do sistema de gestão de eventos</p>
        </div>
        <button
          onClick={() => setShowTaskModal(true)}
          className="group relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 text-black font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-primary-500/25"
        >
          {/* Efeito de brilho dourado */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <div className="relative flex items-center space-x-3">
            <div className="p-2 bg-black/20 rounded-lg">
              <HiPlus className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Adicionar Tarefa</div>
              <div className="text-sm opacity-90">Trello</div>
            </div>
          </div>
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 p-6 min-h-0">
        {/* Calendário - Ocupa tela esquerda (GRANDE) */}
        <div className="lg:flex-[0.6] xl:flex-[0.65] h-full">
          <div className="h-full bg-dark-900/80 backdrop-blur-sm rounded-2xl border border-dark-700 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-dark-700">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <HiCalendar className="w-6 h-6 text-primary-400" />
                </div>
                <span>Calendário de Eventos</span>
              </h2>
              <p className="text-gray-400 mt-2">Visualize e gerencie todos os seus eventos</p>
            </div>
            <div className="p-6 h-full overflow-auto">
              <Calendar />
            </div>
          </div>
        </div>

        {/* Área de Cards - Ocupa área menor à direita */}
        <div className="lg:flex-[0.4] xl:flex-[0.35] h-full">
          <div className="h-full bg-dark-900/80 backdrop-blur-sm rounded-2xl border border-dark-700 shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-dark-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Módulos do Sistema</h2>
                <div className="text-xs text-gray-400">
                  {cards.length} módulos
                </div>
              </div>

              {/* Cards organizados por categoria - COMPACTOS */}
              <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {categories.map(category => {
                  const categoryCards = cardsByCategory[category.id] || [];
                  if (categoryCards.length === 0) return null;

                  return (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${category.color}-500 rounded-full`}></div>
                        <h3 className="text-sm font-semibold text-white">{category.name}</h3>
                        <span className="px-1.5 py-0.5 bg-dark-800 text-gray-400 text-xs rounded-full">
                          {categoryCards.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categoryCards.map(card => (
                          <div
                            key={card.id}
                            className="group relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg border border-dark-700 p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5"
                          >
                            {/* Efeito de brilho no hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-600/10 rounded-lg transition-all duration-300"></div>

                            <div className="relative">
                              <div className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${card.gradient} flex items-center justify-center text-lg shadow-md`}>
                                  {card.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary-400 transition-colors truncate">
                                    {card.title}
                                  </h3>
                                  <p className="text-gray-400 leading-relaxed text-xs line-clamp-2">
                                    {card.description}
                                  </p>
                                </div>
                              </div>

                              {/* Indicador de ação */}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Estatísticas rápidas na parte inferior */}
              <div className="mt-6 pt-6 border-t border-dark-700">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                    <div className="text-lg font-bold text-primary-400 mb-1">{cards.length}</div>
                    <div className="text-xs text-gray-400">Módulos</div>
                  </div>
                  <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-dark-700/50">
                    <div className="text-lg font-bold text-green-400 mb-1">8</div>
                    <div className="text-xs text-gray-400">Categorias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Tarefa Trello */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-dark-900 to-dark-950 border border-dark-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            {/* Header do Modal */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <HiPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Nova Tarefa Trello</h3>
                  <p className="text-gray-400 text-sm">Adicione uma tarefa ao seu quadro</p>
                </div>
              </div>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-800 rounded-lg transition-all duration-200"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Nome da Tarefa */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Nome da Tarefa</span>
                </label>
                <input
                  type="text"
                  value={newTask.name}
                  onChange={(e) => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Digite o nome da tarefa..."
                  className="w-full px-4 py-3 bg-dark-800/50 border border-dark-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {/* Anexo */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                  <HiPaperClip className="w-4 h-4 text-primary-400" />
                  <span>Anexo (opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-3 bg-dark-800/30 border-2 border-dashed border-dark-700 rounded-xl text-gray-300 hover:text-primary-400 hover:border-primary-500 cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-500/20 group-hover:bg-primary-500/30 rounded-lg transition-colors">
                        <HiPaperClip className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {newTask.attachment ? newTask.attachment.name : 'Clique para adicionar arquivo'}
                        </div>
                        <div className="text-sm opacity-75">
                          {newTask.attachment ? `${(newTask.attachment.size / 1024).toFixed(1)} KB` : 'PNG, JPG, PDF, DOC até 10MB'}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Links Externos */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-300 flex items-center space-x-2">
                    <HiLink className="w-4 h-4 text-primary-400" />
                    <span>Links Externos</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="flex items-center space-x-1 px-3 py-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg transition-colors text-sm"
                  >
                    <HiPlus className="w-3 h-3" />
                    <span>Adicionar</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {newTask.links.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => handleLinkChange(index, e.target.value)}
                        placeholder="https://exemplo.com"
                        className="flex-1 px-3 py-2 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-sm"
                      />
                      {newTask.links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <HiX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões */}
              <div className="flex space-x-4 pt-6 border-t border-dark-700">
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.name.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Adicionar Tarefa</span>
                    <HiPlus className="w-4 h-4" />
                  </span>
                </button>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-gray-300 font-semibold rounded-xl border border-dark-700 transition-all duration-200"
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

export default MainHub;
