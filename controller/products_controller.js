const express = require('express')
const ProductsService = require('../services/products_service');
const Constants = require('../utils/Constants/response_messages')

const router = express.Router()

router.post('/createNewProduct', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService();
        const data = await productsServiceObj.createNewProduct(req.body)
            .catch(err => {
                console.log("error", err.message);
                throw err;
            })

        res.send({
            "status": 201,
            "message": Constants.SUCCESS,
            "data": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getProducts', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const data = await productsServiceObj.getProducts()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "data": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getProductNos', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const data = await productsServiceObj.getProductNos()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "data": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getProductNames', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const data = await productsServiceObj.getProductNames()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "data": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getProductNameByPNo/:partNo', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const part_no = req.params.partNo
        const data = await productsServiceObj.getProductNameByPNo(part_no)
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "data": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getTotalStock', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const data = await productsServiceObj.getTotalStock()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "count": data
        })
    }
    catch (err) {
        next(err);
    }
})

router.get('/getTotalStockValue', async (req, res, next) => {
    try {
        const productsServiceObj = new ProductsService()
        const data = await productsServiceObj.getTotalStockValue()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "value": data
        })
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;