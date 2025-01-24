const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hr.controller');

router.post('/', hrController.createEmployee);
router.get('/', hrController.getEmployees);
router.get('/:id', hrController.getEmployee);
router.put('/:id', hrController.updateEmployee);
router.delete('/:id', hrController.deleteEmployee);

module.exports = router; 