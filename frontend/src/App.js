import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Home, ProductDetail, Cart } from './components'
import { useSelector } from 'react-redux'

const App = () => {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

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
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductDetail}></Route>
          <Route path="/" component={Home} exact></Route>
          <Route path="/cart/:id?" component={Cart}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
