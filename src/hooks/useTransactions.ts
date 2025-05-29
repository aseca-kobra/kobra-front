import { useState, useEffect, useCallback } from 'react';
import { TransactionProps } from '../components/transaction/Transaction';
import { useAuth } from './useAuth';
import {BackendTransaction, TransactionService} from "../services/transactionService.ts";

const useTransactions = () => {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, user } = useAuth();
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchTransactions = useCallback(async () => {
        if (!accessToken || !user) {
            setTransactions([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
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
    }, [accessToken, user, apiUrl]);

    useEffect(() => {
        void fetchTransactions();
    }, [fetchTransactions]);

    return { transactions, isLoading, error, refreshTransactions: fetchTransactions };
};

export default useTransactions;