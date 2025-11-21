import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, Button, Rate, Badge, Spin, Tabs, InputNumber } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/CartSlice";
import {fetchProductById} from '../app/ProductSlice'
import api from '../app/Api'
import "./ProductDetails.css";
const baseURL = import.meta.env.VITE_API_URL;


const ProductDetails = () => {
  // const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, productStatus } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

//   useEffect(() => {
//   if (!id) return;

//   setLoading(true);
  
  
//   api.get(`/products/${id}`)
//   .then((res) => {
//     setProduct(res.data);
//       // console.log(`Redirected to the ${res?.data?.title} description page`);
//     })
//     .catch((err) => {
//       console.error("Error fetching product:", err);
//     })
//     .finally(() => setLoading(false));
// }, [id]);


  

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  if (productStatus)  
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );

  if (!product) return <div className="no-product">Product not found.</div>;

  const oldPrice = product.price / (1 - product.discountPercentage / 100);
  const reviews = product.reviews || [];

  return (
    <div className="product-details-container">
      <div className="product-card">
        <Image.PreviewGroup>
  <div className="product-left">
    <Image
      src={product.images[0]}
      alt={product.title}
      className="main-image"
      preview={true}
    />

    <div className="thumbnail-row">
      {product.images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="thumbnail"
          className="thumbnail-img"
          preview={true}              
        />
      ))}
    </div>
  </div>
        </Image.PreviewGroup>



        <div className="product-right">
          <h1 className="product-title">{product.title}</h1>

          <div className="rating-section">
            <Rate disabled defaultValue={product.rating} allowHalf />
            {/* <span className="rating-text">({product.rating} / 5)</span> */}
            <span className="rating-text">({product.reviews.length} reviews)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="price-section">
            <h2 className="price">${product.price.toFixed(2)}</h2>
            <span className="old-price">${oldPrice.toFixed(2)}</span>
            <Badge
              count={`${product.discountPercentage}% OFF`}
              className="discount-badge"
            />
          </div>

          <div className="quantity-section">
            <span>Quantity:</span>
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(val) => setQuantity(val)}
            />
          </div>
          <div className="action-buttons">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              className="btn-long"
            >
              Add to Cart
            </Button>
            <Button shape="circle" icon={<HeartOutlined />} size="large" />
          </div>

        </div>
      </div>

      <div className="tabs-section">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Description",
              children: (
                <div className="tab-content">{product.description}</div>
              ),
            },
            {
              key: "2",
              label: "Specifications",
              children: (
                <ul className="spec-list">
                  <li><span className="bold">Category</span>: {product.category}</li>
                  <li><span className="bold">Stock</span>: {product.stock}</li>
                  <li><span className="bold">Brand</span>: {product.brand}</li>
                </ul>
              ),
            },
            {
              key: "3",
              label: "Reviews",
              children:(<div className="reviews-container">
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-header">
              <strong>{r.reviewerName}</strong>
            <span className="review-date">
              {new Date(r.date).toLocaleDateString()}
            </span>
            </div>
              <Rate disabled defaultValue={r.rating} />
            <p className="review-comment">{r.comment}</p>
          </div>
        ))
      )}
    </div>),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
