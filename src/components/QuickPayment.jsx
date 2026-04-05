import React from 'react';
import { Edit } from 'lucide-react';

export default function QuickPayment() {
  return (
    <div className="bg-cardBg rounded-3xl p-6 border border-white/5 relative overflow-hidden h-full">
       <div 
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-40 pointer-events-none translate-x-1/4 -translate-y-1/4"
        style={{ background: `radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, transparent 70%)` }}
      ></div>

      <div className="flex justify-between items-center relative z-10">
        <h3 className="font-bold text-gray-100">Quick Payment</h3>
        <button className="text-gray-400 hover:text-white">
          <Edit size={16} />
        </button>
      </div>

      <div className="mt-4 relative z-10">
        <p className="text-xs text-gray-400 mb-3">Beneficiary list</p>
        <div className="flex items-center gap-2">
          {/* Mock Avatars */}
          <img src="https://ui-avatars.com/api/?name=MD&background=10b981&color=fff&size=36" className="rounded-full w-9 h-9 border-2 border-cardBg" alt="avatar" />
          <img src="https://ui-avatars.com/api/?name=KL&background=f59e0b&color=fff&size=36" className="rounded-full w-9 h-9 border-2 border-cardBg -ml-3" alt="avatar" />
          <img src="https://ui-avatars.com/api/?name=JP&background=3b82f6&color=fff&size=36" className="rounded-full w-9 h-9 border-2 border-cardBg -ml-3" alt="avatar" />
          <img src="https://ui-avatars.com/api/?name=RB&background=f97316&color=fff&size=36" className="rounded-full w-9 h-9 border-2 border-cardBg -ml-3" alt="avatar" />
          <img src="https://ui-avatars.com/api/?name=AS&background=6366f1&color=fff&size=36" className="rounded-full w-9 h-9 border-2 border-cardBg -ml-3" alt="avatar" />
          <button className="w-9 h-9 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-gray-400 -ml-3 z-10 text-xs hover:text-white transition-colors">
            +
          </button>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <p className="text-xs text-gray-400 mb-2">Card number</p>
        <div className="bg-darkBg rounded-xl px-4 py-3 flex justify-between items-center border border-white/5">
          <span className="text-sm font-medium tracking-widest text-gray-300">0821 5248 5478 6325</span>
          <span className="text-xs font-bold text-gray-100">VISA</span>
        </div>
      </div>

      <div className="w-full flex gap-3 mt-6 relative z-10">
        <button className="flex-1 bg-transparent border border-white/10 rounded-xl py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          Save as draft
        </button>
        <button className="flex-1 bg-accent-yellow rounded-xl py-3 text-sm font-bold text-gray-900 shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-colors">
          Send Money
        </button>
      </div>
    </div>
  );
}
