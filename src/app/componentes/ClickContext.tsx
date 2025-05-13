'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ClicsContextType {
  totalClicks: number;
  incrementarClicks: () => void;
}

const ClicsContext = createContext<ClicsContextType | undefined>(undefined);

export const ClicsProvider = ({ children }: { children: ReactNode }) => {
  const [totalClicks, setTotalClicks] = useState(0);

  const incrementarClicks = () => {
    setTotalClicks(prev => prev + 1);
  };

  return (
    <ClicsContext.Provider value={{ totalClicks, incrementarClicks }}>
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
