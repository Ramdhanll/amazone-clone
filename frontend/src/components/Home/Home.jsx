import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../Product/Product'
import MessageBox from '../util/MessageBox'
import LoadingBox from '../util/LoadingBox'

import { listProducts } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
   const productList = useSelector(state => state.productList)
   const { loading, error, products } = productList

   const dispatch = useDispatch()   

   useEffect(() => {
      dispatch(listProducts())
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
