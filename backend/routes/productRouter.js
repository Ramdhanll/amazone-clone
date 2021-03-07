import express from 'express'
import data from './data.js'

const productRouter = express.Router()

productRouter.get('/', (req, res) => {
   res.send(data)
})

export default productRouter