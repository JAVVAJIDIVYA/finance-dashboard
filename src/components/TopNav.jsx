import React from 'react';
import { User, Bell, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TopNav() {
  const { role, setRole, currentView } = useAppContext();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="hidden md:block">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{currentView} Overview</h2>
            <p className="text-xs text-slate-500">Welcome back, here's your {currentView.toLowerCase()} summary.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Role Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mr-2">
            <button 
              onClick={() => setRole('viewer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'viewer' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Viewer
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                role === 'admin' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Admin
            </button>
          </div>

          <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-800 pr-2 md:pr-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-bold text-slate-900 dark:text-white capitalize leading-none">{role}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Active Session</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <User size={18} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
