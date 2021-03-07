import express from 'express'
import cors from 'cors'


import productRouter from './routes/productRouter.js'

const PORT = process.env.PORT || 5000 
const app = express()

app.get('/', (req, res) => {
   res.send('Server is on!')
})

// Middleware
app.use(cors())

// Routes
app.use('/api/products', productRouter)

app.listen(PORT, () => {
   console.log(`Server listening on: http://localhost:${PORT}`)
})