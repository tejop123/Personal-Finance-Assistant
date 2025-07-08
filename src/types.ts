export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Investment {
  id: string;
  platform: string;
  type: 'stock' | 'crypto' | 'mutual_fund' | 'real_estate' | 'other';
  symbol: string;
  shares: number;
  price: number;
  date: string;
  notes: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}