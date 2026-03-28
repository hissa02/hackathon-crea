// src/components/Topbar.jsx
export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0">
      <div className="flex items-center text-slate-500 bg-slate-100 px-3 py-2 rounded-lg w-96 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all">
        <i className="ph ph-magnifying-glass mr-2 text-lg"></i>
        <input
          type="text"
          placeholder="Buscar Profissional, Empresa ou Registro no SITAC..."
          className="bg-transparent border-none outline-none w-full text-sm"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          SITAC Online
        </div>
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <i className="ph ph-bell text-xl"></i>
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border border-blue-200 cursor-pointer">
          <i className="ph ph-user"></i>
        </div>
      </div>
    </header>
  )
}
