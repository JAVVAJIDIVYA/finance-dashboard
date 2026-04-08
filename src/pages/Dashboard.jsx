import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import SummaryCard from '../components/SummaryCard';
import Charts from '../components/Charts';
import TransactionTable from '../components/TransactionTable';
import Insights from '../components/Insights';
import AnalyticsView from '../components/AnalyticsView';
import PaymentsView from '../components/PaymentsView';
import SettingsView from '../components/SettingsView';

export default function Dashboard() {
  const { transactions, currentView, isLoading } = useAppContext();

  const summary = useMemo(() => {
    if (isLoading) return { totalIncome: 0, totalExpenses: 0, balance: 0 };
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses
    };
  }, [transactions, isLoading]);

  // Route to the correct view
  if (currentView === 'Analytics') return <AnalyticsView />;
  if (currentView === 'Payments') return <PaymentsView />;
  if (currentView === 'Settings') return <SettingsView />;
  if (currentView !== 'Dashboard') {
    return (
      <div className="card p-20 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-blue-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
          <LayoutGrid size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{currentView} Section</h2>
        <p className="text-slate-500 max-w-xs">We're currently building the {currentView.toLowerCase()} module. Check back soon for new features!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
          <LayoutGrid size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Main Dashboard</h1>
          <p className="text-xs text-slate-500 font-medium">Overview of your financial performance</p>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Balance" 
          amount={summary.balance} 
          icon={Wallet} 
          color="bg-blue-600"
          trend="up"
          isLoading={isLoading}
        />
        <SummaryCard 
          title="Total Income" 
          amount={summary.totalIncome} 
          icon={TrendingUp} 
          color="bg-emerald-600"
          trend="up"
          isLoading={isLoading}
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={summary.totalExpenses} 
          icon={TrendingDown} 
          color="bg-rose-600"
          trend="down"
          isLoading={isLoading}
        />
      </div>

      {/* Charts Grid */}
      <Charts />

      {/* Transactions & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionTable />
        </div>
        <div className="lg:col-span-1">
          <Insights />
        </div>
      </div>
    </div>
  );
}
