import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import data from '../../../data'
import Rating from '../Rating'

import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct } from '../../../redux'
import MessageBox from '../../util/MessageBox'
import LoadingBox from '../../util/LoadingBox'

const Detail = (props) => {
   const dispatch = useDispatch()
   const productDetails = useSelector(state => state.productDetails)
   const { product, loading, error } = productDetails
   
   useEffect(() => {
      dispatch(detailsProduct(props.match.params.id))
   }, [])
   
   return (
      <div>
         { 
            loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            <div>
               <Link to="/">Back to result</Link>
               <div className="row top">
                  <div className="col-2">
                     <img className="large" src={product.image} alt={product.name}/>
                  </div>
                  <div className="col-1">
                     <ul>
                        <li>
                           <h1>{product.name}</h1>
                        </li>
                        <li>
                           <Rating rating={product.rating} numReviews={product.numReviews} />
                        </li>
                        <li>
                           Price: Rp. {product.price}
                        </li>
                        <li>
                           Description:
                           <p>{product.description}</p>
                        </li>
                     </ul>
                  </div>
                  <div className="col-1">
                     <div className="card card-body">
                        <ul>
                           <li>
                              <div className="row">
                                 <div>Price</div>
                                 <div className="price">Rp. {product.price}</div>
                              </div>
                           </li>
                           <li>
                              <div className="row">
                                 <div>Status</div>
                                 <div>
                                    {
                                       product.countInStock > 0 ? 
                                          <span className="success">In Stock</span>
                                          :
                                          <span className="danger">Unavailable</span>
                                    }
                                 </div>
                              </div>
                           </li>
                           <li>
                              <button className="primary block">Add to cart</button>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         }
         
      </div>
   )
}

export default Detail
