import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../components/auth/AuthContainer';

const AuthPage = () => {
    const navigate = useNavigate();

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