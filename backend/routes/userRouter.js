import express from 'express'
import { seed, signin, register, userDetail, updateProfile, getAllUsers, destroy, editByAdmin } from '../controllers/UserController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const userRouter = express.Router()

userRouter.put('/profile', isAuth, updateProfile)
userRouter.get('/', isAuth, isAdmin, getAllUsers)
userRouter.get('/:id', userDetail)
userRouter.put('/:id', isAuth, isAdmin, editByAdmin)
userRouter.delete('/:id', isAuth, isAdmin, destroy)
userRouter.get('/seed', seed)
userRouter.post('/signin', signin)
userRouter.post('/register', register)

export default userRouter