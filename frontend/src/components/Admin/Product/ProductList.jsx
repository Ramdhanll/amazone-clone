import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import {
   createProduct,
   deleteProduct,
   listProducts,
} from "../../../redux/index"
import {
   PRODUCT_CREATE_RESET,
   PRODUCT_DELETE_RESET,
} from "../../../redux/product/ProductTypes"
import LoadingBox from "../../utils/LoadingBox"
import MessageBox from "../../utils/MessageBox"

const ProductList = (props) => {
   const { pageNumber = 1 } = useParams()
   const dispatch = useDispatch()

   const sellerMode = props.match.path.indexOf("/seller") >= 0
   const userSignin = useSelector((state) => state.userSignin)
   const { userInfo } = userSignin

   const productList = useSelector((state) => state.productList)
   const { loading, error, products, pages, page } = productList

   const productCreate = useSelector((state) => state.productCreate)
   const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: createdProduct,
   } = productCreate

   const productDelete = useSelector((state) => state.productDelete)
   const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
   } = productDelete

   useEffect(() => {
      if (successCreate) {
         dispatch({ type: PRODUCT_CREATE_RESET })
         if (sellerMode) {
            props.history.push(`/seller/${userInfo._id}`)
         } else {
            props.history.push(`/admin/productlist`)
         }
      }
      if (successDelete) {
         dispatch({ type: PRODUCT_DELETE_RESET })
      }
      dispatch(
         listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
      )
   }, [
      dispatch,
      successCreate,
      createdProduct,
      successDelete,
      props.history,
      sellerMode,
      userInfo._id,
      pageNumber,
   ])

   const createHandler = () => {
      dispatch(createProduct())
   }

   const deleteHandler = (product) => {
      if (window.confirm("Are you sure to delete?")) {
         dispatch(deleteProduct(product._id))
      }
   }

   return (
      <div>
         <div className="row">
            <h1>Product</h1>
            <button type="button" className="primary" onClick={createHandler}>
               Create Product
            </button>
         </div>
         {loadingDelete && <LoadingBox></LoadingBox>}
         {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
         )}

         {loadingCreate && <LoadingBox></LoadingBox>}
         {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
         )}

         {loading ? (
            <LoadingBox />
         ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
         ) : (
            <>
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
                     {products.map((product) => (
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
                                 onClick={() =>
                                    props.history.push(
                                       `/admin/product/${product._id}/edit`
                                    )
                                 }
                              >
                                 Edit
                              </button>
                              <button
                                 type="button"
                                 className="small"
                                 onClick={() => deleteHandler(product)}
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
               <div className="row center pagination">
                  {[...Array(pages).keys()].map((x) => (
                     <Link
                        className={x + 1 === page ? "active" : ""}
                        key={x + 1}
                        to={`/admin/productlist/pageNumber/${x + 1}`}
                     >
                        {x + 1}
                     </Link>
                  ))}
               </div>
            </>
         )}
      </div>
   )
}

export default ProductList
