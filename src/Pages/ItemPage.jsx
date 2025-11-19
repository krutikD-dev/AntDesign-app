import React, { useEffect, useState } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { Row, Col, Card, Button, Spin, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/CartSlice";
import "./ItemPage.css";
const baseURL = import.meta.env.VITE_API_URL;


const { Title } = Typography;

function ItemPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/products/category/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
        console.log(`Redirected to the ${categoryName} page`)
      })
      .catch((err) => {
        console.error("Error fetching category data:", err);
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  if (loading)
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="item-page-container">
      <Title level={2} className="item-page-title">
        {categoryName.toUpperCase()}
      </Title>

      <Row gutter={[24, 24]}>
        {products.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              hoverable
              className="item-card"
              onClick={() => navigate(`/products/${item.id}`)}
              cover={
                <img
                  alt={item.title}
                  src={item.thumbnail}
                  className="item-image"
                />
              }
            >
              <h2 className="item-name">{item.title}</h2>
              <p className="item-price">${item.price}</p>
              <p className="item-desc">{item.description}</p>

              <Button
                type="primary"
                block
                icon={<ShoppingCartOutlined />}
                onClick={(e) => handleAddToCart(item, e)}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ItemPage;
