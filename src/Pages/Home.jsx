import React, { useState, useEffect } from 'react';
import './Home.css';
import Banner from '../UI/Banner';
// import CategoryCards from '../UI/CategoryCards.jsx';
import CategorySection from '../UI/CategorySection.jsx';
import api from '../app/Api.js';
import { Spin} from "antd";

import Cards from '../UI/Cards.jsx';
import { useDispatch,useSelector } from 'react-redux';
import { fetchProducts } from "../app/ProductSlice.js";

const baseURL = import.meta.env.VITE_API_URL;


function Home() {
  // const [products, setProducts] = useState([]);
    const { products, status } = useSelector((state) => state.products);

//   useEffect(() => {
//   const cachedData = localStorage.getItem("products");

//   if (cachedData) {
//     setProducts(JSON.parse(cachedData));
//     return;
//   }

//   api.get("/products", { params: { limit: 50 } })
//     .then((res) => {
//       const products = res.data.products;
//       setProducts(products);
//       localStorage.setItem("products", JSON.stringify(products));
//       // console.log("fetched");
//     })
//     .catch((err) => {
//       console.error("Error fetching products:", err);
//     });
// }, []);

  const dispatch= useDispatch()
   useEffect(() => {
      dispatch(fetchProducts());
          document.title = `Swift- WebStore`;
  }, []); 

  const newArrivals = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

if (status)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  return (
    <div className="Banner-container">
      <Banner />
      <CategorySection/>
      <h2 className="category-heading">New Arrival</h2>
      <div className="ItemCards-container">
        <Cards products={newArrivals}/>
      </div>
    </div>
  );
}

export default Home;
