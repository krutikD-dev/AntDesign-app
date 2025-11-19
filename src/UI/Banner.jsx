import React from 'react'
import './Banner.css'
import { Button } from 'antd'
import {  useNavigate } from 'react-router-dom';

function Banner() {
    const navigate = useNavigate()
  return (
    <>
        <div className="banner-card">
          <div className="card">
            <img src="https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp" className='img-res' alt="" />
            <div className="overlay">
             <div className="text-container">
               <div className='primary-txt'>NEW SEASON</div>
              <h2 className='bold-heading'>The Style Update</h2>
              <p className='new-season-desc'>Discover the latest trends in fashion and refresh your wardrobe with our newest collection.</p>
              <Button type="primary" className='btn-text' onClick={()=>{ navigate(`/category/mens-shirts`)}}>Shop Collection</Button>
             </div>
            </div>
          </div>
          <div className="cards-container">
            <div className="card-a" onClick={()=>{ navigate(`/category/Laptops`)}}>
                <img src="https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp" alt="laptop" />
                <div className="overlay"><span className='banner-txt-container'><h3 className='banner-card-txt'>Tech Deals</h3><span className='banner-card-desc'>Save up to 30%</span></span></div>
            </div>
             <div className="card-a" onClick={()=>{ navigate(`/category/furniture`)}}>
                <img src="https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/3.webp"  alt="furniture" />
                <div className="overlay"><span className='banner-txt-container'><h3 className='banner-card-txt'>Home Essentials</h3><span className='banner-card-desc'>Elevate your space</span></span></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Banner