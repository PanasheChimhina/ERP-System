const ERPFacade = require('../facades/ERPFacade');
const Employee = require('../models/hr.model');
const HRService = require('../services/HRService');

const hrService = new HRService(Employee);
// Note: Other services should be injected here

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = await hrService.createEmployee(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await hrService.getActiveEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Process payroll
exports.processPayroll = async (req, res) => {
    try {
        const payrollData = await erpFacade.processPayroll();
        res.json(payrollData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single employee
exports.getEmployee = async (req, res) => {
    try {
        const employee = await hrService.getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await hrService.updateEmployee(req.params.id, req.body);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 