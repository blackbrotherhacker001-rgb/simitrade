
export interface User {
  walletAddress: string;
  balance: number;
  isAdmin: boolean;
  name: string;
  lastLoginAt?: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdrawal' | 'rise' | 'fall';
  symbol: string;
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

export interface MarketData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface SpotMarket {
    symbol: string;
    pair: string;
    price: number;
    change: number;
    volume: number;
    icon: string;
}

export interface OrderBookEntry {
    price: number;
    amount: number;
    total: number;
}
