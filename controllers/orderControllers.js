import orderModel from "../models/orderModel.js";

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

        res.json({success, message:"Order Placed"})
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

}

//User order data for Frontend
const  userOrders = async (req,res) => {

}

//update order status from admin panel
const updateStatus = async (req, res) => {

}

export {
    placeOrder,
    placeholderStrip,
    placeOrderRazerpay,
    allOrders,
    userOrders,
    updateStatus
}