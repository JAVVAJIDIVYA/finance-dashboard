import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';

function AppContent() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <TopNav />
        
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
