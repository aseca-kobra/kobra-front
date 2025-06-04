import {
    Typography,
    Box,
    Alert
} from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ActionButton from "../shared/ActionButton.tsx";
import AmountDialog from "./AmountDialog.tsx";
import TransferDialog from "./TransferDialog.tsx";
import { useState } from "react";
import { useWallet } from "../../hooks/useWallet.tsx";
import useTransfer from "../../hooks/useTransfer";
import { useTransactionsContext } from "../../hooks/useTransactionsContext";

const QuickActions = () => {
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
    const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
    const { deposit } = useWallet();
    const { transfer, isLoading: isTransferLoading, error: transferError } = useTransfer();
    const { refreshTransactions } = useTransactionsContext();

    const handleDeposit = async (amount: number) => {
        await deposit(amount, refreshTransactions);
    };

    const handleTransfer = async (amount: number, recipientEmail: string) => {
        return transfer(amount, recipientEmail);
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            bgcolor: 'background.paper',
            boxShadow: 2,
            padding: 2,
            borderRadius: 2,
            gap: 2,
            boxSizing: 'border-box'
        }}>
            <Typography variant="h6" fontWeight={700} color={"textPrimary"}>
                Acciones rápidas
            </Typography>

            {transferError && (
                <Alert severity="error" sx={{ width: "100%" }}>
                    {transferError}
                </Alert>
            )}

            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                width={"100%"}
                gap={2}
            >
                <ActionButton 
                    icon={<SwapVertIcon />}
                    name={"withdraw"}
                    label="Transferir" 
                    onClick={() => setIsTransferDialogOpen(true)}
                    disabled={isTransferLoading}
                />
                <ActionButton
                    icon={<CreditCardIcon />}
                    name={"debin"}
                    label="Debin"
                    onClick={() => setIsDepositDialogOpen(true)}
                />
            </Box>

            <AmountDialog
                open={isDepositDialogOpen}
                onClose={() => setIsDepositDialogOpen(false)}
                onConfirm={handleDeposit}
                title="Realizar Debin"
                description="Ingrese el monto que desea ingresar en su cuenta"
                confirmButtonText="Debin"
            />

            <TransferDialog
                open={isTransferDialogOpen}
                onClose={() => setIsTransferDialogOpen(false)}
                onConfirm={handleTransfer}
                title="Realizar Transferencia"
                description="Ingrese el email del destinatario y el monto a transferir"
                confirmButtonText="Transferir"
            />
        </Box>
    );
};

export default QuickActions;
