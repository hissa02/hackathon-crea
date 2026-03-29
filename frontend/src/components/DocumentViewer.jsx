// src/components/DocumentViewer.jsx
import React from 'react';

// --- SUBCOMPONENTES DE VISUALIZAÇÃO DE PDF ---

function PdfAtestado() {
  return (
    <>
      <div className="absolute top-[80px] left-[50px] w-[200px] h-[24px] bg-green-200/40 border border-green-400 rounded"></div>
      <div className="absolute top-[160px] left-[50px] w-[180px] h-[24px] bg-red-200/40 border border-red-400 rounded group cursor-pointer animate-pulse">
        <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-red-800 text-white text-[10px] p-2 rounded shadow-lg z-20 w-48">
          Divergência: Este endereço difere do registrado na página da ART.
        </div>
      </div>
      <div className="text-center font-bold text-lg mb-8 border-b pb-4">
        ATESTADO DE CAPACIDADE TÉCNICA
      </div>
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>Atestamos para os devidos fins que a empresa <strong>CONSTRUTORA INOVAÇÃO LTDA</strong> prestou serviços...</p>
        <p>Responsável Técnico: <strong>Eng. Marcelo Ribeiro Costa</strong></p>
        <p>Endereço da Obra: <strong className="text-red-600">Rua das Flores, 100 - Centro</strong></p>
        <p>Número da ART vinculada: <strong>MA20260000201</strong></p>
        <p>Período de execução: <strong>10/01/2025 a 15/12/2025</strong></p>
      </div>
    </>
  )
}

function PdfContrato() {
  return (
    <>
      <div className="text-center font-bold text-lg mb-8 border-b pb-4">
        CONTRATO DE PRESTAÇÃO DE SERVIÇOS
      </div>
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>CONTRATANTE: Prefeitura Municipal... CONTRATADA: Construtora Inovação LTDA.</p>
        <p>Objeto: Execução de fundação profunda e concretagem.</p>
      </div>
    </>
  )
}

function PdfDeclaracao() {
  return (
    <>
      <div className="text-center font-bold text-lg mb-8 border-b pb-4">
        DECLARAÇÃO DE VERACIDADE
      </div>
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>Declaro, sob as penas da lei, que as informações contidas nos documentos apresentados são verdadeiras...</p>
        <p>Assinatura: ___________________________</p>
      </div>
    </>
  )
}

function PdfArtLaudo() {
  return (
    <>
      <div className="text-center font-bold text-lg mb-8 border-b pb-4">
        ART DO LAUDO TÉCNICO
      </div>
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>Conselho Regional de Engenharia e Agronomia do Maranhão</p>
        <p>Atividade: Laudo Técnico de Engenharia</p>
        <p>Nº da ART: <strong>MA20260098765</strong></p>
      </div>
    </>
  )
}

