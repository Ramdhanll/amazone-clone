import React, { useEffect } from 'react'
import Product from '../Product/Product'
import MessageBox from '../utils/MessageBox'
import LoadingBox from '../utils/LoadingBox'

import { listProducts } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
   const productList = useSelector(state => state.productList)
   const { loading, error, products } = productList
   const dispatch = useDispatch()   

   useEffect(() => {
      dispatch(listProducts())
   }, [dispatch])

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

export default Home
