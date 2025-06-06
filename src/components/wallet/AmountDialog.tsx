import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Alert,
} from '@mui/material';

interface AmountDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (amount: number) => Promise<{ success: boolean; error?: string }>;
    title: string;
    description?: string;
    confirmButtonText: string;
    cancelButtonText?: string;
}

const AmountDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmButtonText,
    cancelButtonText = 'Cancelar',
}: AmountDialogProps) => {
    const [amount, setAmount] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [backendError, setBackendError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setError('');
            setBackendError('');
        }
    };

    const handleSubmit = async () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Por favor ingrese un monto válido');
            return;
        }

        setIsSubmitting(true);
        setBackendError('');

        try {
            const result = await onConfirm(numAmount);
            
            if (result.success) {
                setAmount('');
                setError('');
                onClose();
            } else {
                setBackendError(result.error || 'Error al procesar la operación');
            }
        } catch (error) {
            setBackendError('Error al procesar la operación - ' + (error instanceof Error ? error.message : 'Error desconocido'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setAmount('');
        setError('');
        setBackendError('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    {description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {description}
                        </Typography>
                    )}
                    {backendError && (
                        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
                            {backendError}
                        </Alert>
                    )}
                    <TextField
                        autoFocus
                        fullWidth
                        name="amount"
                        label="Monto"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        error={!!error}
                        helperText={error}
                        disabled={isSubmitting}
                        InputProps={{
                            startAdornment: '$',
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} name="cancel" disabled={isSubmitting}>
                    {cancelButtonText}
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    color="primary" 
                    name="confirm"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Procesando...' : confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AmountDialog; 