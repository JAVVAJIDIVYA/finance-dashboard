import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Shield, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function RoleToggle() {
  const { role, setRole } = useAppContext();

  return (
    <div className="flex items-center p-1 rounded-full bg-darkBg border border-white/5">
      <button
        onClick={() => setRole('viewer')}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          role === 'viewer' 
            ? "bg-accent-yellow text-black font-bold shadow-md" 
            : "text-gray-500 hover:text-white"
        )}
      >
        <Shield size={14} />
        <span>Viewer</span>
      </button>
      <button
        onClick={() => setRole('admin')}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
          role === 'admin' 
            ? "bg-accent-cyan text-black font-bold shadow-md" 
            : "text-gray-500 hover:text-white"
        )}
      >
        <ShieldAlert size={14} />
        <span>Admin</span>
      </button>
    </div>
  );
}
