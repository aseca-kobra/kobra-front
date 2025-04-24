import React from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import TransactionList from "../transaction/TransactionList.tsx";
import useTransactions from "../../hooks/useTransactions.ts";

interface TransactionSectionProps {
    title?: string;
}

const TransactionSection = ({ title = "Transacciones recientes" }: TransactionSectionProps) => {
    const { transactions, isLoading, error } = useTransactions();

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
            boxSizing: 'border-box',
            gap: 2
        }}>
            <Typography
                variant="h6"
                fontWeight="bold"
                alignSelf="flex-start"
                color={"textPrimary"}
            >
                {title}
            </Typography>

            {isLoading ? (
                <Box display="flex" justifyContent="center" width="100%" py={4}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box
                    bgcolor="error.light"
                    color="error.main"
                    p={2}
                    borderRadius={1}
                    width="100%"
                >
                    <Typography>{error}</Typography>
                </Box>
            ) : transactions.length === 0 ? (
                <Box
                    py={4}
                    textAlign="center"
                    width="100%"
                >
                    <Typography color="text.secondary">
                        No hay transacciones para mostrar
                    </Typography>
                </Box>
            ) : (
                <TransactionList transactions={transactions} />
            )}
        </Box>
    );
};

export default TransactionSection;