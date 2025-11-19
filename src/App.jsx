import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ItemPage from './Pages/ItemPage';
import CartPage from './Pages/CartPage';
import { Provider } from "react-redux";
import store from "./app/Store";
import NotFound from './Pages/NotFound';
import CheckoutPage from './Pages/CheckoutPage';
import { ToastContainer,toast } from 'react-toastify';


function App() {
  


  return (
    <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route key={1} path="/" element={<Home/>} />
          <Route key={6} path="/checkout" element={<CheckoutPage />} />
          <Route key={2} path="/category/:categoryName" element={<ItemPage/>} />
          <Route key={4} path="/cart" element={<CartPage />} />
          <Route key={3} path="/products/:id" element={<ProductDetails />} />
          <Route key={5} path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
      </Router>
      </Provider>
      <ToastContainer/>
    </>
  )
}

export default App
