const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller');

router.post('/', inventoryController.createProduct);
router.get('/', inventoryController.getProducts);
router.get('/:id', inventoryController.getProduct);
router.put('/:id', inventoryController.updateProduct);
router.delete('/:id', inventoryController.deleteProduct);

module.exports = router; 