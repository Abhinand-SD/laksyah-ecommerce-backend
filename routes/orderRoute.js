import express from 'express'
import { allOrders, placeholderStrip, placeOrder, placeOrderRazerpay, updateStatus, userOrders } from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'



const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)


//Payment Features
orderRouter.post('/placeOrder',authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeholderStrip)
orderRouter.post('/razorpay', authUser, placeOrderRazerpay)

// User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter