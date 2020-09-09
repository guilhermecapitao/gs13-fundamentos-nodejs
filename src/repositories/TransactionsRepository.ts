import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (totalBalance: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          totalBalance.income += transaction.value;
        } else {
          totalBalance.outcome += transaction.value;
        }
        return totalBalance;
      },
      {
        outcome: 0,
        income: 0,
        total: 0,
      },
    );
    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
