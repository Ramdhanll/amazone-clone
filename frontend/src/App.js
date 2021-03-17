import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from './redux'
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
  OrderHistory
} from './components'

const App = () => {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()

  const signoutHandler = e => {
    dispatch(signout())
  }

  return (
    <BrowserRouter>    
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">amazone</Link>
          </div>
          <div>
            <Link to="/cart">Cart {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}</Link>

            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                  
                  <ul className="dropdown-content">
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
              ) :
              <Link to="/signin">Sign In</Link>
            }

          </div>
        </header>
        <main>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={Home} exact></Route>
          <Route path="/product/:id" component={ProductDetail}></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/shipping" component={Shipping}></Route>
          <Route path="/payment" component={Payment}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>          
          <Route path="/order/:id" component={Order} ></Route>
          <Route path="/orderHistory" component={OrderHistory}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
