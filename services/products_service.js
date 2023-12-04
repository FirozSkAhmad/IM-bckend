const createError = require('http-errors')
const { SQL_ERROR, PRODUCT_CREATION_ERROR } = require('../utils/Constants/response_messages')
const { Sequelize } = require('sequelize')
const ProductsModel = require('../utils/Models/Products/ProductsModel');

class ProductsService {
    constructor() {

    }

    async createNewProduct(payload) {
        try {
            let toBeCreatedProduct = { ...payload }
            console.log('toBeCreatedProduct:', toBeCreatedProduct);
            const newlyCreatedProduct = await ProductsModel.create(toBeCreatedProduct)
                .catch(err => {
                    console.log("Error while adding in products table", err.message);
                    throw createError.InternalServerError(SQL_ERROR);
                });

            return newlyCreatedProduct;
        } catch (err) {
            throw err;
        }
    }
    async getProducts() {
        try {
            const response = await ProductsModel.findAll().catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            })

            const data = (response);
            console.log("View All Products", data);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    async getProductNos() {
        try {
            const response = await global.DATA.CONNECTION.mysql.query(`select part_no from products`, {
                type: Sequelize.QueryTypes.SELECT
            }).catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            })

            const data = (response);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    async getProductNames() {
        try {
            const response = await global.DATA.CONNECTION.mysql.query(`select description from products`, {
                type: Sequelize.QueryTypes.SELECT
            }).catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            })

            const data = (response);
            return data;
        }
        catch (err) {
            throw err;
        }
    }

    async getProductNameByPNo(part_no) {
        try {
            const response = await global.DATA.CONNECTION.mysql.query(
                'SELECT description FROM products WHERE part_no = :part_no',
                {
                    type: Sequelize.QueryTypes.SELECT,
                    replacements: { part_no }
                }
            ).catch(err => {
                console.log("Error while fetching data", err.message);
                throw createError.InternalServerError(SQL_ERROR);
            });

            const data = response.map(item => item.description);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getTotalStock() {
        try {
            const response = await ProductsModel.count()
            return response
        }
        catch (err) {
            console.log("Error while fetching data", err.message);
            throw err;
        }
    }

    async getTotalStockValue() {
        try {
            const response = await ProductsModel.findAll()
            const totalMRP = response.reduce((acc, obj) => acc + (parseFloat(obj.MRP) * parseInt(obj.qty)), 0)
            return totalMRP
        }
        catch (err) {
            console.log("Error while fetching data", err.message);
            throw err;
        }
    }
}

module.exports = ProductsService;