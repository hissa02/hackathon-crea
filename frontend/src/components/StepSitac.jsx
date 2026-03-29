// src/components/StepSitac.jsx
export default function StepSitac({ sitacArt, setSitacArt, isArtLinked, setIsArtLinked, handleLinkArt }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
          1
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          Localizar Página da ART/CAT no SITAC
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 ml-11">
        <div className="relative flex-1">
          <i className="ph ph-database absolute left-4 top-3.5 text-slate-400 text-lg"></i>
          <input
            type="text"
            value={sitacArt}
            onChange={(e) => setSitacArt(e.target.value)}
            className="w-full border border-slate-300 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium"
            placeholder="Digite o número da ART (ex: MA20250012345)..."
            disabled={isArtLinked}
          />
        </div>
        {!isArtLinked ? (
          <button
            onClick={handleLinkArt}
            className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors shrink-0 shadow-sm"
          >
            Buscar no Sistema
          </button>
        ) : (
          <button
            onClick={() => { setIsArtLinked(false); setSitacArt('') }}
            className="bg-slate-100 text-slate-600 px-6 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors shrink-0 border border-slate-300"
          >
            Alterar ART
          </button>
        )}
      </div>

      {isArtLinked && (
        <div className="mt-4 ml-11 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start fade-in">
          <i className="ph-fill ph-check-circle mr-3 text-green-500 text-xl mt-0.5"></i>
          <div>
            <h4 className="text-sm font-bold text-green-800">
              Página da ART / Profissional Vinculada
            </h4>
            <div className="text-sm text-green-700 mt-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <p><b>Profissional:</b> Eng.  Marcelo Ribeiro Costa</p>
              <p>
                <b>Status:</b>{' '}
                <span className="bg-green-200 px-2 py-0.5 rounded text-xs">Ativo/Adimplente</span>
              </p>
              <p><b>Contratante:</b> Prefeitura Municipal</p>
              <p><b>Registro:</b> 10/01/2025</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
