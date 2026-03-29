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
    reportStatus, handleSendReport // Props Novas
  } = props

  return (
    <div className="flex h-screen w-full relative">
      
      {/* =========================================
          MENU LATERAL (SIDEBAR) INTEGRADO
      ========================================= */}
      <aside className={`absolute top-0 left-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <i className="ph-fill ph-hard-hat text-blue-500"></i>
            CREA<span className="text-blue-500">PRO</span>
          </h1>
          <button onClick={toggleSidebar} className="text-slate-500 hover:text-white lg:hidden">
            <i className="ph ph-x text-2xl"></i>
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => { setActiveMenu('analise'); if(window.innerWidth < 1024) toggleSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeMenu === 'analise' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="ph ph-user text-xl"></i>
            Área do Profissional
          </button>

          <button 
            onClick={() => { setActiveMenu('parecer'); if(window.innerWidth < 1024) toggleSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeMenu === 'parecer' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="ph ph-magnifying-glass text-xl"></i>
            Área do Analista
            {uploadState === 'done' && validationSteps.some(s => s.status === 'error') && (
              <span className="ml-auto w-2 h-2 rounded-full bg-red-500"></span>
            )}
          </button>
        </nav>
      </aside>

      {/* =========================================
          ÁREA PRINCIPAL DE CONTEÚDO
      ========================================= */}
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        
        <header className="sticky top-0 bg-white border-b border-slate-200 p-4 shadow-sm z-10 flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <i className={`ph ${isSidebarOpen ? 'ph-x' : 'ph-list'} text-2xl`}></i>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-white shadow">
              <i className="ph-fill ph-robot text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Validação IA</h1>
              <p className="text-sm text-slate-500">Acervo Técnico CREA</p>
            </div>
          </div>
        </header>

        <div className="p-8">
          
          {/* TELA 1: ÁREA DO PROFISSIONAL */}
          {activeMenu === 'analise' && (
            <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
              <div className="w-full xl:w-1/3 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h1 className="text-xl font-bold text-slate-800 mb-2">Entrada de Documentos</h1>
                  <p className="text-sm text-slate-500 mb-4">Busque a ART e faça o upload dos arquivos.</p>
                  
                  <StepUpload
                    uploadState={uploadState}
                    progress={progress}
                    fileInputRef={fileInputRef}
                    triggerFileSelect={triggerFileSelect}
                    handleFileChange={handleFileChange}
                    artData={artData}
                    fetchArtData={fetchArtData}
                  />
                </div>

                {uploadState === 'done' && (
                  <button
                    onClick={resetProcess}
                    className="w-full py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <i className="ph ph-trash mr-2"></i> Limpar e Recomeçar
                  </button>
                )}
              </div>

              <div className="w-full xl:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[700px]">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <i className="ph ph-file-pdf text-red-500"></i> Documentação Anexada
                </h2>

                {uploadState === 'done' ? (
                  <>
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
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
                          {doc.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex-1 bg-slate-200 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-slate-500 overflow-hidden relative min-h-[600px] shadow-inner">
                      <i className="ph-fill ph-file-pdf text-6xl mb-4 text-slate-400"></i>
                      <p className="font-medium text-lg text-slate-600">Visualizador de PDF</p>
                      <p className="text-sm">Exibindo: {documents.find(d => d.id === selectedDocument)?.name}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                    <i className="ph ph-tray-arrow-down text-5xl mb-4"></i>
                    <p>Nenhum documento carregado.</p>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* TELA 2: ABA DO ANALISTA */}
          {activeMenu === 'parecer' && (
            <div className="max-w-[1000px] mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[800px]">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <i className="ph-fill ph-robot text-blue-600"></i> Parecer Automático IA
                </h2>
                {/* AQUI ESTÁ A MÁGICA DO BOTÃO DE ENVIAR */}
                {uploadState === 'done' && (
                  <button 
                    onClick={handleSendReport}
                    disabled={reportStatus !== 'idle'}
                    className={`px-6 py-3 text-white rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2 ${
                      reportStatus === 'sent' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {reportStatus === 'idle' && <><i className="ph ph-paper-plane-tilt text-xl"></i> Gerar e Enviar Relatório</>}
                    {reportStatus === 'sending' && <><i className="ph ph-spinner animate-spin text-xl"></i> Enviando...</>}
                    {reportStatus === 'sent' && <><i className="ph-fill ph-check-circle text-xl"></i> Enviado via WhatsApp e E-mail!</>}
                  </button>
                )}
              </div>

              {uploadState === 'done' ? (
                <div className="space-y-4">
                  {validationSteps.map(step => (
                    <div key={step.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                          {step.status === 'pass' && <i className="ph-fill ph-check-circle text-3xl text-green-500"></i>}
                          {step.status === 'error' && <i className="ph-fill ph-x-circle text-3xl text-red-500"></i>}
                          {step.status === 'neutral' && <i className="ph-fill ph-minus-circle text-3xl text-slate-400"></i>}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className={`text-lg font-bold ${step.status === 'error' ? 'text-red-700' : 'text-slate-800'}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">{step.desc}</p>
                          
                          {/* AGORA TODOS OS ITENS (ERRO OU PASS) TÊM BOTÃO DE OBSERVAÇÃO */}
                          <div className="mt-4">
                            <button 
                              onClick={() => toggleComment(step.id)}
                              className={`text-sm font-bold flex items-center px-4 py-2 rounded-lg border transition-colors ${
                                step.status === 'error' 
                                  ? 'text-red-700 hover:text-red-800 bg-red-100/50 border-red-200' 
                                  : 'text-green-700 hover:text-green-800 bg-green-100/50 border-green-200'
                              }`}
                            >
                              <i className={`ph ${step.status === 'error' ? 'ph-warning-circle' : 'ph-chat-teardrop-text'} mr-2 text-lg`}></i>
                              {step.showComment 
                                ? (step.status === 'error' ? 'Ocultar Justificativa' : 'Ocultar Observação') 
                                : (step.status === 'error' ? 'Ver Erro Encontrado' : 'Adicionar Observação')}
                              <i className={`ph ph-caret-${step.showComment ? 'up' : 'down'} ml-2`}></i>
                            </button>
                            
                            {step.showComment && (
                              <div className="mt-3">
                                <textarea 
                                  className={`w-full text-sm p-4 bg-white border rounded-xl text-slate-800 shadow-sm focus:outline-none focus:ring-2 ${
                                    step.status === 'error' ? 'border-red-200 focus:ring-red-400' : 'border-green-200 focus:ring-green-400'
                                  }`}
                                  rows="3" 
                                  placeholder={step.status === 'error' ? "Descreva o erro encontrado..." : "Adicione uma observação opcional..."}
                                  value={step.justification || ''} 
                                  onChange={(e) => handleJustificationChange(step.id, e.target.value)} 
                                />
                              </div>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 py-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                  <i className="ph ph-magnifying-glass text-6xl mb-4"></i>
                  <p>Nenhuma análise em andamento.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}