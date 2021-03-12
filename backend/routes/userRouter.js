import express from 'express'
import { seed, signin, register } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.get('/seed', seed)
userRouter.post('/signin', signin)
userRouter.post('/register', register)

export default userRouter