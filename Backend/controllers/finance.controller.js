const ERPFacade = require('../facades/ERPFacade');
const Transaction = require('../models/finance.model');
const FinanceService = require('../services/FinanceService');

const financeService = new FinanceService(Transaction);
// Note: Other services should be injected here

// Record a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await financeService.recordTransaction(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Generate financial report
exports.generateReport = async (req, res) => {
    try {
        const report = await erpFacade.generateReport();
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await financeService.getTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single transaction
exports.getTransaction = async (req, res) => {
    try {
        const transaction = await financeService.getTransactionById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 