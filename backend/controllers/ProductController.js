import data from './data.js'

export const getAllProducts = (req, res) => {
   return res.send(data)
}

export const getProduct = (req, res) => {
   const product = data.products.find(product => product._id === Number.parseInt(req.params.id))

   if (!product) return res.status(404).json({ message: 'Product not Found' })

   return res.status(200).json(product)
}