import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Placing order using COD Nethod
const placeOrder= async (req,res) => {

    try{
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message:"Order placed successfully"})
    }catch(err){
        console.log(err)
        res.json({success:false, message:err.message})
    }
}

// Place orders using stripe method
const placeholderStrip = async (req,res) => {

}

// Placing orders using Razorpay method
const placeOrderRazerpay = async (req, res) => {

}

//ALl Order data for Admin Panel
const allOrders = async (req,res) => {

    try {
        const orders = await orderModel.find()  //.sort({_id:-1})
        res.json({success:true, orders})
    } catch (err) {
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

//User order data for Frontend
const  userOrders = async (req,res) => {
    try {
        const {userId} = req.body;
        
        const orders = await orderModel.find({userId})
        
        res.json({success:true, orders})
    } catch (err) {
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

//update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({success:true, message: 'Status updated'})

    }catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }

}

export {
    placeOrder,
    placeholderStrip,
    placeOrderRazerpay,
    allOrders,
    userOrders,
    updateStatus
}