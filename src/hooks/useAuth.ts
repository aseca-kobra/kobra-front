import { useState, useCallback } from 'react';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
}

interface AuthResponse {
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    error?: string;
}

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);

    const login = async (credentials: LoginCredentials): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulación de llamada a API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock de validación simple
            if (credentials.email === "user@example.com" && credentials.password === "password123") {
                const mockUser = {
                    id: '1',
                    name: 'Usuario Demo',
                    email: credentials.email
                };

                // Guardar en localStorage (opcional)
                localStorage.setItem('auth_token', 'mock_jwt_token');
                localStorage.setItem('user', JSON.stringify(mockUser));

                setUser(mockUser);
                setIsAuthenticated(true);
                return true;
            } else {
                setError('Credenciales incorrectas');
                return false;
            }
        } catch (err) {
            setError('Error en el servidor. Intente nuevamente.');
            console.error('Login error:', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Simulación de llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Validación simple
            if (credentials.email && credentials.password && credentials.name) {
                // En un caso real, aquí verificaríamos si el usuario ya existe
                if (credentials.email === "user@example.com") {
                    setError('Este correo ya está registrado');
                    return false;
                }

                const mockUser = {
                    id: '2',
                    name: credentials.name,
                    email: credentials.email
                };

                // Guardar en localStorage (opcional)
                localStorage.setItem('auth_token', 'mock_jwt_token');
                localStorage.setItem('user', JSON.stringify(mockUser));

                setUser(mockUser);
                setIsAuthenticated(true);
                return true;
            } else {
                setError('Todos los campos son obligatorios');
                return false;
            }
        } catch (err) {
            setError('Error en el servidor. Intente nuevamente.');
            console.error('Register error:', err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    // Verificar si hay un token guardado al iniciar la aplicación
    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('auth_token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    return {
        isAuthenticated,
        isLoading,
        error,
        user,
        login,
        register,
        logout,
        checkAuth
    };
};

export default useAuth;