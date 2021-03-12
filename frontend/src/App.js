import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Home, ProductDetail, Cart, Signin, Register, Shipping } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from './redux'

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
                  <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i> </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
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
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