function SystemViewer() {
  return (
    <div className="bg-slate-50 w-full max-w-lg shadow-lg rounded-lg border border-slate-300 overflow-hidden flex flex-col min-h-[500px]">
      <div className="bg-green-700 p-3 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2">
          <i className="ph-fill ph-shield-check text-xl"></i>
          <span className="font-bold text-sm tracking-wide">CREA-MA / SITAC</span>
        </div>
        <span className="text-[10px] bg-green-800 px-2 py-1 rounded">Página do Sistema</span>
      </div>
      <div className="bg-white border-b border-slate-200 p-4 shrink-0">
        <h2 className="text-sm font-bold text-slate-800">Detalhes da ART Nº MA20260000201</h2>
      </div>
      <div className="p-5 space-y-5 overflow-y-auto custom-scrollbar flex-1 bg-white">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Profissional Registrado</label>
          <div className="bg-slate-100 p-2.5 rounded text-sm text-slate-700 border border-slate-200">
            Eng. Marcelo Ribeiro Costa
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Endereço da Obra (Divergente)</label>
          <div className="bg-yellow-50 p-2.5 rounded text-sm text-yellow-800 border border-yellow-200 flex items-start">
            <i className="ph-fill ph-warning mr-2 mt-0.5 text-yellow-600"></i>
            Avenida Principal, S/N - Centro
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyDocumentState({ docName, triggerFileSelect }) {
  const shortName = docName.split(' ')[0] 
  
  return (
    <div className="flex flex-col items-center justify-start pt-24 w-full h-full text-center">
      <div className="h-20 w-20 bg-white border border-slate-200 text-slate-400 shadow-sm rounded-full flex items-center justify-center mb-4">
        <i className="ph ph-file-dashed text-4xl"></i>
      </div>
      <h3 className="text-lg font-bold text-slate-700 mb-2">
        Nenhum documento anexado
      </h3>
      <p className="text-slate-500 text-sm mb-6 max-w-xs">
        O {docName} não foi enviado durante a etapa de upload. Você pode anexá-lo agora.
      </p>
      
      <button 
        onClick={triggerFileSelect}
        className="px-5 py-2.5 bg-blue-600 hover:bg-slate-800 active:bg-blue-700 active:scale-95 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center"
      >
        <i className="ph ph-paperclip mr-2 text-lg"></i>
        Anexar {shortName}
      </button>
    </div>
  )
}

export default function DocumentViewer({ documents, selectedDocument, setSelectedDocument, triggerFileSelect }) {
  
  // Verifica dinamicamente se existe um laudo anexado para tornar a ART do Laudo obrigatória
  const hasLaudo = documents.some(doc => doc.id === 'laudo');

  // Nova ordem e novos documentos inseridos
  const fixedTabs = [
    { id: 'atestado', name: 'Atestado Técnico', icon: 'ph-file-pdf text-red-500', isRequired: true },
    { id: 'sitac', name: 'Página da ART', icon: 'ph-browser text-green-500', isRequired: true },
    { id: 'contrato', name: 'Contrato', icon: 'ph-file-text text-blue-500', isRequired: true },
    { id: 'declaracao', name: 'Declaração', icon: 'ph-file-doc text-purple-500', isRequired: true },
    { id: 'laudo', name: 'Laudo (Opcional)', icon: 'ph-files text-amber-500', isRequired: false },
    { id: 'art_laudo', name: 'ART do Laudo', icon: 'ph-file-pdf text-emerald-500', isRequired: hasLaudo }
  ]

  const currentTab = fixedTabs.find(tab => tab.id === selectedDocument) || fixedTabs[0]
  const isDocumentUploaded = currentTab.id === 'sitac' || documents.some(doc => doc.id === currentTab.id)

  return (
    <div className="bg-slate-200 rounded-2xl border border-slate-300 overflow-hidden flex flex-col shadow-inner min-h-[600px] h-[600px]">
      
      <div className="bg-slate-800 px-2 pt-2 flex items-end space-x-1 overflow-x-auto custom-scrollbar shrink-0">
        {fixedTabs.map((tab) => {
          const hasFile = tab.id === 'sitac' || documents.some(d => d.id === tab.id)
          
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedDocument(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-lg flex items-center whitespace-nowrap transition-colors relative ${
                selectedDocument === tab.id
                  ? 'bg-slate-200 text-slate-800' 
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <i className={`ph-fill ${tab.icon} mr-2`}></i>
              {tab.name}
              {!hasFile && selectedDocument !== tab.id && (
                 <span className={`ml-2 w-2 h-2 rounded-full ${tab.isRequired ? 'bg-red-500' : 'bg-slate-500'}`} title="Não enviado"></span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-300/50 flex items-start justify-center relative custom-scrollbar">
        {isDocumentUploaded && selectedDocument === 'sitac' && <SystemViewer />}
        
        {isDocumentUploaded && selectedDocument !== 'sitac' && (
          <div className="bg-white w-full max-w-md min-h-[600px] shadow-lg p-8 relative scale-95 lg:scale-100 origin-top flex flex-col">
            <div className="absolute top-4 right-4 bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold z-10">
              Página 1 / 1
            </div>
            {/* Renderização dinâmica dos PDFs */}
            {selectedDocument === 'atestado' && <PdfAtestado />}
            {selectedDocument === 'contrato' && <PdfContrato />}
            {selectedDocument === 'declaracao' && <PdfDeclaracao />}
            {selectedDocument === 'art_laudo' && <PdfArtLaudo />}
            {/* Se você tiver um componente para o 'laudo' depois, é só adicionar aqui! */}
          </div>
        )}

        {!isDocumentUploaded && (
          <EmptyDocumentState docName={currentTab.name} triggerFileSelect={triggerFileSelect} />
        )}
      </div>
    </div>
  )
}