const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurement.controller');

router.post('/', procurementController.createPurchaseOrder);
router.get('/', procurementController.getPurchaseOrders);
router.get('/:id', procurementController.getPurchaseOrder);
router.put('/:id', procurementController.updatePurchaseOrder);
router.delete('/:id', procurementController.deletePurchaseOrder);

module.exports = router; 