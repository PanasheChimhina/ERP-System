const ERPFacade = require('../facades/ERPFacade');
const Sale = require('../models/sales.model');
const SalesService = require('../services/SalesService');

const salesService = new SalesService(Sale);
// Note: Other services should be injected here

// Create a new sale
exports.createSale = async (req, res) => {
    try {
        const sale = await erpFacade.processSale(req.body);
        res.status(201).json(sale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all sales
exports.getSales = async (req, res) => {
    try {
        const sales = await Sale.find().populate('products.productId');
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single sale
exports.getSale = async (req, res) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('products.productId');
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sale
exports.updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json(sale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a sale
exports.deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json({ message: 'Sale deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 