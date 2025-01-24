class ERPFacade {
    constructor(
        inventoryService,
        salesService,
        hrService,
        financeService,
        procurementService
    ) {
        this.inventoryService = inventoryService;
        this.salesService = salesService;
        this.hrService = hrService;
        this.financeService = financeService;
        this.procurementService = procurementService;
    }

    async checkStock(productId) {
        return await this.inventoryService.checkStock(productId);
    }

    async processSale(saleData) {
        // Check stock first
        const hasStock = await this.inventoryService.checkStock(saleData.productId);
        if (!hasStock) {
            throw new Error('Insufficient stock');
        }
        // Process the sale
        const sale = await this.salesService.createSale(saleData);
        // Update inventory
        await this.inventoryService.updateStock(saleData.productId, saleData.quantity);
        // Record financial transaction
        await this.financeService.recordTransaction({
            type: 'income',
            amount: saleData.amount,
            reference: sale.id
        });
        return sale;
    }

    async processPayroll() {
        const employees = await this.hrService.getActiveEmployees();
        const payrollData = await this.hrService.calculatePayroll(employees);
        await this.financeService.processPayroll(payrollData);
        return payrollData;
    }

    async generateReport() {
        return await this.financeService.generateReport();
    }

    async createOrder(orderData) {
        const order = await this.procurementService.createOrder(orderData);
        await this.financeService.recordTransaction({
            type: 'expense',
            amount: orderData.totalAmount,
            reference: order.id
        });
        return order;
    }
}

module.exports = ERPFacade; 