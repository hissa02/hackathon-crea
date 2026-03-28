// src/components/StepUpload.jsx
export default function StepUpload({ isArtLinked, fileInputRef, triggerFileSelect, handleFileChange }) {
  return (
    <div className={`transition-opacity duration-300 ${isArtLinked ? 'opacity-100' : 'opacity-50'}`}>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
            2
          </div>
          <h2 className="text-lg font-bold text-slate-800">
            Enviar Documentos (Atestados, Contratos, Laudos)
          </h2>
        </div>

        {/* INPUT DE ARQUIVO REAL (Oculto) */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
        />

        <div
          onClick={triggerFileSelect}
          className="ml-11 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-10 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="h-16 w-16 bg-white text-blue-500 shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <i className="ph ph-file-arrow-up text-3xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-1">
            Clique para selecionar arquivos PDFs/Imagens
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md">
            A IA irá classificar cada documento (Atestado, Contrato, Laudo) e cruzá-los com a página do SITAC.
          </p>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm pointer-events-none transition-colors">
            Procurar no Computador
          </button>
        </div>
      </div>
    </div>
  )
}
