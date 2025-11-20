import React from 'react'
import { Row, Col,Card as DefCard, Button,Spin} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/CartSlice";



function Card({item}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = (item, e) => {
        e.stopPropagation();
        dispatch(addToCart(item));
      };

  return (
    <>
    <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                        <DefCard
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
                        </DefCard>
                    </Col>
    </>
  )
}

export default Card