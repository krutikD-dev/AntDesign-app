import React, { useEffect, useState } from "react";
import { CheckCircleFilled, LoadingOutlined } from "@ant-design/icons";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  const navigate = useNavigate()

  const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2); // add 2 days
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


  if (loading) {
    return (
      <div className="loader-wrapper">
        <LoadingOutlined className="spinner" />
        <p className="loading-text">Processing your order...</p>
      </div>
    );
  }

  return (
    <div className="order-confirm-wrapper fade-in">
      <div className="order-confirm-card">
        
        <div className="icon-wrapper">
          <CheckCircleFilled className="success-icon" />
        </div>

        <h2 className="order-title">Order Confirmed!</h2>
        <p className="order-subtext">
          Thank you for your purchase! We’ve sent a confirmation and receipt to your email.
        </p>

        <hr className="divider" />

        <div className="order-info">
          <div>
            <p className="label">Order Number</p>
            <p className="value">#123-ABC-456</p>
          </div>
          <div>
            <p className="label">Estimated Delivery</p>
            <p className="value">{getEstimatedDelivery()}</p>

          </div>
        </div>

        <div className="btn-group">
          <button className="track-btn">Track Order</button>
          <button className="details-btn">View Order Details</button>
        </div>

        <button className="continue-link" onClick={()=>navigate(`/`)}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
