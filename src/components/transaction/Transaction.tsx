import { Box, Typography, Paper } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export type TransactionType = 'received' | 'sent' | 'deposit' | 'withdrawal';

export interface TransactionProps {
    type: TransactionType;
    description: string;
    date: string;
    amount: number;
}

const getTransactionDetails = (type: TransactionType) => {
    switch (type) {
        case 'received':
            return {
                icon: <ArrowUpwardIcon sx={{ color: '#4caf50'}}/>,
                color: '#e0f7e6',
                textColor: '#4caf50',
                prefix: '+'
            };
        case 'sent':
            return {
                icon: <ArrowDownwardIcon sx={{ color: '#f44336'}}/>,
                color: '#ffebee',
                textColor: '#f44336',
                prefix: '-'
            };
        case 'deposit':
            return {
                icon: <CreditCardIcon sx={{ color: '#4caf50'}}/>,
                color: '#e0f7e6',
                textColor: '#4caf50',
                prefix: '+'
            };
        case 'withdrawal':
            return {
                icon: <AccountBalanceIcon sx={{ color: '#f44336'}}/>,
                color: '#ffebee',
                textColor: '#f44336',
                prefix: '-'
            };
        default:
            return {
                icon: <ArrowUpwardIcon />,
                color: '#e0f2f1',
                textColor: '#000000',
                prefix: ''
            };
    }
};

const Transaction = ({ type, description, date, amount }: TransactionProps ) => {
    const { icon, color, textColor, prefix } = getTransactionDetails(type);

    const formattedAmount = `${prefix}$${Math.abs(amount).toLocaleString()}`;

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                padding: 2,
                borderRadius: 2,
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                backgroundColor: 'white',
                boxShadow: 1,
                boxSizing: 'border-box'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    color={color}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: color,
                    }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body1" fontWeight="medium">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {date}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body1" fontWeight="medium" color={textColor}>
                {formattedAmount}
            </Typography>
        </Paper>
    );
};

export default Transaction;