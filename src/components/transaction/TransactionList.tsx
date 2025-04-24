import { Box } from '@mui/material';
import Transaction, { TransactionProps } from './Transaction';

interface TransactionListProps {
    transactions: TransactionProps[];
    title?: string;
}

const TransactionList = ({ transactions }: TransactionListProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'} sx={{ width: '100%', gap: 1 }}>
            {transactions.map((transaction, index) => (
                <Transaction
                    key={index}
                    type={transaction.type}
                    description={transaction.description}
                    date={transaction.date}
                    amount={transaction.amount}
                />
            ))}
        </Box>
    );
};

export default TransactionList;