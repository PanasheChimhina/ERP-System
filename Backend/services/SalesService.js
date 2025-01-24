class SalesService {
    constructor(Sale) {
        this.Sale = Sale;
    }

    async createSale(saleData) {
        const sale = new this.Sale(saleData);
        await sale.save();
        return sale;
    }

    async getSales() {
        return await this.Sale.find().populate('products.productId');
    }

    async getSaleById(id) {
        return await this.Sale.findById(id).populate('products.productId');
    }

    async updateSale(id, saleData) {
        return await this.Sale.findByIdAndUpdate(id, saleData, { new: true });
    }
}

module.exports = SalesService; 