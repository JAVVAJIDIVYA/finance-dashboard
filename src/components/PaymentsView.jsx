import React from 'react';
import { CreditCard, Plus, ShieldCheck, Zap, MoreHorizontal, ArrowRight } from 'lucide-react';

export default function PaymentsView() {
  const cards = [
    { id: 1, type: 'Visa', last4: '4242', balance: '12,450.00', color: 'from-blue-600 to-indigo-700' },
    { id: 2, type: 'Mastercard', last4: '8812', balance: '3,120.50', color: 'from-slate-800 to-slate-900' },
  ];

  const subscriptions = [
    { name: 'Adobe Creative Cloud', amount: '52.99', date: 'Apr 12', icon: 'A' },
    { name: 'Spotify Premium', amount: '9.99', date: 'Apr 15', icon: 'S' },
    { name: 'AWS Cloud Services', amount: '124.00', date: 'Apr 20', icon: 'W' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
            <Zap size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Payments & Cards</h1>
            <p className="text-xs text-slate-500 font-medium">Manage your payment methods and recurring bills</p>
          </div>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span>Add Method</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Virtual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map(card => (
              <div key={card.id} className={`p-6 rounded-[2rem] bg-gradient-to-br ${card.color} text-white shadow-xl shadow-blue-500/10 relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <CreditCard size={120} />
                </div>
                <div className="flex justify-between items-start mb-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Balance</span>
                    <span className="text-2xl font-black">${card.balance}</span>
                  </div>
                  <div className="w-12 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center font-black italic">
                    {card.type === 'Visa' ? 'VISA' : 'MC'}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-sm font-medium tracking-[0.2em]">**** **** **** {card.last4}</p>
                    <p className="text-[10px] font-bold uppercase opacity-60">Alex Jhonson</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/10 backdrop-blur-sm"></div>
                    <div className="w-8 h-8 rounded-full bg-white/40 border-2 border-white/10 backdrop-blur-sm"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Pay */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recurring Payments</h3>
            <div className="space-y-4">
              {subscriptions.map(sub => (
                <div key={sub.name} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-black text-lg">
                      {sub.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{sub.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Next payment: {sub.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-white">${sub.amount}</p>
                    <button className="text-[10px] text-blue-600 font-bold hover:underline">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="space-y-6">
          <div className="card p-6 border-l-4 border-l-blue-600">
            <ShieldCheck className="text-blue-600 mb-4" size={24} />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Secure Transactions</h4>
            <p className="text-xs text-slate-500">Your payments are protected by end-to-end 256-bit encryption.</p>
          </div>

          <div className="card p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Recent Activity</h4>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 h-10 bg-slate-100 dark:bg-slate-800 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Amazon.com</p>
                    <p className="text-[10px] text-slate-500 font-medium">Electronics • 2 hours ago</p>
                    <p className="text-sm font-black text-rose-600 mt-1">-$89.99</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
              View All History <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
