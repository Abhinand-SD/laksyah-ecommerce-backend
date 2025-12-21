import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import razorpay from "razorpay"

// global veriables
const currency = 'inr'
const deliveryCharge = 75

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance = new razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

// Placing order using COD Nethod
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

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

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order placed successfully" })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

// Place orders using stripe method
const placeholderStripe = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

        const { origin } = req.headers;

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

        // Items
        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Delivery Charge
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            metadata: {
                userId: userId.toString(),
                orderId: newOrder._id.toString()
            }
        })

        res.json({ success: true, session_url: session.url });

    } catch (err) {

        console.log(err)
        res.json({ success: false, message: err.message })
    }

}

// verify payment
const verifyStripePayment = async (req, res) => {

    const { orderId, success, userId } = req.body;
    try {
        if (success == "true") {

            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay method
const placeOrderRazerpay = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

// Verify Razorpay Payment
const verifyRazorpayPayment = async (req, res) => {
    try {
        const { orderId, success, userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})

            res.json({success: true, message: "Payment Successful"})
        } else{
            res.json({success: false, message: "Payment Failed"});
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//ALl Order data for Admin Panel
const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find()  //.sort({_id:-1})
        res.json({ success: true, orders })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

//User order data for Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId })

        res.json({ success: true, orders })
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

//update order status from admin panel
const updateStatus = async (req, res) => {

    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({ success: true, message: 'Status updated' })

    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }

}

export {
    placeOrder,
    placeholderStripe,
    placeOrderRazerpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripePayment,
    verifyRazorpayPayment
}