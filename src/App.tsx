import React, { useState, useEffect } from 'react';
import { Wallet, BarChart2, TrendingUp } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Reports } from './components/Reports';
import { Investments } from './components/Investments';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';
import type { Transaction, Investment } from './types';

export default function App() {
  const [session, setSession] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'reports' | 'investments'>('dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleAddInvestment = (newInvestment: Omit<Investment, 'id'>) => {
    const investment: Investment = {
      ...newInvestment,
      id: crypto.randomUUID(),
    };
    setInvestments([investment, ...investments]);
  };

  if (!session && !showAuth) {
    return <LandingPage onLogin={() => setShowAuth(true)} />;
  }

  if (!session && showAuth) {
    return <Auth onAuth={() => setSession(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Personal Finance Assistance
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('investments')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  activeView === 'investments'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Investments
              </button>
              <button
                onClick={() => setActiveView('reports')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  activeView === 'reports'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Reports
              </button>
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  setSession(false);
                  setShowAuth(false);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' ? (
          <>
            <Dashboard transactions={transactions} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <TransactionList transactions={transactions} />
            </div>
          </>
        ) : activeView === 'investments' ? (
          <Investments
            investments={investments}
            onAddInvestment={handleAddInvestment}
          />
        ) : (
          <Reports transactions={transactions} investments={investments} />
        )}
      </main>
    </div>
  );
}