import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

interface WalletContextType {
  walletBalance: number;
  updateWalletBalance: (amount: number) => Promise<void>;
  deductFromWallet: (amount: number) => Promise<boolean>;
  addToWallet: (amount: number) => Promise<void>;
  refreshWalletBalance: () => Promise<void>;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState<number>(0.00);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Load wallet balance when user changes
  useEffect(() => {
    if (user?.id) {
      loadWalletBalance();
    } else {
      setWalletBalance(0.00);
    }
  }, [user?.id]);

  const loadWalletBalance = async () => {
    try {
      setIsLoading(true);
      const storedBalance = await AsyncStorage.getItem(`wallet_balance_${user?.id}`);
      if (storedBalance) {
        setWalletBalance(parseFloat(storedBalance));
      } else {
        setWalletBalance(0.00);
      }
    } catch (error) {
      console.error('Error loading wallet balance:', error);
      setWalletBalance(0.00);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWalletBalance = async (amount: number) => {
    try {
      setWalletBalance(amount);
      if (user?.id) {
        await AsyncStorage.setItem(`wallet_balance_${user?.id}`, amount.toString());
      }
    } catch (error) {
      console.error('Error updating wallet balance:', error);
    }
  };

  const deductFromWallet = async (amount: number): Promise<boolean> => {
    try {
      if (walletBalance >= amount) {
        const newBalance = walletBalance - amount;
        await updateWalletBalance(newBalance);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deducting from wallet:', error);
      return false;
    }
  };

  const addToWallet = async (amount: number) => {
    try {
      const newBalance = walletBalance + amount;
      await updateWalletBalance(newBalance);
    } catch (error) {
      console.error('Error adding to wallet:', error);
    }
  };

  const refreshWalletBalance = async () => {
    await loadWalletBalance();
  };

  const value: WalletContextType = {
    walletBalance,
    updateWalletBalance,
    deductFromWallet,
    addToWallet,
    refreshWalletBalance,
    isLoading,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
