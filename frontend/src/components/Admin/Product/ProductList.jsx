import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts } from '../../../redux/index'
import { PRODUCT_CREATE_RESET } from '../../../redux/product/ProductTypes'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const ProductList = (props) => {
   const dispatch = useDispatch()
   const productList = useSelector(state => state.productList)
   const { loading, error, products } = productList

   const productCreate = useSelector(state => state.productCreate)
   const { 
      loading: loadingCreate, 
      error: errorCreate, 
      success: successCreate, 
      product: createdProduct 
   } = productCreate

   useEffect(() => {
      if (successCreate) {
         dispatch({ type: PRODUCT_CREATE_RESET })
         props.history.push(`/product/${createdProduct._id}/edit`)
      }
      dispatch(listProducts())
   }, [dispatch, successCreate, createdProduct, props.history])

   const createHandler = () => {
      dispatch(createProduct())
   }

   const deleteHandler = () => {

   }

   return (
      <div>
         <div className="row">
            <h1>Product</h1>
            <button type="button" className="primary" onClick={createHandler}>Create Product</button>
         </div>
         {loadingCreate && <LoadingBox></LoadingBox>}
         {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
         {
            loading ? <LoadingBox /> :
            error ? <MessageBox variant="danger">{error}</MessageBox>:
            (
               <table className="table">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     { products.map((product) => (
                        <tr key={product._id}>
                           <td>{product._id}</td>
                           <td>{product.name}</td>
                           <td>{product.price}</td>
                           <td>{product.category}</td>
                           <td>{product.brand}</td>
                           <td>
                              <button
                                 type="button"
                                 className="small"
                                 onClick={() => props.history.push(`/admin/product/${product._id}/edit`)}
                              >
                                 Edit
                              </button>
                              <button
                                 type="button"
                                 className="small"
                                 onClick={deleteHandler(product)}
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )
         }
      </div>
   )
}

export default ProductList