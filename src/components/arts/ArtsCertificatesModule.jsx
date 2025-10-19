import React, { useState, useEffect } from 'react';
import {
  HiColorSwatch,
  HiCamera,
  HiDocumentText,
  HiStar,
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiDownload,
  HiTemplate,
  HiPhotograph,
  HiBadgeCheck,
  HiCog,
  HiSparkles
} from 'react-icons/hi';

function ArtsCertificatesModule() {
  const [activeTab, setActiveTab] = useState('instagram');
  const [artesInstagram, setArtesInstagram] = useState([]);
  const [certificados, setCertificados] = useState([]);
  const [placasOuro, setPlacasOuro] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dados de exemplo - em produção viria da API
  useEffect(() => {
    const mockArtesInstagram = [
      {
        id: 1,
        evento_id: 1,
        tipo: 'instagram',
        modelo: 'Post Principal',
        variaveis: 'titulo,data,local,hashtag',
        preview: '/preview-instagram-1.jpg',
        historico_versoes: [
          { versao: '1.0', data: '2025-01-10', autor: 'Designer' },
          { versao: '1.1', data: '2025-01-12', autor: 'Designer' }
        ]
      },
      {
        id: 2,
        evento_id: 1,
        tipo: 'instagram',
        modelo: 'Story Destaque',
        variaveis: 'titulo,descricao,imagem',
        preview: '/preview-instagram-2.jpg',
        historico_versoes: [
          { versao: '1.0', data: '2025-01-11', autor: 'Designer' }
        ]
      }
    ];

    const mockCertificados = [
      {
        id: 1,
        evento_id: 1,
        inscricao_id: 1,
        numero: 'CERT-2025-001',
        data_emissao: '2025-01-15',
        link_arquivo: '/certificados/cert-001.pdf',
        modelo: 'Certificado Padrão',
        participante_nome: 'João Silva',
        modalidade: 'Palestra'
      },
      {
        id: 2,
        evento_id: 1,
        inscricao_id: 2,
        numero: 'CERT-2025-002',
        data_emissao: '2025-01-16',
        link_arquivo: '/certificados/cert-002.pdf',
        modelo: 'Certificado VIP',
        participante_nome: 'Maria Santos',
        modalidade: 'Workshop'
      }
    ];

    const mockPlacasOuro = [
      {
        id: 1,
        evento_id: 1,
        homenageado: 'Empresa ABC',
        texto: 'Em reconhecimento pela excelência em inovação tecnológica',
        arte_id: 1,
        status_producao: 'producao',
        data_criacao: '2025-01-10',
        prazo_entrega: '2025-01-25'
      },
      {
        id: 2,
        evento_id: 1,
        homenageado: 'Profissional XYZ',
        texto: 'Pelo destaque e contribuição no desenvolvimento de soluções',
        arte_id: 1,
        status_producao: 'aprovado',
        data_criacao: '2025-01-12',
        prazo_entrega: '2025-01-27'
      }
    ];

    setTimeout(() => {
      setArtesInstagram(mockArtesInstagram);
      setCertificados(mockCertificados);
      setPlacasOuro(mockPlacasOuro);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateArteInstagram = () => {
    console.log('Criar nova arte Instagram');
  };

  const handleCreateCertificado = () => {
    console.log('Emitir certificado');
  };

  const handleCreatePlacaOuro = () => {
    console.log('Criar nova placa ouro');
  };

  const handleGeneratePreview = (arte) => {
    console.log('Gerar preview para arte:', arte.id);
  };

  const handleEmitirCertificado = (inscricao) => {
    console.log('Emitir certificado para inscrição:', inscricao.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprovado': return 'bg-green-500/20 text-green-400';
      case 'producao': return 'bg-blue-500/20 text-blue-400';
      case 'pendente': return 'bg-yellow-500/20 text-yellow-400';
      case 'entregue': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'aprovado': return 'Aprovado';
      case 'producao': return 'Em Produção';
      case 'pendente': return 'Pendente';
      case 'entregue': return 'Entregue';
      default: return status;
    }
  };

  const tabs = [
    { id: 'instagram', label: 'Artes Instagram', icon: <HiCamera className="w-5 h-5" />, count: artesInstagram.length },
    { id: 'certificados', label: 'Certificados', icon: <HiBadgeCheck className="w-5 h-5" />, count: certificados.length },
    { id: 'placas', label: 'Placas Ouro', icon: <HiStar className="w-5 h-5" />, count: placasOuro.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'instagram':
        return <ArtesInstagramTab artes={artesInstagram} onCreate={handleCreateArteInstagram} onGeneratePreview={handleGeneratePreview} />;
      case 'certificados':
        return <CertificadosTab certificados={certificados} onCreate={handleCreateCertificado} onEmitir={handleEmitirCertificado} />;
      case 'placas':
        return <PlacasOuroTab placas={placasOuro} onCreate={handleCreatePlacaOuro} />;
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
          <h1 className="text-3xl font-bold text-white">Artes & Certificados</h1>
          <p className="text-gray-400 mt-1">Gerencie artes, certificados e placas de homenagem</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-dark-900 rounded-xl border border-dark-700">
        <div className="flex border-b border-dark-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
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

// Componente para Artes Instagram
function ArtesInstagramTab({ artes, onCreate, onGeneratePreview }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Artes Instagram</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Arte</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artes.map(arte => (
          <div key={arte.id} className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
              <HiPhotograph className="w-16 h-16 text-primary-400" />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-white mb-2">{arte.modelo}</h3>
              <p className="text-gray-400 text-sm mb-3">Variáveis: {arte.variaveis}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">
                  Versão {arte.historico_versoes[arte.historico_versoes.length - 1]?.versao}
                </span>
                <button
                  onClick={() => onGeneratePreview(arte)}
                  className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-black text-sm font-medium rounded transition-colors"
                >
                  Preview
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 text-sm rounded transition-colors">
                  <HiEye className="w-4 h-4 inline mr-1" />
                  Ver
                </button>
                <button className="flex-1 px-3 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 text-sm rounded transition-colors">
                  <HiPencil className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="px-3 py-2 bg-dark-700 hover:bg-dark-600 text-gray-300 text-sm rounded transition-colors">
                  <HiDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para Certificados
function CertificadosTab({ certificados, onCreate, onEmitir }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Certificados</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Emitir Certificado</span>
        </button>
      </div>

      <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden">
        <div className="p-6 border-b border-dark-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Certificados Emitidos</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-700 rounded-lg text-gray-300 hover:text-white transition-colors">
            <HiDownload className="w-4 h-4" />
            <span>Exportar Lista</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Participante
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Modalidade
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Data Emissão
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Modelo
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {certificados.map(certificado => (
                <tr key={certificado.id} className="hover:bg-dark-800 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{certificado.participante_nome}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{certificado.modalidade}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-primary-400 font-mono">{certificado.numero}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-gray-300">
                      {new Date(certificado.data_emissao).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm text-gray-300">{certificado.modelo}</div>
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

// Componente para Placas Ouro
function PlacasOuroTab({ placas, onCreate }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Placas Ouro</h2>
        <button
          onClick={onCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-black font-medium rounded-lg transition-colors"
        >
          <HiPlus className="w-4 h-4" />
          <span>Nova Placa</span>
        </button>
      </div>

      <div className="grid gap-6">
        {placas.map(placa => (
          <div key={placa.id} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-2">{placa.homenageado}</h3>
                <p className="text-gray-300 mb-3">{placa.texto}</p>

                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Status:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(placa.status_producao)}`}>
                    {getStatusText(placa.status_producao)}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <span>Criado: {new Date(placa.data_criacao).toLocaleDateString('pt-BR')}</span>
                  <span>Prazo: {new Date(placa.prazo_entrega).toLocaleDateString('pt-BR')}</span>
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

            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <div className="text-sm text-gray-400">
                Arte ID: {placa.arte_id}
              </div>
              <div className="flex items-center space-x-2">
                {placa.status_producao === 'aprovado' && (
                  <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors">
                    Iniciar Produção
                  </button>
                )}
                {placa.status_producao === 'producao' && (
                  <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors">
                    Marcar Entregue
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Funções auxiliares (reutilizadas)
function getStatusColor(status) {
  switch (status) {
    case 'aprovado': return 'bg-green-500/20 text-green-400';
    case 'producao': return 'bg-blue-500/20 text-blue-400';
    case 'pendente': return 'bg-yellow-500/20 text-yellow-400';
    case 'entregue': return 'bg-purple-500/20 text-purple-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}

function getStatusText(status) {
  switch (status) {
    case 'aprovado': return 'Aprovado';
    case 'producao': return 'Em Produção';
    case 'pendente': return 'Pendente';
    case 'entregue': return 'Entregue';
    default: return status;
  }
}

export default ArtsCertificatesModule;

