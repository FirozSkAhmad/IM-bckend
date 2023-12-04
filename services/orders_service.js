const createError = require('http-errors')
const { SQL_ERROR, PRODUCT_CREATION_ERROR } = require('../utils/Constants/response_messages')
const { Sequelize } = require('sequelize')
const BillingModel = require('../utils/Models/Billing/BillingModel');

class OrdersService {
    constructor() {

    }
    async getOrders() {
        try {
            const response = await BillingModel.findAll().catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            });

            // Use an object to store products grouped by client name
            const groupedProducts = {};

            response.forEach(record => {
                // Parse the JSON-formatted string to an array of objects
                const parsedProducts = JSON.parse(record.products);

                // Group products by client name
                if (!groupedProducts[record.client_name]) {
                    groupedProducts[record.client_name] = [];
                }

                groupedProducts[record.client_name].push({
                    billing_id: record.billing_id,
                    products: parsedProducts,
                    total_price: record.total_price,
                    due_date: record.due_date,
                    createdAt: record.createdAt,
                    updatedAt: record.updatedAt
                });
            });

            // Convert the object into an array
            const groupedData = Object.keys(groupedProducts).map(clientName => ({
                client_name: clientName,
                data: groupedProducts[clientName]
            }));

            console.log("View All Orders", groupedData);
            return groupedData;
        } catch (err) {
            throw err;
        }
    }

    async getOrdersCount() {
        try {
            const response = await BillingModel.count()
            return response
        }
        catch (err) {
            console.log("Error while fetching data", err.message);
            throw err;
        }
    }

    async getTotalSales() {
        try {
            const response = await BillingModel.findAll()
            const totalSum = response.reduce((acc, obj) => acc + parseFloat(obj.total_price), 0);
            return totalSum
        }
        catch (err) {
            console.log("Error while fetching data", err.message);
            throw err;
        }
    }
}

module.exports = OrdersService;