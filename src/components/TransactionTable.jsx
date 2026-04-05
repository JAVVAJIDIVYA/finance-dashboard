import React, { useState, useMemo } from 'react';
import { Search, Trash2, Plus, ArrowUpDown, MoreVertical, Download, Layers } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function TransactionTable() {
  const { 
    transactions, 
    role, 
    deleteTransaction, 
    addTransaction,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    groupByCategory,
    setGroupByCategory,
    isLoading
  } = useAppContext();

  const [isAdding, setIsAdding] = useState(false);
  const [newTxn, setNewTxn] = useState({ date: '', amount: '', category: '', type: 'expense' });

  const processedTransactions = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortBy === 'date') result.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === 'amount') result.sort((a, b) => b.amount - a.amount);

    if (groupByCategory) {
      const grouped = result.reduce((acc, t) => {
        if (!acc[t.category]) acc[t.category] = [];
        acc[t.category].push(t);
        return acc;
      }, {});
      return Object.entries(grouped).map(([category, items]) => ({
        isHeader: true,
        category,
        items
      })).flatMap(group => [group, ...group.items]);
    }

    return result;
  }, [transactions, searchQuery, filterType, sortBy, groupByCategory]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTxn.date || !newTxn.amount || !newTxn.category) return;
    addTransaction(newTxn);
    setNewTxn({ date: '', amount: '', category: '', type: 'expense' });
    setIsAdding(false);
  };

  const exportData = (format) => {
    const data = transactions.filter(t => {
      const matchesSearch = t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } else if (format === 'csv') {
      const headers = ['Date', 'Category', 'Type', 'Amount'];
      const csvContent = [
        headers.join(','),
        ...data.map(t => `${t.date},${t.category},${t.type},${t.amount}`)
      ].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
  };

  return (
    <div className="card overflow-hidden relative min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Fetching data...</p>
          </div>
        </div>
      )}

      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transactions</h3>
            <p className="text-xs text-slate-500 font-medium">Monitoring your latest activities</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search category..." 
                className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full md:w-48 text-slate-900 dark:text-white transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-slate-900 dark:text-white transition-all shadow-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <button 
              onClick={() => setGroupByCategory(!groupByCategory)}
              className={`p-2 rounded-xl border transition-all ${groupByCategory ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500'}`}
              title="Group by Category"
            >
              <Layers size={18} />
            </button>

            <div className="relative group">
              <button className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-500 transition-all shadow-sm">
                <Download size={18} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-10 hidden group-hover:block overflow-hidden animate-in fade-in slide-in-from-top-2">
                <button onClick={() => exportData('csv')} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">CSV Export</button>
                <button onClick={() => exportData('json')} className="w-full px-4 py-2 text-left text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">JSON Export</button>
              </div>
            </div>

            {role === 'admin' && (
              <button 
                onClick={() => setIsAdding(!isAdding)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Transaction</span>
              </button>
            )}
          </div>
        </div>

        {isAdding && role === 'admin' && (
          <form onSubmit={handleAdd} className="mt-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30 grid grid-cols-1 md:grid-cols-5 gap-4 shadow-xl shadow-blue-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Date</label>
              <input 
                type="date" 
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                value={newTxn.date}
                onChange={(e) => setNewTxn({...newTxn, date: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Amount</label>
              <input 
                type="number" 
                placeholder="0.00" 
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                value={newTxn.amount}
                onChange={(e) => setNewTxn({...newTxn, amount: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Category</label>
              <input 
                type="text" 
                placeholder="e.g. Shopping" 
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                value={newTxn.category}
                onChange={(e) => setNewTxn({...newTxn, category: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Type</label>
              <select 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20"
                value={newTxn.type}
                onChange={(e) => setNewTxn({...newTxn, type: e.target.value})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full btn-primary h-10">
                Add Now
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <button onClick={() => setSortBy('date')} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  Date <ArrowUpDown size={12} />
                </button>
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                <button onClick={() => setSortBy('amount')} className="flex items-center gap-1 ml-auto hover:text-blue-500 transition-colors">
                  Amount <ArrowUpDown size={12} />
                </button>
              </th>
              {role === 'admin' && <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {processedTransactions.length > 0 ? (
              processedTransactions.map((t, idx) => {
                if (t.isHeader) {
                  return (
                    <tr key={`header-${t.category}-${idx}`} className="bg-slate-50/30 dark:bg-slate-800/20">
                      <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-2 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                        Group: {t.category}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group animate-in fade-in duration-300">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">ID: {t.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          t.type === 'income' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
                        }`}>
                          {t.category.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={t.type === 'income' ? 'badge-income' : 'badge-expense'}>
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-black text-right ${
                      t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => deleteTransaction(t.id)}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Delete Transaction"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              !isLoading && (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
                        <Search size={32} />
                      </div>
                      <p className="text-slate-900 dark:text-white font-bold">No results found</p>
                      <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms</p>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
