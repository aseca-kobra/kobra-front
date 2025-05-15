import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
} from '@mui/material';

interface DepositDialogProps {
    open: boolean;
    onClose: () => void;
    onDeposit: (amount: number) => void;
}

const DepositDialog = ({ open, onClose, onDeposit }: DepositDialogProps) => {
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
        onDeposit(numAmount);
        setAmount('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Realizar Depósito</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Monto a depositar"
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
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Depositar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DepositDialog; 