class InventoryService {
    constructor(Product) {
        this.Product = Product;
    }

    async checkStock(productId) {
        const product = await this.Product.findById(productId);
        return product ? product.quantity > 0 : false;
    }

    async updateStock(productId, quantity) {
        return await this.Product.findByIdAndUpdate(
            productId,
            { $inc: { quantity: -quantity } },
            { new: true }
        );
    }
}

module.exports = InventoryService; 