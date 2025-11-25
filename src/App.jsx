import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from './Pages/ItemPage';
import CartPage from './Pages/CartPage';
import { Provider } from "react-redux";
import store from "./app/Store";
import NotFound from './Pages/NotFound';
import CheckoutPage from './Pages/CheckoutPage';
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:categoryName" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
      <ToastContainer />
    </>
  )
}

export default App
