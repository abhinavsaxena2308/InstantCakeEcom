const express = require('express')
const router = express.Router();
const Payment = require('../models/Payments')

const verifyToken = require('../middlewares/verifyToken')
const Cart = require('../models/Carts');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


//post payment to db
router.post('/', verifyToken, async (req , res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment);

        //delete cart after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id: {$in: cartIds}})

        res.status(200).json(paymentRequest)

    } catch (error) {
        res.status(404).json({message : error.message})
    }   
})

router.get('/', verifyToken, async (req,res) => {
    const email = req.query.email;
    const query = {email : email }
    try {
        const decodedEmail = req.decoded.email
        if (email !== decodedEmail){
            res.status(403).json({message : "Forbidden Acess"})
        }

        const result = await Payment.find(query).sort({createdAt : -1}).exec();
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message : error.message})
    }
})

module.exports = router;