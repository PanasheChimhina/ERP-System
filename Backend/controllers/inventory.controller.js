const ERPFacade = require('../facades/ERPFacade');
const Product = require('../models/inventory.model');
const InventoryService = require('../services/InventoryService');
const SalesService = require('../services/SalesService');
const HRService = require('../services/HRService');
const FinanceService = require('../services/FinanceService');
const ProcurementService = require('../services/ProcurementService');
const Sale = require('../models/sales.model');
const Employee = require('../models/hr.model');
const Transaction = require('../models/finance.model');
const PurchaseOrder = require('../models/procurement.model');

// Initialize all services
const inventoryService = new InventoryService(Product);
const salesService = new SalesService(Sale);
const hrService = new HRService(Employee);
const financeService = new FinanceService(Transaction);
const procurementService = new ProcurementService(PurchaseOrder);

// Initialize facade
const erpFacade = new ERPFacade(
    inventoryService,
    salesService,
    hrService,
    financeService,
    procurementService
);

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check stock
exports.checkStock = async (req, res) => {
    try {
        const hasStock = await erpFacade.checkStock(req.params.id);
        res.json({ inStock: hasStock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 