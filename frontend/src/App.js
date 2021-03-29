import React, { useEffect, useState } from "react"
import { BrowserRouter, Link, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { signout } from "./redux"
import {
   Home,
   ProductDetail,
   Cart,
   Signin,
   Register,
   Shipping,
   Payment,
   PlaceOrder,
   Order,
   OrderHistory,
   Profile,
   PrivateRoute,
   AdminProductEdit,
   AdminProductList,
   AdminRoute,
   AdminOrderList,
   AdminUserList,
   AdminUserEdit,
   SellerRoute,
   Seller,
   SellerProductList,
   SellerOrderList,
   Map,
   Search,
} from "./components"
import SearchBox from "./components/utils/SearchBox"
import { listProductCategories } from "./redux/index"
import LoadingBox from "./components/utils/LoadingBox"
import MessageBox from "./components/utils/MessageBox"

const App = () => {
   const dispatch = useDispatch()
   const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

   const cart = useSelector((state) => state.cart)
   const { cartItems } = cart

   const userSignin = useSelector((state) => state.userSignin)
   const { userInfo } = userSignin

   const productCategoryList = useSelector((state) => state.productCategoryList)
   const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
   } = productCategoryList

   const signoutHandler = (e) => {
      dispatch(signout())
   }

   useEffect(() => {
      dispatch(listProductCategories())
   }, [])

   return (
      <BrowserRouter>
         <div className="grid-container">
            <header className="row">
               <div>
                  <button
                     type="button"
                     className="open-sidebar"
                     onClick={() => setSidebarIsOpen(true)}
                  >
                     <i className="fa fa-bars"></i>
                  </button>
                  <Link className="brand" to="/">
                     amazone
                  </Link>
               </div>
               <div>
                  <Route
                     render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                     )}
                  />
               </div>
               <div>
                  <Link to="/cart">
                     Cart{" "}
                     {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                     )}
                  </Link>

                  {userInfo ? (
                     <div className="dropdown">
                        <Link to="#">
                           {userInfo.name}
                           <i className="fa fa-caret-down"></i>
                        </Link>

                        <ul className="dropdown-content">
                           <li>
                              <Link to="/profile">Profile</Link>
                           </li>
                           <li>
                              <Link to="/orderHistory">Order History</Link>
                           </li>
                           <li>
                              <Link to="#signout" onClick={signoutHandler}>
                                 Sign Out
                              </Link>
                           </li>
                        </ul>
                     </div>
                  ) : (
                     <Link to="/signin">Sign In</Link>
                  )}

                  {userInfo && userInfo.isSeller && (
                     <div className="dropdown">
                        <Link to="#admin">
                           Seller <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                           <li>
                              <Link to={`/seller/${userInfo._id}/productlist`}>
                                 Products
                              </Link>
                           </li>
                           <li>
                              <Link to={`/seller/${userInfo._id}/orderlist`}>
                                 Orders
                              </Link>
                           </li>
                        </ul>
                     </div>
                  )}

                  {userInfo && userInfo.isAdmin && (
                     <div className="dropdown">
                        <Link to="#admin">
                           Admin <i className="fa fa-caret-down"></i>{" "}
                        </Link>
                        <ul className="dropdown-content">
                           <li>
                              <Link to="/admin/dashboard">Dashboard</Link>
                           </li>
                           <li>
                              <Link to="/admin/productlist">Products</Link>
                           </li>
                           <li>
                              <Link to="/admin/orderlist">Orders</Link>
                           </li>
                           <li>
                              <Link to="/admin/userlist">Users</Link>
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
            </header>
            <aside className={sidebarIsOpen ? "open" : ""}>
               <ul className="categories">
                  <li>
                     <strong>Categories</strong>
                     <button
                        onClick={() => setSidebarIsOpen(false)}
                        className="close-sidebar"
                        type="button"
                     >
                        <i className="fa fa-close"></i>
                     </button>
                  </li>
                  {loadingCategories ? (
                     <LoadingBox></LoadingBox>
                  ) : errorCategories ? (
                     <MessageBox variant="danger">{errorCategories}</MessageBox>
                  ) : (
                     categories.map((c) => (
                        <li key={c}>
                           <Link
                              to={`/search/category/${c}`}
                              onClick={() => setSidebarIsOpen(false)}
                           >
                              {c}
                           </Link>
                        </li>
                     ))
                  )}
               </ul>
            </aside>
            <main>
               <Route path="/signin" component={Signin}></Route>
               <Route path="/register" component={Register}></Route>
               <Route path="/" component={Home} exact></Route>
               <Route
                  path="/product/:id"
                  component={ProductDetail}
                  exact
               ></Route>
               <Route path="/cart/:id?" component={Cart}></Route>
               <Route path="/shipping" component={Shipping}></Route>
               <Route path="/payment" component={Payment}></Route>
               <Route path="/placeorder" component={PlaceOrder}></Route>
               <Route path="/order/:id" component={Order}></Route>
               <Route path="/orderHistory" component={OrderHistory}></Route>
               <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
               <PrivateRoute path="/map" component={Map}></PrivateRoute>
               <AdminRoute
                  path="/admin/productlist"
                  component={AdminProductList}
               ></AdminRoute>
               <AdminRoute
                  path="/admin/product/:id/edit"
                  component={AdminProductEdit}
               ></AdminRoute>
               <AdminRoute
                  path="/admin/orderlist"
                  component={AdminOrderList}
               ></AdminRoute>
               <AdminRoute
                  path="/admin/userlist"
                  component={AdminUserList}
               ></AdminRoute>
               <AdminRoute
                  path="/admin/user/:id/edit"
                  component={AdminUserEdit}
               ></AdminRoute>
               <Route path="/seller/:id" component={Seller} exact></Route>
               <SellerRoute
                  path="/seller/:id/productlist"
                  component={SellerProductList}
               ></SellerRoute>
               <SellerRoute
                  path="/seller/:id/orderlist"
                  component={SellerOrderList}
               ></SellerRoute>
               <Route path="/search/name/:name?" component={Search} exact />
               <Route
                  path="/search/category/:category?"
                  component={Search}
                  exact
               />
               <Route
                  path="/search/category/:category/name/:name?"
                  component={Search}
                  exact
               />
               <Route
                  path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order"
                  component={Search}
                  exact
               />
            </main>
            <footer className="row center">All right reserved</footer>
         </div>
      </BrowserRouter>
   )
}

export default App
