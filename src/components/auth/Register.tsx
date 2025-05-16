import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container,
    CircularProgress,
    Alert,
    IconButton,
    InputAdornment,
    Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../../hooks/useAuth';

interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegisterSuccess?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
    const { register, isLoading, error } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const validateForm = (): boolean => {
        const errors: {
            name?: string;
            email?: string;
            password?: string;
            confirmPassword?: string;
        } = {};
        let isValid = true;

        // Validación de nombre
        if (!name.trim()) {
            errors.name = 'El nombre es obligatorio';
            isValid = false;
        }

        // Validación de email
        if (!email) {
            errors.email = 'El email es obligatorio';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email inválido';
            isValid = false;
        }

        // Validación de contraseña
        if (!password) {
            errors.password = 'La contraseña es obligatoria';
            isValid = false;
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
        }

        // Validación de confirmación de contraseña
        if (password !== confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const success = await register({ name, email, password });
        if (success && onRegisterSuccess) {
            onRegisterSuccess();
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    borderRadius: 2
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonAddAltIcon />
                </Avatar>

                <Typography component="h1" variant="h5" fontWeight="bold" mb={3}>
                    Crear cuenta
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre completo"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        disabled={isLoading}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        disabled={isLoading}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        disabled={isLoading}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirmar contraseña"
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2, py: 1.2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Registrarse'}
                    </Button>

                    <Box textAlign="center">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={onSwitchToLogin}
                            underline="hover"
                            sx={{ cursor: 'pointer' }}
                        >
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register;