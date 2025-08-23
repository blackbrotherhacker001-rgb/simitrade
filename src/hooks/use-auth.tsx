
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User } from '@/types';

// Mock user data for simulation
const MOCK_USERS: Record<string, Omit<User, 'walletAddress' | 'isAdmin'>> = {
    '0x1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa': { name: 'Satoshi Nakamoto', balance: 980000, lastLoginAt: '2025-08-23T14:07:03Z' },
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': { name: 'Vitalik Buterin', balance: 450000, lastLoginAt: '2025-08-23T13:07:03Z' },
    '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2': { name: 'Charles Hoskinson', balance: 250000, lastLoginAt: '2025-08-22T18:30:00Z' },
    '0x742d35Cc6634C0532925a3b844Bc454e4438f44e': { name: 'Gavin Wood', balance: 150000, lastLoginAt: '2025-08-21T11:45:00Z' },
    '0x503828976D22510aad0201ac7EC88293211D23Da': { name: 'Barry Silbert', balance: 75000, lastLoginAt: '2025-08-20T09:00:00Z' },
    '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1': { name: 'Admin User', balance: 1000000, lastLoginAt: new Date().toISOString() }, // Admin
    '0x1234567890AbCdEf1234567890aBcDeF12345678': { name: 'Default User', balance: 10000, lastLoginAt: new Date().toISOString() }, // Default user for login form
};


interface AuthContextType {
  user: User | null;
  login: (walletAddress: string, isAdmin: boolean) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('crypto-sim-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('crypto-sim-user');
    }
  }, []);

  const login = useCallback((walletAddress: string, isAdmin: boolean) => {
    const mockData = MOCK_USERS[walletAddress] || { name: 'New User', balance: 10000 };
    const newUser: User = {
      walletAddress,
      isAdmin,
      ...mockData,
      lastLoginAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('crypto-sim-user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('crypto-sim-user');
    window.location.href = '/';
  }, []);

  const updateBalance = useCallback((newBalance: number) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, balance: newBalance };
      localStorage.setItem('crypto-sim-user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);
  
  const updateUser = useCallback((data: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('crypto-sim-user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateBalance, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
