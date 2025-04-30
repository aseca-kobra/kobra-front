import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import Login from './Login';
import Register from './Register';
import useAuth from '../../hooks/useAuth';

interface AuthContainerProps {
    onAuthSuccess?: () => void;
}

const AuthContainer = ({ onAuthSuccess }: AuthContainerProps) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { isAuthenticated, checkAuth } = useAuth();

    useEffect(() => {
        const isAlreadyAuthenticated = checkAuth();
        if (isAlreadyAuthenticated && onAuthSuccess) {
            onAuthSuccess();
        }
    }, [checkAuth, onAuthSuccess]);

    const handleSwitchToRegister = () => {
        setIsLoginView(false);
    };

    const handleSwitchToLogin = () => {
        setIsLoginView(true);
    };

    const handleAuthSuccess = () => {
        if (onAuthSuccess) {
            onAuthSuccess();
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {isLoginView ? (
                    <Login
                        onSwitchToRegister={handleSwitchToRegister}
                        onLoginSuccess={handleAuthSuccess}
                    />
                ) : (
                    <Register
                        onSwitchToLogin={handleSwitchToLogin}
                        onRegisterSuccess={handleAuthSuccess}
                    />
                )}
            </Box>
        </Container>
    );
};

export default AuthContainer;