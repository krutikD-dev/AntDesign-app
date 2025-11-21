import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "./CategorySection.css";

import Electronics from "../assets/Electronics.png";
import Groceries from "../assets/Groceries.png";
import Beauty from "../assets/lipstick.png";
import Fragrances from "../assets/Fragrance.png";
import Furniture from "../assets/furniture.png";
import Laptops from "../assets/Laptop.png";
import Smartphones from "../assets/SmartPhone.png";
import Shoes from "../assets/Shoes.png";
import Man from "../assets/Man.png"
import Kitchen from '../assets/KitchenAccessories.png'
import HomeDecor from '../assets/HomeDecor.png'
import {useNavigate} from "react-router-dom";
import api from "../app/Api";
import { useDispatch,useSelector  } from "react-redux";
import {fetchCategories} from '../app/ProductSlice'


const ICONS = {
  electronics: Electronics,
  groceries: Groceries,
  beauty: Beauty,
  fragrances: Fragrances,
  furniture: Furniture,
  laptops: Laptops,
  smartphones: Smartphones,
  shoes: Shoes,
  "mens-shirts": Man,
  "kitchen-accessories": Kitchen,
  "home-decoration": HomeDecor
};

function CategorySection() {
  const baseURL = import.meta.env.VITE_API_URL;

  // const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, categoryStatus } = useSelector((s) => s.products);

  useEffect(() => {
     dispatch(fetchCategories());
  }, []);


//   useEffect(() => {
//   // fetch(`${baseURL}/products/categories`)
//   //   .then((res) => res.json())

//       api.get(`products/categories`)
//     .then((res) => {
//       const clean = res.data.map(cat => {
//        return cat?.slug 
//     });
//       setCategories(clean);
//       setLoading(false);
//     })
//     .catch((err) => console.error(err));
// }, []); 


  if (categoryStatus)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
    // console.log(categories)
  return (
    <div className="category-wrapper">
  <h2 className="category-title">Shop by Category</h2>

  <div className="categories-grid">
    {categories.slice(0, 8).map((cat, index) => {

  return (
    <div className="category-card" onClick={() => navigate(`/category/${cat}`)} key={index}>
      <div className="circle">
        <img
          src={ICONS[cat.toLowerCase()] || Electronics}
          alt={cat}
          className="category-icon"
        />
      </div>
      <p className="category-name">{cat.replace("-", " ")}</p>
    </div>
  );
})}

  </div>
</div>


  );
}

export default CategorySection;
