import userModel from "../models/userModel.js";


// add products to user cart
const addToCart = async(req,res) => {
    try {
        const {userId, itemId, size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size]= 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ succes: true, message: "Added To Cart"})

        res,json({ succes})
    } catch (err) {
        console.log(err)
        res.json({ succes: false, message: err.message})
    }
}

// update user cart
const updateCart = async(req,res) => {

    try {
        const {userId, itemId, size, quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ succes: true, message: "Cart updated"})
    } catch (error) {
        console.log(err)
        res.json({ succes: false, message: err.message})
    }
}

// get user cart data
const getUserCart = async(req,res) => {
    try {
        const {userId} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({succes: true, cartData})
    } catch (error) {
        console.log(err)
        res.json({ succes: false, message: err.message})
    }
}

export {
    addToCart,
    updateCart,
    getUserCart
}