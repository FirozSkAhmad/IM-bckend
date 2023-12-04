const createError = require('http-errors')
const { SQL_ERROR, PRODUCT_CREATION_ERROR } = require('../utils/Constants/response_messages')
const { Sequelize } = require('sequelize')
const Constants = require('../utils/Constants/response_messages')
const BillingModel = require('../utils/Models/Billing/BillingModel');
const ProductsModel = require('../utils/Models/Products/ProductsModel');

class BillingService {
    constructor() {

    }
    async createNewBill(payload) {
        try {
            let billingData = { ...payload };
            let createdBill, updatedProducts;

            await global.DATA.CONNECTION.mysql.transaction(async (t) => {
                // Create the billing record
                createdBill = await BillingModel.create(billingData, {
                    transaction: t
                }).catch(err => {
                    console.log(err);
                    throw new global.DATA.PLUGINS.httperrors.InternalServerError(Constants.SQL_ERROR);
                });

                // Loop through products and update the ProductsModel for each item
                const updatedProductsData = [];
                for (const product of billingData.products) {
                    const data = await ProductsModel.findOne({
                        where: {
                            part_no: product.part_no
                        },
                        transaction: t
                    }).catch(err => {
                        console.log(err);
                        throw new global.DATA.PLUGINS.httperrors.InternalServerError(Constants.SQL_ERROR);
                    });

                    const updatedProduct = await ProductsModel.update(
                        { qty: data.qty - product.order_qty },
                        {
                            where: {
                                part_no: product.part_no
                            },
                            transaction: t,
                            returning: true, // Ensure you get the updated record in the result
                            plain: true
                        }
                    ).catch(err => {
                        throw new global.DATA.PLUGINS.httperrors.InternalServerError(Constants.SQL_ERROR);
                    });

                    updatedProductsData.push(updatedProduct[1]);
                }

                updatedProducts = updatedProductsData;
            });

            return {
                message: "Billing created successfully",
                createdBill,
                updatedProducts
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async priceCalculator(part_no, order_qty) {
        try {
            const response = await ProductsModel.findOne({
                where: {
                    part_no: part_no
                }
            }
            ).catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            });

            console.log(response)
            const MRP = response.MRP

            const price = (order_qty * MRP)

            return { price };
        } catch (err) {
            throw err;
        }
    }

}

module.exports = BillingService;