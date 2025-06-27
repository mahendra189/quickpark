import { auth } from '@/auth/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of your global state here
interface GlobalState {
  // Example values
  user?: any;
  theme?: string;
  setUser: (user: any) => void;
  setTheme: (theme: string) => void;
}

export const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return () => unsubscribe();
  },[]);
  return (
    <GlobalContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}; 