import { User } from "../models/userModel.js"
import expressAsyncHandler from 'express-async-handler'
import data from "./data.js"

export const seed = expressAsyncHandler(async (req, res) => {
   await User.remove({})
   const createdUsers = await User.insertMany(data.users)
   res.send(createdUsers)
})