import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductItem from './components/ProductItem';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <h2>Stripe Webbshop <Cart /></h2>
      <Login />
      <Register />
      <ProductList />
      <ProductItem />
    </div>
  );
}

export default App;
