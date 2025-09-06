
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface ThemeData {
    name: string;
    logo: string | null;
}

interface ThemeContextType {
  theme: ThemeData;
  setTheme: (newTheme: Partial<ThemeData>) => void;
}

const defaultTheme: ThemeData = {
    name: 'Bicrypto',
    logo: null,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeData>(defaultTheme);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('crypto-sim-theme');
      if (storedTheme) {
        setThemeState(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.error('Failed to parse theme from localStorage', error);
      localStorage.removeItem('crypto-sim-theme');
    }
  }, []);

  const setTheme = useCallback((newTheme: Partial<ThemeData>) => {
    setThemeState(currentTheme => {
      const updatedTheme = { ...currentTheme, ...newTheme };
      localStorage.setItem('crypto-sim-theme', JSON.stringify(updatedTheme));
      return updatedTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
