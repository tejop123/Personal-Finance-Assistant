import React, { useState } from 'react';
import { TrendingUp, Plus, DollarSign } from 'lucide-react';
import type { Investment } from '../types';

interface InvestmentsProps {
  investments: Investment[];
  onAddInvestment: (investment: Omit<Investment, 'id'>) => void;
}

export function Investments({ investments, onAddInvestment }: InvestmentsProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    platform: '',
    type: 'stock' as Investment['type'],
    symbol: '',
    shares: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const totalInvestmentValue = investments.reduce(
    (total, inv) => total + inv.shares * inv.price,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInvestment({
      ...formData,
      shares: Number(formData.shares),
      price: Number(formData.price),
    });
    setFormData({
      platform: '',
      type: 'stock',
      symbol: '',
      shares: '',
      price: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Investment Portfolio</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Portfolio Overview</h3>
          <div className="flex items-center text-green-600">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="text-xl font-bold">${totalInvestmentValue.toFixed(2)}</span>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Investment['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="stock">Stock</option>
                  <option value="crypto">Cryptocurrency</option>
                  <option value="mutual_fund">Mutual Fund</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Symbol/Name</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Shares/Units</label>
                <input
                  type="number"
                  value={formData.shares}
                  onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="0"
                  step="0.000001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Share/Unit</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Investment
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold">{investment.symbol}</h4>
                  <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100">
                    {investment.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{investment.platform}</p>
                <p className="text-xs text-gray-400">{investment.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(investment.shares * investment.price).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  {investment.shares} × ${investment.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}