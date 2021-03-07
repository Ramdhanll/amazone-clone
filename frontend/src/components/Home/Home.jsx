import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import MessageBox from '../util/MessageBox'
import LoadingBox from '../util/LoadingBox'

const HomeScreen = () => {
   const [products, setProducts] = useState([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(false)
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            setLoading(true)
            const { data } = await axios.get('/api/products')
            setLoading(false)
            setProducts(data.products)   
         } catch (error) {
            setError(error.message)
            setLoading(false)
         }
      }
      
      fetchProducts()
   }, [])


   return (
      <div className="row center">
         { 
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            products.map(product => (
               <Product key={product._id} product={product} />
            ))
         }
      </div>
   )
}

export default HomeScreen
