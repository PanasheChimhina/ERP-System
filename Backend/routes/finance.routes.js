const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance.controller');

router.post('/', financeController.createTransaction);
router.get('/', financeController.getTransactions);
router.get('/:id', financeController.getTransaction);
router.put('/:id', financeController.updateTransaction);
router.delete('/:id', financeController.deleteTransaction);

module.exports = router; 