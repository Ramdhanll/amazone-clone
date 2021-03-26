import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { listProducts } from "../../redux/index"
import Products from "../Product/Product"
import LoadingBox from "../utils/LoadingBox"
import MessageBox from "../utils/MessageBox"

const Search = () => {
   const dispatch = useDispatch()
   const { name = "all", category = "all" } = useParams()

   const productList = useSelector((state) => state.productList)
   const { loading, error, products } = productList

   const productCategoryList = useSelector((state) => state.productCategoryList)
   const {
      loading: loadingCategory,
      error: errorCategory,
      categories,
   } = productCategoryList

   useEffect(() => {
      dispatch(
         listProducts({
            name: name !== "all" ? name : "",
            category: category !== "all" ? category : "",
         })
      )
   }, [dispatch, name, category])

   const getFilterURL = (filter) => {
      const filterCategory = filter.category || category
      const filterName = filter.name || name
      return `/search/category/${filterCategory}/name/${filterName}`
   }

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
               {loadingCategory ? (
                  <LoadingBox />
               ) : errorCategory ? (
                  <MessageBox variant="danger">{errorCategory}</MessageBox>
               ) : (
                  <ul>
                     {categories.map((c) => (
                        <li key={c}>
                           <Link
                              className={c === category ? "active" : ""}
                              to={getFilterURL({ category: c })}
                           >
                              {c}
                           </Link>
                        </li>
                     ))}
                  </ul>
               )}
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
