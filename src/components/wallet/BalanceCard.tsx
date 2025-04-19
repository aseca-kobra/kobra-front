import {Typography, Skeleton, Box} from "@mui/material";

interface BalanceCardProps {
    balance: number;
    isLoading: boolean;
}

const BalanceCard = ({ balance, isLoading }: BalanceCardProps)=> {
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
        }}>
            <Typography variant="h6" fontWeight={700} color={"textPrimary"}>
                Tu saldo disponible
            </Typography>
            {isLoading ? (
                <Skeleton variant="rectangular" width={120} height={36} />
            ) : (
                <Typography variant="h4" fontWeight={700} color={"textPrimary"}>
                    ${balance}
                </Typography>
            )}
        </Box>
    );
}

export default BalanceCard;