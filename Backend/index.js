const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import models
const Product = require('./models/inventory.model');
const Sale = require('./models/sales.model');
const Employee = require('./models/hr.model');
const Transaction = require('./models/finance.model');
const PurchaseOrder = require('./models/procurement.model');

// Import routes
const inventoryRoutes = require('./routes/inventory.routes');
const salesRoutes = require('./routes/sales.routes');
const hrRoutes = require('./routes/hr.routes');
const financeRoutes = require('./routes/finance.routes');
const procurementRoutes = require('./routes/procurement.routes');

// Import services
const InventoryService = require('./services/InventoryService');
const SalesService = require('./services/SalesService');
const HRService = require('./services/HRService');
const FinanceService = require('./services/FinanceService');
const ProcurementService = require('./services/ProcurementService');

// Import facade
const ERPFacade = require('./facades/ERPFacade');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    max: process.env.RATE_LIMIT_MAX_REQUESTS
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
    res.send('ERP API is running');
});

// Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/hr', hrRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/procurement', procurementRoutes);

// Initialize Services
const inventoryService = new InventoryService(Product);
const salesService = new SalesService(Sale);
const hrService = new HRService(Employee);
const financeService = new FinanceService(Transaction);
const procurementService = new ProcurementService(PurchaseOrder);

// Initialize Facade
const erpFacade = new ERPFacade(
    inventoryService,
    salesService,
    hrService,
    financeService,
    procurementService
);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});