import { useState } from 'react';
import { useAuth } from './useAuth';
import { useWallet } from './useWallet';
import { useTransactionsContext } from './useTransactionsContext';

interface UseTransferReturn {
    transfer: (amount: number, recipientEmail: string) => Promise<{ success: boolean; error?: string }>;
    isLoading: boolean;
    error: string | null;
}

const useTransfer = (): UseTransferReturn => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { accessToken } = useAuth();
    const { refreshBalance } = useWallet();
    const { refreshTransactions } = useTransactionsContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const transfer = async (amount: number, recipientEmail: string): Promise<{ success: boolean; error?: string }> => {
        if (!accessToken) {
            throw new Error('No hay sesión activa');
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    amount,
                    recipientEmail
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                let errorMessage = 'Error al realizar la transferencia';
                
                if (data.message === 'Insufficient balance') {
                    errorMessage = 'Saldo insuficiente para realizar la transferencia';
                } else if (data.message === 'Recipient not found') {
                    errorMessage = 'El destinatario no está registrado';
                }

                return { success: false, error: errorMessage };
            }

            setError(null);

            await Promise.all([
                refreshBalance(),
                refreshTransactions()
            ]);
            return { success: true };
        } catch (error) {
            const errorMessage = 'Error al realizar la transferencia - ' + (error instanceof Error ? error.message : 'Error desconocido');
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return { transfer, isLoading, error };
};

export default useTransfer; 