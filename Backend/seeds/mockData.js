const mongoose = require('mongoose');
const Product = require('../models/inventory.model');
const Sale = require('../models/sales.model');
const Employee = require('../models/hr.model');
const Transaction = require('../models/finance.model');
const PurchaseOrder = require('../models/procurement.model');

const mockData = {
    // Inventory Mock Data
    products: [
        {
            name: "Laptop ThinkPad X1",
            sku: "LAP-TP-001",
            quantity: 50,
            price: 1299.99,
            category: "Electronics",
            description: "Business laptop with 16GB RAM, 512GB SSD"
        },
        {
            name: "Office Desk Chair",
            sku: "FUR-CH-002",
            quantity: 100,
            price: 199.99,
            category: "Furniture",
            description: "Ergonomic office chair with lumbar support"
        },
        {
            name: "Printer HP LaserJet",
            sku: "PRN-HP-003",
            quantity: 30,
            price: 349.99,
            category: "Electronics",
            description: "Color laser printer for office use"
        }
    ],

    // Sales Mock Data
    sales: [
        {
            orderNumber: "SO-2024-001",
            customer: {
                name: "John Smith",
                email: "john.smith@email.com",
                phone: "123-456-7890"
            },
            products: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 2,
                    price: 1299.99
                }
            ],
            totalAmount: 2599.98,
            status: "completed",
            paymentStatus: "paid"
        },
        {
            orderNumber: "SO-2024-002",
            customer: {
                name: "Sarah Johnson",
                email: "sarah.j@email.com",
                phone: "234-567-8901"
            },
            products: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 5,
                    price: 199.99
                }
            ],
            totalAmount: 999.95,
            status: "pending",
            paymentStatus: "pending"
        },
        {
            orderNumber: "SO-2024-003",
            customer: {
                name: "Tech Solutions Inc",
                email: "orders@techsolutions.com",
                phone: "345-678-9012"
            },
            products: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 3,
                    price: 349.99
                }
            ],
            totalAmount: 1049.97,
            status: "completed",
            paymentStatus: "paid"
        }
    ],

    // HR Mock Data
    employees: [
        {
            employeeId: "EMP001",
            firstName: "Michael",
            lastName: "Anderson",
            email: "m.anderson@company.com",
            phone: "123-456-7890",
            department: "Sales",
            position: "Sales Manager",
            joinDate: new Date("2023-01-15"),
            salary: 75000,
            status: "active"
        },
        {
            employeeId: "EMP002",
            firstName: "Emily",
            lastName: "Wilson",
            email: "e.wilson@company.com",
            phone: "234-567-8901",
            department: "HR",
            position: "HR Specialist",
            joinDate: new Date("2023-03-20"),
            salary: 65000,
            status: "active"
        },
        {
            employeeId: "EMP003",
            firstName: "David",
            lastName: "Martinez",
            email: "d.martinez@company.com",
            phone: "345-678-9012",
            department: "IT",
            position: "Systems Administrator",
            joinDate: new Date("2023-02-10"),
            salary: 85000,
            status: "active"
        }
    ],

    // Finance Mock Data
    transactions: [
        {
            transactionId: "TRX-2024-001",
            type: "income",
            amount: 25000.00,
            currency: "USD",
            category: "Sales Revenue",
            description: "Monthly sales revenue - January 2024",
            reference: "REF001",
            date: new Date("2024-01-31"),
            status: "completed"
        },
        {
            transactionId: "TRX-2024-002",
            type: "expense",
            amount: 12000.00,
            currency: "USD",
            category: "Payroll",
            description: "Employee salaries - January 2024",
            reference: "REF002",
            date: new Date("2024-01-31"),
            status: "completed"
        },
        {
            transactionId: "TRX-2024-003",
            type: "expense",
            amount: 5000.00,
            currency: "USD",
            category: "Office Supplies",
            description: "Office supplies and equipment",
            reference: "REF003",
            date: new Date("2024-01-15"),
            status: "completed"
        }
    ],

    // Procurement Mock Data
    purchaseOrders: [
        {
            poNumber: "PO-2024-001",
            supplier: {
                name: "Tech Supplies Co",
                contact: {
                    email: "orders@techsupplies.com",
                    phone: "123-456-7890",
                    address: "123 Tech Street, Silicon Valley, CA"
                }
            },
            items: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 20,
                    unitPrice: 1100.00,
                    totalPrice: 22000.00
                }
            ],
            totalAmount: 22000.00,
            status: "completed",
            requestedBy: null, // Will be set after employees are created
            expectedDeliveryDate: new Date("2024-02-15")
        },
        {
            poNumber: "PO-2024-002",
            supplier: {
                name: "Office Furniture Plus",
                contact: {
                    email: "sales@officefurniture.com",
                    phone: "234-567-8901",
                    address: "456 Furniture Ave, Chicago, IL"
                }
            },
            items: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 50,
                    unitPrice: 180.00,
                    totalPrice: 9000.00
                }
            ],
            totalAmount: 9000.00,
            status: "pending",
            requestedBy: null, // Will be set after employees are created
            expectedDeliveryDate: new Date("2024-02-28")
        },
        {
            poNumber: "PO-2024-003",
            supplier: {
                name: "PrintTech Solutions",
                contact: {
                    email: "orders@printtech.com",
                    phone: "345-678-9012",
                    address: "789 Printer Road, Houston, TX"
                }
            },
            items: [
                {
                    productId: null, // Will be set after products are created
                    quantity: 10,
                    unitPrice: 300.00,
                    totalPrice: 3000.00
                }
            ],
            totalAmount: 3000.00,
            status: "approved",
            requestedBy: null, // Will be set after employees are created
            expectedDeliveryDate: new Date("2024-03-10")
        }
    ]
};

// Function to seed the database
async function seedDatabase() {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await Sale.deleteMany({});
        await Employee.deleteMany({});
        await Transaction.deleteMany({});
        await PurchaseOrder.deleteMany({});

        // Insert products
        const products = await Product.insertMany(mockData.products);

        // Insert employees
        const employees = await Employee.insertMany(mockData.employees);

        // Update sales with product references
        mockData.sales.forEach(sale => {
            sale.products[0].productId = products[0]._id;
        });
        await Sale.insertMany(mockData.sales);

        // Insert transactions
        await Transaction.insertMany(mockData.transactions);

        // Update purchase orders with product and employee references
        mockData.purchaseOrders.forEach((po, index) => {
            po.items[0].productId = products[index]._id;
            po.requestedBy = employees[0]._id;
        });
        await PurchaseOrder.insertMany(mockData.purchaseOrders);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = seedDatabase;