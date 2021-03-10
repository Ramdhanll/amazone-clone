import express from 'express'
import { seed } from '../controllers/UserController.js'

const userRouter = express.Router()
userRouter.get('/seed', seed)


export default userRouter