
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import { MOCK_USERS } from '@/lib/constants';

interface AuthContextType {
  user: User | null;
  login: (walletAddress: string) => void;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
  updateUser: (data: Partial<User>) => void;
  needsLogin: boolean;
  setNeedsLogin: (needsLogin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const router = useRouter();

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

  const login = useCallback((walletAddress: string) => {
    const mockUserData = MOCK_USERS[walletAddress];

    if (!mockUserData) {
      console.error('Login failed: User not found in mock data.');
      setNeedsLogin(false);
      return;
    }
    
    const isAdmin = walletAddress === '0xbd9A66ff3694e47726C1C8DD572A38168217BaA1';
    
    const userData: User = {
      walletAddress,
      name: mockUserData.name,
      balance: mockUserData.balance,
      lastLoginAt: new Date().toISOString(),
      isAdmin,
    };
    
    setUser(userData);
    localStorage.setItem('crypto-sim-user', JSON.stringify(userData));
    setNeedsLogin(false);
    
    const targetPath = isAdmin ? '/admin/dashboard' : `/user/${walletAddress}/overview`;
    router.push(targetPath);

  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('crypto-sim-user');
    setNeedsLogin(false);
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
    <AuthContext.Provider value={{ user, login, logout, updateBalance, updateUser, needsLogin, setNeedsLogin }}>
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
