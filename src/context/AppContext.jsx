import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState(localStorage.getItem('finance_role') || 'viewer');
  const [theme, setTheme] = useState(localStorage.getItem('finance_theme') || 'light');
  const [currentView, setCurrentView] = useState('Dashboard');

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'amount'
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Simulated Mock API Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('finance_transactions');
      if (saved) {
        setTransactions(JSON.parse(saved));
      } else {
        setTransactions(mockTransactions);
      }
      setIsLoading(false);
    }, 1500); // 1.5s simulated network delay

    return () => clearTimeout(timer);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  useEffect(() => {
    localStorage.setItem('finance_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const addTransaction = (txn) => {
    const newTxn = {
      ...txn,
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(txn.amount),
    };
    setTransactions(prev => [newTxn, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const contextValue = {
    isLoading,
    transactions,
    role,
    setRole,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    groupByCategory,
    setGroupByCategory,
    addTransaction,
    deleteTransaction,
    currentView,
    setCurrentView
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
