class ProcurementService {
    constructor(PurchaseOrder) {
        this.PurchaseOrder = PurchaseOrder;
    }

    async createOrder(orderData) {
        const order = new this.PurchaseOrder({
            ...orderData,
            status: 'pending',
            createdAt: new Date()
        });
        await order.save();
        return order;
    }

    async getOrders() {
        return await this.PurchaseOrder.find()
            .populate('supplier.id')
            .populate('items.productId')
            .populate('requestedBy')
            .populate('approvedBy');
    }

    async getOrderById(id) {
        return await this.PurchaseOrder.findById(id)
            .populate('supplier.id')
            .populate('items.productId')
            .populate('requestedBy')
            .populate('approvedBy');
    }

    async updateOrder(id, orderData) {
        return await this.PurchaseOrder.findByIdAndUpdate(
            id,
            { ...orderData, updatedAt: new Date() },
            { new: true }
        );
    }
}

module.exports = ProcurementService; 