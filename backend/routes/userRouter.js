import express from 'express'
import { seed, signin, register, userDetail, updateProfile, getAllUsers, destroy, editByAdmin, topSellers } from '../controllers/UserController.js'
import { isAdmin, isAuth } from '../utils/jwt.js'

const userRouter = express.Router()

userRouter.get('/top-sellers', topSellers)
userRouter.get('/', isAuth, isAdmin, getAllUsers)
userRouter.get('/:id', userDetail)
userRouter.get('/seed', seed)
userRouter.post('/signin', signin)
userRouter.post('/register', register)
userRouter.put('/profile', isAuth, updateProfile)
userRouter.put('/:id', isAuth, isAdmin, editByAdmin)
userRouter.delete('/:id', isAuth, isAdmin, destroy)

export default userRouter