'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ClicsContextType {
  totalClics: number;
  incrementar: () => void;
}

const ClicsContext = createContext<ClicsContextType | undefined>(undefined);

export const ClicsProvider = ({ children }: { children: ReactNode }) => {
  const [totalClics, setTotalClics] = useState(0);

  const incrementar = () => setTotalClics(prev => prev + 1);

  return (
    <ClicsContext.Provider value={{ totalClics, incrementar }}>
      {children}
    </ClicsContext.Provider>
  );
};

export const useClics = () => {
  const context = useContext(ClicsContext);
  if (!context) {
    throw new Error('useClics debe ser usado dentro de un ClicsProvider');
  }
  return context;
};
