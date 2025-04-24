import { useState, useEffect } from 'react';
import { TransactionProps } from '../components/transaction/Transaction';

const useTransactions = () => {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockTransactions: TransactionProps[] = [
                    {
                        type: 'received',
                        description: 'Transferencia recibida de Juan',
                        date: '2023-04-19',
                        amount: 5000,
                    },
                    {
                        type: 'sent',
                        description: 'Transferencia enviada a María',
                        date: '2023-04-18',
                        amount: -1500,
                    },
                    {
                        type: 'deposit',
                        description: 'Carga con tarjeta',
                        date: '2023-04-17',
                        amount: 10000,
                    },
                    {
                        type: 'withdrawal',
                        description: 'Retiro a cuenta bancaria',
                        date: '2023-04-16',
                        amount: -2000,
                    },
                    {
                        type: 'received',
                        description: 'Transferencia recibida de Carlos',
                        date: '2023-04-15',
                        amount: 3500,
                    },
                    {
                        type: 'sent',
                        description: 'Pago de servicios',
                        date: '2023-04-14',
                        amount: -2800,
                    }
                ];

                setTransactions(mockTransactions);
                setError(null);
            } catch (err) {
                setError('Error al cargar las transacciones');
                console.error('Error fetching transactions:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return { transactions, isLoading, error };
};

export default useTransactions;