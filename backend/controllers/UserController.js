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
   console.log(req.body)
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