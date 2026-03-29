// src/components/StepUpload.jsx
import React, { useState } from 'react'

export default function StepUpload(props) {
  const { 
    uploadState, progress, fileInputRef, triggerFileSelect, 
    handleFileChange, artData, fetchArtData 
  } = props;
  
  const [artInput, setArtInput] = useState('MA202612345');

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* CAIXA 1: VINCULAR ART */}
      <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 w-full shadow-sm box-border overflow-hidden">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm shadow-md flex-shrink-0">1</div>
          Vincular ART do SITAC
        </h3>
        
        {/* AQUI ESTÁ A MÁGICA: flex-col no mobile, sm:flex-row para PC, e min-w-0 no input */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input 
            type="text" 
            placeholder="Ex: MA202612345" 
            value={artInput}
            onChange={(e) => setArtInput(e.target.value)}
            className="flex-1 min-w-0 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm text-slate-700 font-medium"
          />
          <button 
            onClick={() => fetchArtData(artInput)}
            className="whitespace-nowrap px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-bold transition-colors shadow-sm flex items-center justify-center gap-2 sm:w-auto"
          >
            <i className="ph ph-magnifying-glass"></i> Buscar
          </button>
        </div>
        
        {artData && (
          <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-3">
            <i className="ph-fill ph-check-circle text-xl flex-shrink-0"></i>
            <span className="break-words">Profissional localizado: <strong>{artData.profissional}</strong></span>
          </div>
        )}
      </div>

      {/* CAIXA 2: UPLOAD DE ARQUIVOS */}
      <div className={`border border-slate-200 rounded-xl p-6 bg-white w-full shadow-sm transition-opacity duration-300 box-border overflow-hidden ${artData ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm shadow-md flex-shrink-0">2</div>
          Enviar Documentos
        </h3>
        
        <input 
          type="file" 
          multiple 
          accept=".pdf,image/*" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />

        <div
          onClick={triggerFileSelect}
          className="w-full border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center p-8 sm:p-10 text-center hover:bg-blue-50 hover:border-blue-400 cursor-pointer group transition-all"
        >
          {uploadState === 'uploading' ? (
            <div className="flex flex-col items-center w-full">
              <i className="ph ph-spinner-gap text-5xl text-blue-600 animate-spin mb-4"></i>
              <p className="text-slate-600 font-medium mb-3 text-lg">Processando arquivos e IA...</p>
              <div className="w-full max-w-md bg-slate-200 rounded-full h-3 mt-2 shadow-inner">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : uploadState === 'done' ? (
            <div className="flex flex-col items-center text-green-600">
              <i className="ph-fill ph-check-circle text-6xl mb-3"></i>
              <p className="font-bold text-xl">Upload Concluído!</p>
              <p className="text-slate-500 mt-2 font-medium">Os documentos já podem ser visualizados na aba lateral.</p>
            </div>
          ) : (
            <>
              <div className="h-16 w-16 bg-white text-blue-600 shadow-md border border-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                <i className="ph ph-upload-simple text-3xl"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-700">Clique para selecionar os PDFs</h3>
              <p className="text-sm text-slate-500 mt-2">Envie o Atestado, Contratos e Laudos de uma vez.</p>
            </>
          )}
        </div>
      </div>

    </div>
  )
}