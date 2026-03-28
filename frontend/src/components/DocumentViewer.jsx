// src/components/DocumentViewer.jsx

function PdfAtestado() {
  return (
    <>
      <div className="absolute top-[80px] left-[50px] w-[200px] h-[24px] bg-green-200/40 border border-green-400 rounded"></div>
      {/* Bounding box de erro focada no Endereço */}
      <div className="absolute top-[160px] left-[50px] w-[180px] h-[24px] bg-red-200/40 border border-red-400 rounded group cursor-pointer animate-pulse">
        <div className="hidden group-hover:block absolute top-full mt-1 left-0 bg-red-800 text-white text-[10px] p-2 rounded shadow-lg z-20 w-48">
          Divergência: Este endereço difere do registrado na página da ART.
        </div>
      </div>
      <div className="text-center font-bold text-lg mb-8 border-b pb-4">
        ATESTADO DE CAPACIDADE TÉCNICA
      </div>
      <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
        <p>
          Atestamos para os devidos fins que a empresa{' '}
          <strong>CONSTRUTORA INOVAÇÃO LTDA</strong> prestou serviços técnicos de engenharia civil...
        </p>
        <p>Responsável Técnico: <strong>Eng. Carlos Eduardo Silva</strong></p>
        <p>
          Endereço da Obra:{' '}
          <strong className="text-red-600">Rua das Flores, 100 - Centro</strong>
        </p>
        <p>Número da ART vinculada: <strong>MA20250012345</strong></p>
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

function SystemViewer() {
  return (
    <div className="bg-slate-50 w-full max-w-lg min-h-[600px] shadow-lg rounded-lg border border-slate-300 overflow-hidden flex flex-col">
      <div className="bg-green-700 p-3 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-2">
          <i className="ph-fill ph-shield-check text-xl"></i>
          <span className="font-bold text-sm tracking-wide">CREA-MA / SITAC</span>
        </div>
        <span className="text-[10px] bg-green-800 px-2 py-1 rounded">Página do Sistema</span>
      </div>
      <div className="bg-white border-b border-slate-200 p-4 shrink-0">
        <h2 className="text-sm font-bold text-slate-800">Detalhes da ART Nº MA20250012345</h2>
      </div>
      <div className="p-5 space-y-5 overflow-y-auto custom-scrollbar flex-1">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400">Profissional Registrado</label>
          <div className="bg-slate-100 p-2.5 rounded text-sm text-slate-700 border border-slate-200">
            Eng. Carlos Eduardo Silva
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

export default function DocumentViewer({ documents, selectedDocument, setSelectedDocument }) {
  const currentDoc = documents.find((d) => d.id === selectedDocument)

  return (
    <div className="bg-slate-200 rounded-2xl border border-slate-300 overflow-hidden flex flex-col shadow-inner min-h-[600px]">
      {/* Header com Abas */}
      <div className="bg-slate-800 px-2 pt-2 flex items-end space-x-1 overflow-x-auto custom-scrollbar shrink-0">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocument(doc.id)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg flex items-center whitespace-nowrap transition-colors ${
              selectedDocument === doc.id
                ? 'bg-slate-200 text-slate-800'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {doc.type === 'system' ? (
              <i className="ph-fill ph-browser text-green-500 mr-2"></i>
            ) : (
              <i className={`ph-fill ${doc.id === 'contrato' ? 'ph-file-text text-blue-500' : 'ph-file-pdf text-red-500'} mr-2`}></i>
            )}
            {doc.name}
          </button>
        ))}
      </div>

      {/* Área de Visualização */}
      <div className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-300/50 flex items-start justify-center relative custom-scrollbar">
        {currentDoc?.type === 'pdf' && (
          <div className="bg-white w-full max-w-md min-h-[600px] shadow-lg p-8 relative scale-95 lg:scale-100 origin-top">
            <div className="absolute top-4 right-4 bg-slate-800 text-white px-2 py-1 rounded text-[10px] font-bold">
              Página 1 / {currentDoc?.pages}
            </div>
            {selectedDocument === 'atestado' && <PdfAtestado />}
            {selectedDocument === 'contrato' && <PdfContrato />}
          </div>
        )}
        {currentDoc?.type === 'system' && <SystemViewer />}
      </div>
    </div>
  )
}
