import express from 'express'
import { seed, signin } from '../controllers/UserController.js'

const userRouter = express.Router()

userRouter.get('/seed', seed)
userRouter.post('/signin', signin)

export default userRouter