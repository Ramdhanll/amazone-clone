import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { listProducts } from "../../redux/index"
import Products from "../Product/Product"
import LoadingBox from "../utils/LoadingBox"
import MessageBox from "../utils/MessageBox"

const Search = () => {
   const dispatch = useDispatch()
   const { name = "all" } = useParams()
   const productList = useSelector((state) => state.productList)
   const { loading, error, products } = productList

   useEffect(() => {
      dispatch(listProducts({ name: name !== "all" ? name : "" }))
   }, [dispatch, name])

   return (
      <div>
         <div className="row">
            {loading ? (
               <LoadingBox />
            ) : error ? (
               <MessageBox variant="danger">{error}</MessageBox>
            ) : (
               <div>{products.length} Results</div>
            )}
         </div>
         <div className="row top">
            <div className="col-1">
               <h3>Department</h3>
               <ul>
                  <li>Category 1</li>
               </ul>
            </div>
            <div className="col-3">
               {loading ? (
                  <LoadingBox />
               ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
               ) : (
                  <>
                     {products.length === 0 && (
                        <MessageBox>No Product Found</MessageBox>
                     )}
                     <div className="row center">
                        {products.map((product) => (
                           <Products key={product._id} product={product} />
                        ))}
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   )
}

export default Search
