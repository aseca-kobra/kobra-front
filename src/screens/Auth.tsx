import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AuthContainer from '../components/auth/AuthContainer';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleAuthSuccess = () => {
        navigate('/home');
    };

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
        }}>
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
        </Box>
    );
};

export default AuthPage;