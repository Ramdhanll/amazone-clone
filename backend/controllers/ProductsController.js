import data from './data.js'

export const getAllProducts = (req, res) => {
   return res.send(data)
}

export const getProduct = (req, res) => {
   const product = data.products.find(product => product._id === Number.parseInt(req.params.id))

   if (!product) return res.status(402).json({message: 'data tidak ditemukan'})

   return res.status(200).json(product)
}