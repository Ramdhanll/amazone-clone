import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false
   },
   isSeller: {
      type: Boolean,
      required: true,
      default: false
   },
   seller: {
      name: String,
      logo: String,
      description: String,
      rating: { type: Number, default: 0, required: true},
      numReviews: { type: Number, default: 0, required: true}
   }
}, {
   timestamps: true
})

const User = mongoose.model('User', UserSchema)

export { User }