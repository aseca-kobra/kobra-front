import { TransactionType as FrontendTransactionType } from '../components/transaction/Transaction';

export interface TransactionProps {
    type: FrontendTransactionType;
    description: string;
    date: string;
    amount: number;
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
    TRANSFER_IN = 'TRANSFER_IN',
    TRANSFER_OUT = 'TRANSFER_OUT'
}

export interface BackendTransaction {
    id: string;
    amount: number;
    type: TransactionType;
    createdAt: string;
    relatedUserId: string | null;
    relatedUser?: {
        email: string;
    };
}

export class TransactionService {
    private static mapTransactionType(transaction: BackendTransaction): FrontendTransactionType {
        switch (transaction.type) {
            case TransactionType.DEPOSIT:
                return 'deposit';
            case TransactionType.WITHDRAWAL:
                return 'withdrawal';
            case TransactionType.TRANSFER_IN:
                return 'received';
            case TransactionType.TRANSFER_OUT:
                return 'sent';
            default:
                throw new Error(`Unrecognized TransactionType: ${transaction.type}' in transaction ID: ${transaction.id}`);        }
    }

    private static formatTransactionDescription(transaction: BackendTransaction): string {
        switch (transaction.type) {
            case TransactionType.DEPOSIT:
                return 'Depósito a billetera';
            case TransactionType.WITHDRAWAL:
                return 'Retiro de billetera';
            case TransactionType.TRANSFER_IN:
                return transaction.relatedUser?.email 
                    ? `Transferencia recibida de ${transaction.relatedUser.email}`
                    : 'Transferencia recibida';
            case TransactionType.TRANSFER_OUT:
                return transaction.relatedUser?.email 
                    ? `Transferencia enviada a ${transaction.relatedUser.email}`
                    : 'Transferencia enviada';
            default:
                return 'Transacción';
        }
    }

    private static formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    static mapTransaction(transaction: BackendTransaction): TransactionProps {
        return {
            type: this.mapTransactionType(transaction),
            description: this.formatTransactionDescription(transaction),
            date: this.formatDate(transaction.createdAt),
            amount: transaction.amount
        };
    }

    static mapTransactions(transactions: BackendTransaction[]): TransactionProps[] {
        return transactions.map(transaction => this.mapTransaction(transaction));
    }
} 