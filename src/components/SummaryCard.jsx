import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCard({ title, amount, icon: Icon, color, trend }) {
  const isIncome = title.toLowerCase().includes('income');
  const isExpense = title.toLowerCase().includes('expense');
  
  return (
    <div className="card p-6 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
        
        {trend && (
          <div className={`flex items-center text-xs font-bold ${
            trend === 'up' 
              ? (isExpense ? 'text-rose-500' : 'text-emerald-500') 
              : (isExpense ? 'text-emerald-500' : 'text-rose-500')
          }`}>
            <span className="flex items-center gap-0.5 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
              {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trend === 'up' ? '4.5%' : '2.1%'}
            </span>
            <span className="text-slate-400 dark:text-slate-500 ml-2 font-medium">from last month</span>
          </div>
        )}
      </div>

      <div className={`p-4 rounded-2xl bg-opacity-10 ${color.replace('bg-', 'bg-opacity-10 bg-')} text-${color.replace('bg-', '')}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
