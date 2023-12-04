const ProductController = require('../controller/products_controller')
const BulkUploadController = require('../controller/bulkupload_controller')
const BillingController = require('../controller/billing_controller')
const OrdersController = require('../controller/orders_controller')

class IndexRoute {
    constructor(expressApp) {
        this.app = expressApp
    }

    async initialize() {
        this.app.use('/product', ProductController)
        this.app.use("/upload", BulkUploadController);
        this.app.use("/billing", BillingController);
        this.app.use("/orders", OrdersController);
    }
}

module.exports = IndexRoute;