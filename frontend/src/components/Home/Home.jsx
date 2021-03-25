import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';

import Product from '../Product/Product'
import MessageBox from '../utils/MessageBox'
import LoadingBox from '../utils/LoadingBox'

import { listProducts } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { listTopSellers } from '../../redux/index';
import { Link } from 'react-router-dom';

const Home = () => {
   const dispatch = useDispatch()   

   const productList = useSelector(state => state.productList)
   const { loading, error, products } = productList

   const userTopSellersList = useSelector(state => state.userTopSellersList)
   const { loading: loadingTopSellers, error: errorTopSellers, users: sellers} = userTopSellersList

   useEffect(() => {
      dispatch(listProducts({}))
      dispatch(listTopSellers())
   }, [dispatch])

   return (
      <div>
         <h2>Top Sellers</h2>
         {
            loadingTopSellers ? <LoadingBox />:
            errorTopSellers ? <MessageBox variant="danger">{errorTopSellers}</MessageBox>:
            (
               <>
                  {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
                  <Carousel showArrows autoplay showThumbs={false}>
                     {sellers.map(seller => (
                        <div key={seller._id}>
                           <Link to={`/seller/${seller._id}`}>
                              <img src={seller.seller.logo} alt={seller.seller.name}/>
                              <p className="legend">{seller.seller.name}</p>
                           </Link>
                        </div>
                     ))}
                  </Carousel>
               </>
            )
         }

         { 
            loading ? <LoadingBox></LoadingBox> :
            error ? <MessageBox variant="danger">{error}</MessageBox> :
            (
               <>
                  {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                  <div className="row center mt-3">
                     {products.map(product => (
                        <Product key={product._id} product={product} />
                     ))}
                  </div>
               </>
            )
            
            
         }
      </div>
   )
}

export default Home
