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
} from '@mui/material';

interface AmountDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (amount: number) => void;
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

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setError('');
        }
    };

    const handleSubmit = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Por favor ingrese un monto válido');
            return;
        }
        onConfirm(numAmount);
        setAmount('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    {description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {description}
                        </Typography>
                    )}
                    <TextField
                        autoFocus
                        fullWidth
                        label="Monto"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        error={!!error}
                        helperText={error}
                        InputProps={{
                            startAdornment: '$',
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>{cancelButtonText}</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AmountDialog; 