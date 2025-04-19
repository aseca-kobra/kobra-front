import {
    Typography,
    Box
} from "@mui/material";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionButton from "./ActionButton";

const QuickActions = () => {
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
            gap: 2
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
                <ActionButton icon={<CreditCardIcon />} label="Cargar" />
                <ActionButton icon={<LogoutIcon />} label="Retirar" />
            </Box>
        </Box>
    );
};

export default QuickActions;
