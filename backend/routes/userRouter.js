import express from 'express'
import { seed, signin, register, userDetail, updateProfile } from '../controllers/UserController.js'
import { isAuth } from '../utils/jwt.js'

const userRouter = express.Router()

userRouter.get('/seed', seed)
userRouter.post('/signin', signin)
userRouter.post('/register', register)
userRouter.get('/:id', userDetail)
userRouter.put('/profile', isAuth, updateProfile)

export default userRouter