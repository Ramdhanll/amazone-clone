import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'
import { generateToken } from "../utils/jwt.js"

import data from './data.js'

export const seed = expressAsyncHandler(async (req, res) => {
   await User.remove({})
   const createdUsers = await User.insertMany(data.users)
   res.send(createdUsers)
})

export const signin = expressAsyncHandler( async (req, res) => {
   const {email, password} = req.body
   const user = await User.findOne({ email: email })

   if (user) {
      if (bcrypt.compareSync(password, user.password)) {
         res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
         })
         return
      }
   }

   res.status(401).json({ message: 'Invalid email or password'})
})

export const register = expressAsyncHandler( async (req, res) => {
   const { name, email, password } = req.body
   const user = new User({ name, email, password: bcrypt.hashSync(password, 8)})
   const createdUser = await user.save()
   
   res.status(200).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser)
   })
})

export const userDetail = expressAsyncHandler( async ( req, res) => {
   const user = await User.findById(req.params.id).select('-password')
   if (!user) return res.status(404).json({ message: 'User Not Found'})

   res.status(200).json(user)
})

export const updateProfile = expressAsyncHandler( async (req, res) => {
   const user = await User.findById(req.user._id)
   if (!user) return res.status(404).json({ message: 'User Not Found'})

   user.name = req.body.name || user.name
   user.email = req.body.email || user.email
   if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8) 
   }

   const updateUser = await user.save()

   res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser)
   })

})

export const getAllUsers = expressAsyncHandler( async (req, res) => {
   const users = await User.find({})

   if (!users) return res.status(404).json({ message: 'Users Not Found'})

   return res.status(200).json(users)
})

export const editByAdmin = expressAsyncHandler( async (req, res) => {
   const { name, email, isSeller, isAdmin } = req.body
   const user = await User.findById(req.params.id)
   if (!user) return res.status(404).json({ message: 'Users Not Found'})
   
   if (user) {
      user.name = name
      user.email = email 
      user.isSeller = isSeller 
      user.isAdmin = isAdmin
      const updatedUser = await user.save()

      return res.status(200).json({ message: "User Updated", user: updatedUser})
   }
})

export const destroy = expressAsyncHandler( async (req, res) => {
   const user = await User.findById(req.params.id)
   if (!user) return res.status(404).json({ message: 'Users Not Found'})
   if (user.isAdmin) return res.status(400).json({ message: 'Can Not Delete Admin User' })

   const deletedUser = await user.remove()
   return res.status(200).json({ mesage: 'User Deleted', user: deletedUser })
})