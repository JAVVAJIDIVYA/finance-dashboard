import React from 'react';
import { LayoutDashboard, PieChart, Wallet, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Sidebar() {
  const { currentView, setCurrentView } = useAppContext();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: PieChart, label: 'Analytics' },
    { icon: Wallet, label: 'Payments' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-400 h-screen fixed left-0 top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Wallet size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">FinTrack</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => setCurrentView(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
              currentView === item.label 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon size={20} className={currentView === item.label ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => setCurrentView('Help')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
            currentView === 'Help' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <HelpCircle size={20} className={currentView === 'Help' ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
          <span>Help Center</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
