import React, { useEffect, useState } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { Spin, Typography } from "antd";
// import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import {fetchProductsByCategory} from '../app/ProductSlice'
// import { addToCart } from "../app/CartSlice";
import "./ItemPage.css";
import Cards from "../UI/Cards";
const baseURL = import.meta.env.VITE_API_URL;


const { Title } = Typography;

function ItemPage() {
  const { categoryName } = useParams();
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(categoryName));
  }, []);


  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${baseURL}/products/category/${categoryName}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.products || []);
  //       setLoading(false);
  //       // console.log(`Redirected to the ${categoryName} page`)
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching category data:", err);
  //       setLoading(false);
  //     });
  // }, [categoryName]);

  // const handleAddToCart = (item, e) => {
  //   e.stopPropagation();
  //   dispatch(addToCart(item));
  // };

  if (status)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );

  return (
    <>
    <div className="item-page-container">
      <Title level={2} className="item-page-title">
        {categoryName.toUpperCase()}
      </Title>

      <Cards products={products} />
    </div>
    </>
  );
}

export default ItemPage;
