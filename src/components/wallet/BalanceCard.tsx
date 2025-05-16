import { Typography, Skeleton, Box, Alert } from "@mui/material";
import { useWallet } from "../../hooks/useWallet";

const BalanceCard = () => {
    const { balance, isLoading, error } = useWallet();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            bgcolor: "background.paper",
            padding: 2,
            borderRadius: 2,
            boxShadow: 2,
            boxSizing: 'border-box'
        }}>
            <Typography variant="h6" fontWeight={700} color={"textPrimary"}>
                Tu saldo disponible
            </Typography>
            {isLoading ? (
                <Skeleton variant="rounded" animation={"wave"} width={170} height={40} sx={{ bgColor: 'grey.100' }} />
            ) : error ? (
                <Box mt={1} width="100%">
                    <Alert severity="error" sx={{ width: "100%" }}>
                        {error}
                    </Alert>
                </Box>
            ) : (
                <Typography variant="h4" fontWeight={700} color={"textPrimary"}>
                    ${balance?.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
            )}
        </Box>
    );
}

export default BalanceCard;