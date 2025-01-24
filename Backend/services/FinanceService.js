class FinanceService {
    constructor(Transaction) {
        this.Transaction = Transaction;
    }

    async recordTransaction(transactionData) {
        const transaction = new this.Transaction({
            ...transactionData,
            date: new Date(),
            status: 'completed'
        });
        await transaction.save();
        return transaction;
    }

    async processPayroll(payrollData) {
        const transaction = new this.Transaction({
            type: 'expense',
            amount: payrollData.totalPayroll,
            category: 'Payroll',
            description: `Payroll processing for ${payrollData.employees.length} employees`,
            date: new Date(),
            status: 'completed'
        });
        await transaction.save();
        return transaction;
    }

    async generateReport() {
        const transactions = await this.Transaction.find();
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome: income,
            totalExpenses: expenses,
            netAmount: income - expenses,
            transactionCount: transactions.length,
            generatedAt: new Date()
        };
    }

    async getTransactions() {
        return await this.Transaction.find();
    }
}

module.exports = FinanceService; 