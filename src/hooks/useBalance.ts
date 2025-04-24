import { useState, useEffect } from 'react';

const useBalance = () => {
    const [balance, setBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockBalance = 15000;

                setBalance(mockBalance);
                setError(null);
            } catch (err) {
                setError('Error al cargar el balance');
                console.error('Error fetching balance:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalance();
    }, []);

    return { balance, isLoading, error };
};

export default useBalance;