import { useState, useEffect } from 'react';
import useAuth from './useAuth';

const apiUrl = import.meta.env.VITE_API_URL;

const useWallet = () => {
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${apiUrl}/wallet/balance`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${auth.accessToken}`,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    setError(data.message || "Error al cargar el balance");
                }
                setBalance(data.balance);
                setError(null);
            } catch (err) {
                setError('Error al cargar el balance');
                console.error('Error fetching balance:', err);
            } finally {
                setIsLoading(false);
            }
        };
        if (auth.isLoading) {
            return;
        }
        fetchBalance();
    }, [auth.isLoading]);

    const deposit = async (amount: number) => {
        try {
            const response = await fetch(`${apiUrl}/wallet/deposit`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${auth.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || "Error al depositar");
            }
            setBalance(data.balance);
            setError(null);
        } catch (err) {
            setError('Error al depositar');
            console.error('Error depositing:', err);
        }
    };

    return { balance, isLoading, error, deposit };
};

export default useWallet;