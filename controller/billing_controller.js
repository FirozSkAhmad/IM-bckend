const express = require('express')
const billingService = require('../services//billing_service');
const Constants = require('../utils/Constants/response_messages')

const router = express.Router()

router.post('/createNewBill', async (req, res, next) => {
    try {
        const billingServiceObj = new billingService();
        const data = await billingServiceObj.createNewBill(req.body)
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

router.get('/priceCalculator/:partNo/:order_qty', async (req, res, next) => {
    try {
        const billingServiceObj = new billingService();
        const part_no = req.params.partNo
        const order_qty = req.params.order_qty
        const data = await billingServiceObj.priceCalculator(part_no,order_qty)
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

module.exports = router;