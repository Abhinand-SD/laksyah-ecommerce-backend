import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// global veriables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_KEY)

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

    try {
        const {userId, items, amount, address} = req.body;

        const {origin} = req.headers;

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data : {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity : 1
        })

                const session = await stripe.checkout.session.create({
            success_urrl: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',

        })

        res.json({success: true, session_url: session.url});
    
    } catch (err) {
        
        console.log(err)
        res.json({success: false, message:err.message})
    }

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