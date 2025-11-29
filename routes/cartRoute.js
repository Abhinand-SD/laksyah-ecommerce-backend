import express from 'express'
import { addToCart, updateCart, getUserCart} from '../controllers/cartControllers.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.get('/get', authUser, getUserCart)

export default cartRouter