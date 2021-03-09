import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import { Home, ProductDetail, Cart } from './components'

const App = () => {
  return (
    <BrowserRouter>    
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">amazone</Link>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/signin">Sign In</a>
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
