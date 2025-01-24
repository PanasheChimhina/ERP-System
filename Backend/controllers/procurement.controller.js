const ERPFacade = require('../facades/ERPFacade');
const PurchaseOrder = require('../models/procurement.model');
const ProcurementService = require('../services/ProcurementService');

const procurementService = new ProcurementService(PurchaseOrder);
// Note: Other services should be injected here

// Create a new purchase order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const order = await erpFacade.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all purchase orders
exports.getPurchaseOrders = async (req, res) => {
    try {
        const orders = await procurementService.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single purchase order
exports.getPurchaseOrder = async (req, res) => {
    try {
        const order = await procurementService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a purchase order
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const order = await procurementService.updateOrder(req.params.id, req.body);
        if (!order) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a purchase order
exports.deletePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase order not found' });
        }
        res.json({ message: 'Purchase order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 