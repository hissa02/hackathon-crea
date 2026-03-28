// src/components/AutomaticReview.jsx
import { useState } from 'react'

function ValidationStepItem({ step, toggleComment, handleJustificationChange }) {
  return (
    <div className={`p-4 rounded-lg border transition-colors shadow-sm relative z-10 ${
        step.status === 'pass' ? 'bg-white border-green-200' : step.status === 'error' ? 'bg-red-50 border-red-300' : 'bg-white border-slate-200'
      }`}>
      <div className="flex gap-4">
        <div className="shrink-0 mt-0.5">
          {step.status === 'pass'    && <i className="ph-fill ph-check-circle text-2xl text-green-500 bg-white rounded-full"></i>}
          {step.status === 'error'   && <i className="ph-fill ph-x-circle text-2xl text-red-500 bg-white rounded-full"></i>}
          {step.status === 'neutral' && <i className="ph-fill ph-minus-circle text-2xl text-slate-400 bg-white rounded-full"></i>}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className={`text-sm font-bold ${step.status === 'pass' ? 'text-green-800' : step.status === 'error' ? 'text-red-800' : 'text-slate-700'}`}>
                {step.title}
              </h4>
              <p className={`text-xs mt-1 ${step.status === 'error' ? 'text-red-700 font-medium' : 'text-slate-600'}`}>
                {step.desc}
              </p>
            </div>
            <button onClick={() => toggleComment(step.id)} title="Adicionar Parecer" className={`ml-2 shrink-0 p-1.5 rounded transition-colors flex items-center justify-center border ${step.showComment || step.justification ? 'bg-blue-100 text-blue-600 border-blue-200' : 'text-slate-400 border-transparent hover:bg-slate-100 hover:text-slate-600'}`}>
              <i className={`${step.showComment || step.justification ? 'ph-fill' : 'ph'} ph-chat-text text-lg`}></i>
            </button>
          </div>
          {(step.status === 'error' || step.showComment || (step.justification && step.justification.length > 0)) && (
            <div className="mt-3 border-t border-black/10 pt-3 fade-in">
              <label className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <i className="ph-fill ph-pencil-simple mr-1.5 text-sm"></i> Parecer do Analista
              </label>
              <textarea
                className="w-full border border-slate-300 rounded p-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-inner"
                rows="3"
                placeholder="Descreva a justificativa..."
                value={step.justification || ''}
                onChange={(e) => handleJustificationChange(step.id, e.target.value)}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AutomaticReview({ rightTab, setRightTab, validationSteps, toggleComment, handleJustificationChange }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyReport = () => {
    const errors = validationSteps.filter(step => step.status === 'error' || (step.justification && step.justification.trim() !== ''))
    if (errors.length === 0) return alert("Não há pendências.")
    
    let reportText = "Olá,\n\nApós a análise, identificamos pendências:\n\n"
    errors.forEach(err => {
      reportText += `📍 ${err.title}:\n${err.justification || err.desc}\n\n`
    })
    reportText += "Atenciosamente,\nSetor Técnico."

    navigator.clipboard.writeText(reportText).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2500)
    })
  }

  const errorsCount = validationSteps.filter(step => step.status === 'error').length

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
      
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl shrink-0">
        <div className="flex items-center text-indigo-600">
          <i className="ph-fill ph-check-circle text-2xl mr-2"></i>
          <h2 className="text-base lg:text-lg font-bold text-slate-800">Parecer Automático</h2>
        </div>
        <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          {validationSteps.length}/{validationSteps.length} Regras
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 shrink-0 px-2">
        <button onClick={() => setRightTab('dados')} className={`flex-1 py-3 px-2 text-xs lg:text-sm font-medium border-b-2 transition-colors flex justify-center items-center ${rightTab === 'dados' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
          <i className="ph ph-text-t mr-1.5 text-lg"></i> Dados Extraídos
        </button>
        <button onClick={() => setRightTab('validacao')} className={`flex-1 py-3 px-2 text-xs lg:text-sm font-medium border-b-2 transition-colors flex justify-center items-center ${rightTab === 'validacao' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
          <i className="ph ph-git-diff mr-1.5 text-lg"></i> Checklist
          {errorsCount > 0 && (
            <span className="ml-1.5 bg-red-100 text-red-700 py-0.5 px-2 rounded-full text-[10px] leading-none font-bold">
              {errorsCount} Erros
            </span>
          )}
        </button>
      </div>

      {/* Conteúdo com a BARRA DE ROLAGEM */}
      <div className="p-4 lg:p-6 flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
        {rightTab === 'dados' && (
          <div className="fade-in space-y-4">
            <input type="text" readOnly value="CNPJ: 12.345.678/0001-90" className="w-full border border-slate-200 rounded p-2.5 text-sm bg-white" />
            <input type="text" readOnly value="ART: MA20250012345" className="w-full border border-slate-200 rounded p-2.5 text-sm bg-white" />
          </div>
        )}

        {rightTab === 'validacao' && (
          <div className="fade-in space-y-3 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {validationSteps.map((step) => (
              <ValidationStepItem key={step.id} step={step} toggleComment={toggleComment} handleJustificationChange={handleJustificationChange} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 lg:p-5 border-t border-slate-100 bg-white rounded-b-2xl flex justify-between items-center shrink-0">
        <div className={`text-xs font-bold flex items-center px-3 py-1.5 rounded-lg border ${errorsCount > 0 ? 'text-red-600 bg-red-50 border-red-100' : 'text-green-600 bg-green-50 border-green-100'}`}>
          {errorsCount > 0 ? <><i className="ph-fill ph-warning mr-2 text-lg"></i> Com Pendências</> : <><i className="ph-fill ph-check-circle mr-2 text-lg"></i> Aprovado</>}
        </div>
        <div className="flex space-x-2">
          <button onClick={handleCopyReport} className={`px-4 py-2.5 text-xs lg:text-sm font-medium border rounded-lg flex items-center transition-colors ${isCopied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}>
            <i className={`mr-1.5 text-lg ${isCopied ? 'ph-fill ph-check text-green-600' : 'ph ph-copy'}`}></i>
            {isCopied ? 'Copiado!' : 'Copiar Erros'}
          </button>
          <button className="px-5 py-2.5 text-xs lg:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center">
            Emitir Parecer <i className="ph-bold ph-paper-plane-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  )
}