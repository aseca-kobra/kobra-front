import {
    Typography,
    Box
} from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionButton from "../shared/ActionButton.tsx";
import AmountDialog from "./AmountDialog.tsx";
import { useState } from "react";
import useWallet from "../../hooks/useWallet.ts";

const QuickActions = () => {
    const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);
    const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
    const { deposit, withdraw } = useWallet();

    const handleDeposit = (amount: number) => {
        deposit(amount);
    };

    const handleWithdraw = (amount: number) => {
        withdraw(amount);
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
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                width={"100%"}
                gap={2}
            >
                <ActionButton icon={<SwapVertIcon />} label="Transferir" />
                <ActionButton
                    icon={<CreditCardIcon />}
                    label="Cargar"
                    onClick={() => setIsDepositDialogOpen(true)}
                />
                <ActionButton
                    icon={<LogoutIcon />}
                    label="Retirar"
                    onClick={() => setIsWithdrawDialogOpen(true)}
                />
            </Box>

            <AmountDialog
                open={isDepositDialogOpen}
                onClose={() => setIsDepositDialogOpen(false)}
                onConfirm={handleDeposit}
                title="Realizar Depósito"
                description="Ingrese el monto que desea depositar en su cuenta"
                confirmButtonText="Depositar"
            />

            <AmountDialog
                open={isWithdrawDialogOpen}
                onClose={() => setIsWithdrawDialogOpen(false)}
                onConfirm={handleWithdraw}
                title="Realizar Retiro"
                description="Ingrese el monto que desea retirar de su cuenta"
                confirmButtonText="Retirar"
            />
        </Box>
    );
};

export default QuickActions;
