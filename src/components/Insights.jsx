import React, { useMemo } from 'react';
import { Award, Calendar, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Insights() {
  const { transactions } = useAppContext();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const incomes = transactions.filter(t => t.type === 'income');

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    
    let highestCategory = { name: 'N/A', amount: 0 };
    Object.entries(categoryTotals).forEach(([name, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name, amount };
      }
    });

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyExpenses = expenses
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      highestCategory,
      monthlyExpenses,
      totalIncome,
      totalExpenses
    };
  }, [transactions]);

  const total = insights.totalIncome + insights.totalExpenses;
  const incomePercent = total > 0 ? (insights.totalIncome / total) * 100 : 0;
  const expensePercent = total > 0 ? (insights.totalExpenses / total) * 100 : 0;

  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Insights</h3>
          <p className="text-xs text-slate-500 font-medium">AI-powered financial analysis</p>
        </div>
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
          <Target size={20} />
        </div>
      </div>
      
      <div className="space-y-8 flex-1">
        {/* Highest Spending Category */}
        <div className="group cursor-default">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Award size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Spending</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">{insights.highestCategory.name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-black text-slate-900 dark:text-white">${insights.highestCategory.amount.toLocaleString()}</p>
              <p className="text-[10px] text-emerald-500 font-bold">Limit: $2,000</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Expenses this Month */}
        <div className="group cursor-default">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Spend</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">Current Period</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-black text-slate-900 dark:text-white">${insights.monthlyExpenses.toLocaleString()}</p>
              <p className="text-[10px] text-rose-500 font-bold">+12% vs last month</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Income vs Expense Summary */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Balance Ratio</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-slate-500 font-bold">INCOME</span>
                <span className="text-emerald-600 font-black">{incomePercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${incomePercent}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-slate-500 font-bold">EXPENSES</span>
                <span className="text-rose-600 font-black">{expensePercent.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500 transition-all duration-1000" 
                  style={{ width: `${expensePercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
