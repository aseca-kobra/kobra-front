import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { TransactionProps, TransactionService, BackendTransaction } from '../services/transactionService';

interface TransactionsContextType {
    transactions: TransactionProps[];
    isLoading: boolean;
    error: string | null;
    refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, isAuthenticated } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchTransactions = useCallback(async () => {
        if (!accessToken || !isAuthenticated) {
            setTransactions([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al cargar las transacciones');
            }

            const backendTransactions: BackendTransaction[] = await response.json();
            const mappedTransactions = TransactionService.mapTransactions(backendTransactions);
            
            setTransactions(mappedTransactions);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar las transacciones');
            console.error('Error fetching transactions:', err);
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, isAuthenticated, apiUrl]);

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            void fetchTransactions();
        } else {
            setTransactions([]);
        }
    }, [isAuthenticated, accessToken, fetchTransactions]);

    const value = {
        transactions,
        isLoading,
        error,
        refreshTransactions: fetchTransactions,
    };

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    );
};

export const useTransactionsContext = () => {
    const context = useContext(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactionsContext must be used within a TransactionsProvider');
    }
    return context;
}; 