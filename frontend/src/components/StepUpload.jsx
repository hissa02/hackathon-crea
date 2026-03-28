// src/components/StepUpload.jsx
import React from 'react'

export default function StepUpload({ isArtLinked, triggerFileSelect }) {
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

        <div
          onClick={triggerFileSelect}
          className="ml-11 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-10 text-center hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 active:border-blue-500 transition-all cursor-pointer group"
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
          
          <button className="px-5 py-2.5 bg-blue-600 group-hover:bg-slate-800 active:bg-blue-700 active:scale-95 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200">
            Procurar no Computador
          </button>
        </div>

        <div className="ml-11 mt-4 flex items-start text-amber-700 bg-amber-50 p-3.5 rounded-xl border border-amber-200 shadow-sm">
          <i className="ph-fill ph-warning-circle text-xl mr-3 mt-0.5"></i>
          <p className="text-sm">
            <strong>Atenção:</strong> O <b>Atestado Técnico</b> e o <b>Contrato da Obra</b> não podem estar no mesmo arquivo. Por favor, envie-os em PDFs separados.
          </p>
        </div>
      </div>
    </div>
  )
}