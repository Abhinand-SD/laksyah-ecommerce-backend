import express from 'express'
import { addToCart, updateCart, getUserCart} from '../controllers/cartControllers'
import authUser from '../middleware/auth'

const cartRouter = express.Router()

cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.get('/get', authUser, getUserCart)

export default cartRouter