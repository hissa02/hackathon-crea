// src/components/Sidebar.jsx
export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'process', icon: 'ph ph-files',                    label: 'Análise de Acervo' },
    { id: 'history', icon: 'ph ph-clock-counter-clockwise',  label: 'Histórico CAT' },
    { id: 'reports', icon: 'ph ph-users',                    label: 'Buscar Profissionais' },
  ]

  return (
    <aside className="w-64 bg-[#0B3F7A] text-slate-200 flex flex-col shrink-0 shadow-lg z-10">
      <div className="h-16 flex items-center px-6 border-b border-[#082d5a] bg-[#08305e]">
        <img
          src="image_0457ff.png"
          alt="Símbolo Engenharia"
          className="h-10 w-10 object-contain mr-3 rounded-md shadow-sm"
        />
        <span className="text-white font-bold text-lg tracking-wide">
          CREA<span className="text-[#F2A900]">.IA</span>
        </span>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        <ul className="space-y-1">
          {navItems.map(({ id, icon, label }) => (
            <li key={id}>
              <button
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center px-6 py-3 transition-colors ${
                  activeTab === id
                    ? 'bg-white/10 text-white border-r-4 border-[#F2A900]'
                    : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <i className={`${icon} text-xl mr-3`}></i>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#082d5a] text-xs text-blue-200/50 text-center">
        Módulo SITAC Integrado
        <br />
        Hackathon CREA-MA 2026
      </div>
    </aside>
  )
}
