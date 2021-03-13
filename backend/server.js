import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import productRouter from './routes/productRouter.js'
import userRouter from './routes/userRouter.js'
import paymentRouter from './routes/paymentRouter.js'

const PORT = process.env.PORT || 5000 
dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true})) // middleware to allow contain in request

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazone-clone', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
}).then(() => console.log('DB Connected!'))

app.get('/', (req, res) => {
   res.send('Server is on!')
})


// Routes
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/payment', paymentRouter)

app.use((err, req, res, next) => {// this method from express-async-handler to handle error
   res.status(500).send({message: err.message})
})


app.listen(PORT, () => { 
   console.log(`Server listening on: http://localhost:${PORT}`)
})