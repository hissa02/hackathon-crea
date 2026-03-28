// src/components/ProcessingState.jsx
export default function ProcessingState({ uploadState, progress }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-12 shadow-sm min-h-[500px]">
      <div className="relative mb-8 flex items-center space-x-8">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 bg-green-50 rounded-2xl border border-green-200 flex flex-col items-center justify-center relative">
            <i className="ph ph-browser text-4xl text-green-500"></i>
          </div>
          <span className="text-xs font-bold text-slate-500 mt-3 uppercase tracking-wider">SITAC</span>
        </div>

        <div className="h-24 w-24 bg-purple-50 rounded-full flex items-center justify-center overflow-hidden relative shadow-inner">
          <i className="ph ph-cpu text-5xl text-purple-600 animate-pulse z-10"></i>
          <div className="absolute left-0 right-0 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] animate-scan w-full"></div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-20 w-16 bg-blue-50 rounded-lg border border-blue-200 flex flex-col items-center justify-center relative shadow-sm">
            <i className="ph-fill ph-files text-4xl text-blue-500"></i>
          </div>
          <span className="text-xs font-bold text-slate-500 mt-3 uppercase tracking-wider">Documentos</span>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        {uploadState === 'uploading' ? 'Lendo PDFs múltiplos...' : 'Executando Checklist de 11 Pontos...'}
      </h3>
      <p className="text-slate-500 mb-8 text-center max-w-lg text-sm">
        A IA não interrompe a análise ao encontrar erros. Ela avalia todos os pontos para gerar um relatório de inconsistências completo e seguro.
      </p>

      <div className="w-full max-w-md bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            uploadState === 'uploading' ? 'bg-blue-500' : 'bg-purple-500'
          }`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium text-slate-500 mt-2">{progress}%</span>
    </div>
  )
}
