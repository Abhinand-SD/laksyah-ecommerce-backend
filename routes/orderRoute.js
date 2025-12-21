import express from 'express'
import { allOrders, placeholderStripe, placeOrder, placeOrderRazerpay, updateStatus, userOrders, verifyRazorpayPayment, verifyStripePayment } from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)


//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeholderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazerpay)

// User Feature
orderRouter.post('/userOrders', authUser, userOrders)

// verify stripe payment
orderRouter.post('/verifyStripe', authUser, verifyStripePayment)

// verify razorpay payment
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpayPayment)

export default orderRouter