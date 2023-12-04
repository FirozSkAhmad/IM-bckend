const express = require('express')
const OrdersService = require('../services/orders_service');
const Constants = require('../utils/Constants/response_messages')

const router = express.Router()

router.get('/getOrders', async (req, res, next) => {
    try {
        const ordersServiceObj = new OrdersService()
        const data = await ordersServiceObj.getOrders()
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

router.get('/getOrdersCount', async (req, res, next) => {
    try {
        const ordersServiceObj = new OrdersService()
        const data = await ordersServiceObj.getOrdersCount()
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

router.get('/getTotalSales', async (req, res, next) => {
    try {
        const ordersServiceObj = new OrdersService()
        const data = await ordersServiceObj.getTotalSales()
            .catch(err => {
                console.log("Error occured", err.message);
                throw err;
            })

        res.send({
            "status": 200,
            "message": Constants.SUCCESS,
            "total_sales": data
        })
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;