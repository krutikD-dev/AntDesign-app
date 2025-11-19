import React from 'react'
import './ItemCard.css'
import { Button, Card, Typography } from 'antd'
import { ShoppingCartOutlined } from "@ant-design/icons";
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../app/CartSlice";



function ItemCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleAddToCart = (item, event)=>{
    event.stopPropagation();
      dispatch(addToCart(item));
  }
  return (
    <div className="card2" key={data.id} onClick={() => { navigate(`/products/${data.id}`) }}>
      <img src={data?.thumbnail} className='img-res' alt={data?.thumbnail} />
      <div className="item-detail">
        <h2 className='item-name'>{data.title}</h2>
        <p className='item-desc2'>{data.description}</p>
        <span className='item-price'>$ {data.price}</span>
        <Button
          type="primary"
          block
          icon={<ShoppingCartOutlined />}
          className='cart-btn'
          onClick={(e)=>handleAddToCart(data,e)}
        >
          Add to Cart
        </Button>      
      </div>
    </div>

  )
}

export default ItemCard