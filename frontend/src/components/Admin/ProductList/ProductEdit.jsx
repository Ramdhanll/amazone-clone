import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../../../redux/index'
import { PRODUCT_UPDATE_RESET } from '../../../redux/product/ProductTypes'
import LoadingBox from '../../utils/LoadingBox'
import MessageBox from '../../utils/MessageBox'

const ProductEdit = (props) => {
   const productId = props.match.params.id

   const [name, setName] = useState('')
   const [price, setPrice] = useState('')
   const [image, setImage] = useState('')
   const [category, setCategory] = useState('')
   const [countInStock, setCountInStock] = useState('')
   const [brand, setBrand] = useState('')
   const [description, setDescription] = useState('')

   const dispatch = useDispatch()
   const productDetails = useSelector(state => state.productDetails)
   const { loading, error, product } = productDetails

   const productUpdate = useSelector(state => state.productUpdate)
   const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

   useEffect(() => {
      if (successUpdate) {
         props.history.push('/admin/productlist')
      }

      if (!product || product._id !== productId || successUpdate) {
         dispatch({ type: PRODUCT_UPDATE_RESET })
         dispatch(detailsProduct(productId))
      } else {
         setName(product.name)
         setPrice(product.price)
         setImage(product.image)
         setCategory(product.category)
         setCountInStock(product.countInStock)
         setBrand(product.brand)
         setDescription(product.description)
      }
   }, [product, product, productId, dispatch, successUpdate])

   const submitHandler = e => {
      e.preventDefault();
      dispatch(updateProduct({
         _id: productId,
         name,
         price,
         image,
         category,
         brand,
         countInStock,
         description
      }))
   }

   return (
      <div>
         <form className="form" onSubmit={submitHandler}>
            <div>
               <h1>Edit Product {productId}</h1>
            </div>

            {loadingUpdate && <LoadingBox/>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

            {
               loading ? <LoadingBox/> :
               error ? <MessageBox variant="danger"> {error}</MessageBox> :
            <>
               <div>
                  <label htmlFor="name">Name</label>
                  <input 
                     type="text" 
                     id="name" 
                     placeholder="Enter name"
                     value={name}
                     onChange={e => setName(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="price">Price</label>
                  <input 
                     type="text" 
                     id="price" 
                     placeholder="Enter price"
                     value={price}
                     onChange={e => setPrice(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="image">Image</label>
                  <input 
                     type="text" 
                     id="image" 
                     placeholder="Enter image"
                     value={image}
                     onChange={e => setImage(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="category">Category</label>
                  <input 
                     type="text" 
                     id="category" 
                     placeholder="Enter category"
                     value={category}
                     onChange={e => setCategory(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="brand">brand</label>
                  <input 
                     type="text" 
                     id="brand" 
                     placeholder="Enter brand"
                     value={brand}
                     onChange={e => setBrand(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="countInStock">Stock</label>
                  <input 
                     type="text" 
                     id="countInStock" 
                     placeholder="Enter stock"
                     value={countInStock}
                     onChange={e => setCountInStock(e.target.value)}
                  />
               </div>
               <div>
                  <label htmlFor="description">Description</label>
                  <textarea 
                     id="description" 
                     rows="3"
                     type="text" 
                     placeholder="Enter description"
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                  />
               </div>
               <div>
                  <label />
                  <button className="primary" type="submit">
                     Update
                  </button>
               </div>
            </>
            }
         </form>
      </div>
   )
}

export default ProductEdit
