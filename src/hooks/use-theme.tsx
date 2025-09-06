
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
    landingHeadline: string;
    landingSubheadline: string;
    landingMarketCardImage: string | null;
}

interface ThemeContextType {
  theme: ThemeData;
  setTheme: (newTheme: Partial<ThemeData>) => void;
}

const defaultTheme: ThemeData = {
    name: 'Bicrypto',
    logo: null,
    landingHeadline: 'Trade Crypto <br /> <span class="text-primary">like a pro</span>',
    landingSubheadline: 'Advanced trading tools, lightning-fast execution, and unmatched security. Join millions of traders worldwide.',
    landingMarketCardImage: null,
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeData>(defaultTheme);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('crypto-sim-theme');
      if (storedTheme) {
        // Merge stored theme with defaults to prevent breakages if new fields are added
        setThemeState(prevTheme => ({...prevTheme, ...JSON.parse(storedTheme)}));
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
