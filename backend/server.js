import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import { productRouter, userRouter, paymentRouter, orderRouter, uploadRouter } from './routes/index.js'

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
.catch(e => console.log(e))

// Middleware
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// Routes
// app.get('/', (req, res) => {res.send('Server is on!')})
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/orders', orderRouter)
app.use('/api/uploads', uploadRouter)
app.get('/api/config/paypal', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID || 'sb') // sb is SandBox
})
app.use((err, req, res, next) => { // this method from express-async-handler to handle error
   res.status(500).send({message: err.message})
})


app.listen(PORT, () => { 
   console.log(`Server listening on: http://localhost:${PORT}`)
})