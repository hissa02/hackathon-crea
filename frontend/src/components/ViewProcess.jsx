// src/components/ViewProcess.jsx
import React from 'react'
import StepUpload from './StepUpload'

export default function ViewProcess(props) {
  const {
    isSidebarOpen, toggleSidebar,
    activeMenu, setActiveMenu,
    uploadState, progress, fileInputRef, triggerFileSelect,
    handleFileChange, resetProcess, validationSteps, 
    toggleComment, handleJustificationChange,
    selectedDocument, setSelectedDocument, documents,
    artData, fetchArtData,
    reportStatus, handleSendReport
  } = props

  // Força a aba da ART a ser a primeira quando o upload termina ou quando troca de menu
  React.useEffect(() => {
    if (uploadState === 'done' && !selectedDocument) {
      setSelectedDocument('art-html');
    }
  }, [uploadState, selectedDocument, setSelectedDocument]);

  // Componente Interno: Visualizador de Documentos (Reutilizável)
  const DocumentViewer = () => (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[750px]">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="ph ph-file-pdf text-red-500"></i> Documentação do Processo
      </h2>

      {uploadState === 'done' ? (
        <>
          {/* ABAS DE NAVEGAÇÃO ENTRE DOCUMENTOS */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
            <button
              onClick={() => setSelectedDocument('art-html')}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors border ${
                selectedDocument === 'art-html'
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <i className="ph ph-browser mr-2"></i> Página da ART (SITAC)
            </button>

            {documents.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocument(doc.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors border ${
                  selectedDocument === doc.id
                    ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <i className="ph ph-file-pdf mr-2 text-red-500"></i> {doc.name}
              </button>
            ))}
          </div>
          
          {/* ÁREA DO IFRAME */}
          <div className="flex-1 bg-slate-200 rounded-xl border border-slate-300 overflow-hidden relative shadow-inner flex flex-col">
            {selectedDocument === 'art-html' ? (
              <iframe 
                src={`/banco_de_dados_da_ART/${artData?.numero_art || 'MA20260000201'}.html`} 
                className="w-full h-full flex-1 border-0 bg-white"
                title="Visualizador SITAC"
              />
            ) : (
              <iframe 
                src={documents.find(d => d.id === selectedDocument)?.url} 
                className="w-full h-full flex-1 border-0"
                title="Visualizador PDF"
              />
            )}
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <i className="ph ph-tray-arrow-down text-5xl mb-4"></i>
          <p className="font-medium">Aguardando envio de documentos...</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen w-full relative bg-slate-50">
      
      {/* SIDEBAR */}
      <aside className={`absolute top-0 left-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <i className="ph-fill ph-hard-hat text-blue-500"></i> CREA<span className="text-blue-500">PRO</span>
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveMenu('analise')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeMenu === 'analise' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <i className="ph ph-user text-xl"></i> Área do Profissional
          </button>
          <button 
            onClick={() => setActiveMenu('parecer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeMenu === 'parecer' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <i className="ph ph-magnifying-glass text-xl"></i> Aba do Analista
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        
        <header className="sticky top-0 bg-white border-b border-slate-200 p-4 shadow-sm z-10 flex items-center gap-4">
          <button onClick={toggleSidebar} className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <i className={`ph ${isSidebarOpen ? 'ph-x' : 'ph-list'} text-2xl`}></i>
          </button>
          <h1 className="text-xl font-bold text-slate-800">Validação de Acervo Técnico com IA</h1>
        </header>

        <div className="p-8">
          
          {/* VISÃO 1: PROFISSIONAL */}
          {activeMenu === 'analise' && (
            <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
              <div className="w-full xl:w-1/3 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">1. Dados do Processo</h3>
                  <StepUpload {...props} />
                </div>
                {uploadState === 'done' && (
                  <button onClick={resetProcess} className="w-full py-3 bg-white border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors">
                    <i className="ph ph-trash mr-2"></i> Limpar Tudo
                  </button>
                )}
              </div>
              <div className="w-full xl:w-2/3">
                 <DocumentViewer />
              </div>
            </div>
          )}

          {/* VISÃO 2: ANALISTA (LADO A LADO) */}
          {activeMenu === 'parecer' && (
            <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-6">
              {uploadState === 'done' ? (
                <>
                  {/* ESQUERDA: DOCUMENTOS */}
                  <div className="w-full xl:w-1/2">
                    <DocumentViewer />
                  </div>
                  
                  {/* DIREITA: PARECER DA IA */}
                  <div className="w-full xl:w-1/2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full min-h-[750px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-8 pb-6 border-b">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <i className="ph-fill ph-robot text-blue-600"></i> Parecer da IA
                      </h2>
                      <button onClick={handleSendReport} className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
                        {reportStatus === 'sent' ? 'Relatório Enviado!' : 'Enviar Parecer'}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {validationSteps.map(step => (
                        <div key={step.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                          <div className="flex gap-4">
                            <div className="mt-1">
                              {step.status === 'pass' ? <i className="ph-fill ph-check-circle text-3xl text-green-500"></i> : <i className="ph-fill ph-x-circle text-3xl text-red-500"></i>}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-slate-800">{step.title}</h4>
                              <p className="text-sm text-slate-600 mb-3">{step.desc}</p>
                              
                              <button onClick={() => toggleComment(step.id)} className="text-sm font-bold text-blue-600 flex items-center gap-1">
                                {step.showComment ? 'Ocultar ajuste' : 'Adicionar observação do analista'}
                                <i className={`ph ph-caret-${step.showComment ? 'up' : 'down'}`}></i>
                              </button>

                              {step.showComment && (
                                <textarea 
                                  className="w-full mt-3 p-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                  rows="3"
                                  value={step.justification || ''}
                                  onChange={(e) => handleJustificationChange(step.id, e.target.value)}
                                  placeholder="Escreva aqui seu parecer técnico sobre este item..."
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                  <i className="ph ph-warning-circle text-5xl text-slate-300 mb-4"></i>
                  <p className="text-slate-500">Realize o upload dos documentos na Área do Profissional para liberar a análise.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}