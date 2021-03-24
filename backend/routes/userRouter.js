import express from 'express'
import { seed, signin, register, userDetail, updateProfile, getAllUsers, destroy, editByAdmin } from '../controllers/UserController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const userRouter = express.Router()

userRouter.get('/', isAuth, isAdmin, getAllUsers)
userRouter.put('/:id', isAuth, isAdmin, editByAdmin)
userRouter.delete('/:id', isAuth, isAdmin, destroy)
userRouter.get('/seed', seed)
userRouter.post('/signin', signin)
userRouter.post('/register', register)
userRouter.get('/:id', userDetail)
userRouter.put('/profile', isAuth, updateProfile)

export default userRouter