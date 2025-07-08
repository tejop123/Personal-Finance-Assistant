import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center">
              {transaction.type === 'income' ? (
                <ArrowUpCircle className="w-6 h-6 text-green-500 mr-3" />
              ) : (
                <ArrowDownCircle className="w-6 h-6 text-red-500 mr-3" />
              )}
              <div>
                <p className="font-medium">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}