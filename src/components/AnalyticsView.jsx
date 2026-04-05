import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, ComposedChart, Area
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import { TrendingUp, Activity, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AnalyticsView() {
  const { transactions, theme } = useAppContext();
  const isDark = theme === 'dark';

  const monthlyData = useMemo(() => {
    const data = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
      if (!data[month]) data[month] = { name: month, income: 0, expense: 0 };
      if (t.type === 'income') data[month].income += t.amount;
      else data[month].expense += t.amount;
    });
    return Object.values(data).reverse().slice(-6);
  }, [transactions]);

  const categoryComparison = useMemo(() => {
    const categories = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
          <Activity size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Financial Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">Deep dive into your spending and earning patterns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income vs Expenses Bar Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cash Flow</h3>
              <p className="text-xs text-slate-500 font-medium">Monthly comparison of income and expenses</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  cursor={{fill: isDark ? '#1e293b' : '#f8fafc'}}
                  contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Chart */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Savings Efficiency</h3>
              <p className="text-xs text-slate-500 font-medium">How much you save relative to income</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#f1f5f9'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="income" fill={isDark ? '#1e3a8a' : '#eff6ff'} stroke="#3b82f6" strokeWidth={2} name="Total Capacity" />
                <Line type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} name="Spending Line" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 bg-emerald-50/50 dark:bg-emerald-500/5 border-emerald-100 dark:border-emerald-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <ArrowUpRight size={18} />
            </div>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Top Income</span>
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">$5,200.00</h4>
          <p className="text-xs text-slate-500 mt-1">Salary - Apr 2024</p>
        </div>

        <div className="card p-6 bg-rose-50/50 dark:bg-rose-500/5 border-rose-100 dark:border-rose-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500 rounded-lg text-white">
              <ArrowDownRight size={18} />
            </div>
            <span className="text-sm font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">Top Expense</span>
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">$1,200.00</h4>
          <p className="text-xs text-slate-500 mt-1">Rent - Mar 2024</p>
        </div>

        <div className="card p-6 bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <TrendingUp size={18} />
            </div>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Avg. Saving</span>
          </div>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">32.5%</h4>
          <p className="text-xs text-slate-500 mt-1">Efficiency Rate</p>
        </div>
      </div>
    </div>
  );
}
