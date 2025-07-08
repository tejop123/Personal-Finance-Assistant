import React from 'react';
import { LineChart, BarChart, Wallet, PieChart, TrendingUp } from 'lucide-react';

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Personal Finance Manager
              </h1>
            </div>
            <button
              onClick={onLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Take Control of Your Financial Future
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Track expenses, monitor investments, and make informed financial decisions with our comprehensive finance management tools.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <FeatureCard
                icon={<LineChart className="w-8 h-8 text-blue-600" />}
                title="Expense Tracking"
                description="Monitor your spending patterns and categorize expenses for better financial awareness."
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
                title="Investment Tracking"
                description="Track your investments and monitor their performance over time."
              />
              <FeatureCard
                icon={<PieChart className="w-8 h-8 text-blue-600" />}
                title="Report Generation"
                description="Generate detailed reports with charts and graphs for comprehensive financial analysis."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}