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
import { useWallet } from '../../hooks/useWallet';

interface TransferDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (amount: number, recipientEmail: string) => Promise<{ success: boolean; error?: string }>;
    title?: string;
    description?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

const TransferDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Realizar Transferencia",
    description = "Ingrese el email del destinatario y el monto a transferir",
    confirmButtonText = "Transferir",
    cancelButtonText = "Cancelar"
}: TransferDialogProps) => {
    const [amount, setAmount] = useState<string>('');
    const [recipientEmail, setRecipientEmail] = useState<string>('');
    const [amountError, setAmountError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [transferError, setTransferError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { balance } = useWallet();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value);
            setAmountError('');
            setTransferError('');
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setRecipientEmail(value);
        setEmailError('');
        setTransferError('');
    };

    const handleConfirm = async () => {
        let hasError = false;

        if (!recipientEmail) {
            setEmailError('El email es requerido');
            hasError = true;
        } else if (!validateEmail(recipientEmail)) {
            setEmailError('Ingrese un email válido');
            hasError = true;
        }

        if (!amount) {
            setAmountError('El monto es requerido');
            hasError = true;
        } else {
            const amountNum = parseFloat(amount);
            if (isNaN(amountNum) || amountNum <= 0) {
                setAmountError('Ingrese un monto válido mayor a 0');
                hasError = true;
            } else if (amountNum > balance) {
                setAmountError('Saldo insuficiente para realizar la transferencia');
                hasError = true;
            }
        }

        if (!hasError) {
            setIsSubmitting(true);
            setTransferError('');
            
            try {
                const result = await onConfirm(parseFloat(amount), recipientEmail);
                
                if (result.success) {
                    setAmount('');
                    setRecipientEmail('');
                    setAmountError('');
                    setEmailError('');
                    onClose();
                } else {
                    setTransferError(result.error || 'Error al realizar la transferencia');
                }
            } catch (error) {
                setTransferError('Error al realizar la transferencia - ' + (error instanceof Error ? error.message : 'Error desconocido'));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleClose = () => {
        setAmount('');
        setRecipientEmail('');
        setAmountError('');
        setEmailError('');
        setTransferError('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>

                    {transferError && (
                        <Alert severity="error" sx={{ width: "100%" }}>
                            {transferError}
                        </Alert>
                    )}

                    <TextField
                        label="Email del destinatario"
                        type="email"
                        value={recipientEmail}
                        onChange={handleEmailChange}
                        error={!!emailError}
                        helperText={emailError}
                        fullWidth
                        autoFocus
                        disabled={isSubmitting}
                    />
                    <TextField
                        label="Monto"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        error={!!amountError}
                        helperText={amountError || `Saldo disponible: $${balance.toLocaleString()}`}
                        fullWidth
                        disabled={isSubmitting}
                        InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" disabled={isSubmitting}>
                    {cancelButtonText}
                </Button>
                <Button 
                    onClick={handleConfirm} 
                    variant="contained" 
                    color="primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Transferiendo...' : confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TransferDialog; 