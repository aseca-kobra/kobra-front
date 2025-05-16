import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './useAuth';

interface WalletContextType {
    balance: number;
    isLoading: boolean;
    error: string | null;
    deposit: (amount: number) => Promise<void>;
    withdraw: (amount: number) => Promise<void>;
    refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, isAuthenticated } = useAuth();

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchBalance = async () => {
        if (!accessToken || !isAuthenticated) {
            setBalance(0);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/wallet/balance`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al obtener el balance');
            }

            const data = await response.json();
            setBalance(data.balance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al obtener el balance');
            setBalance(0);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && accessToken) {
            fetchBalance();
        } else {
            setBalance(0);
        }
    }, [isAuthenticated, accessToken]);

    const deposit = async (amount: number) => {
        if (!accessToken || !isAuthenticated) {
            throw new Error('No hay sesión activa');
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/wallet/deposit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al realizar el depósito');
            }

            const data = await response.json();
            setBalance(data.balance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al realizar el depósito');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const withdraw = async (amount: number) => {
        if (!accessToken || !isAuthenticated) {
            throw new Error('No hay sesión activa');
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/wallet/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ amount }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al realizar el retiro');
            }

            const data = await response.json();
            setBalance(data.balance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al realizar el retiro');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const value = {
        balance,
        isLoading,
        error,
        deposit,
        withdraw,
        refreshBalance: fetchBalance,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};