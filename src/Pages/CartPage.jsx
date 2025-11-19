import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../app/CartSlice.js";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [triedApplying, setTriedApplying] = useState(false);

  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate()

  const handleQuantityChange = (id, value, title) => {
    if (value < 1) return;
    dispatch(updateQuantity({ id, quantity: value, title: title }));
  };

  const handleRemove = (id, title) => { 
    dispatch(removeFromCart({ id, title }));
  };

  const handleApplyDiscount = () => {
    setTriedApplying(true);

    if (discountCode.trim() === "SAVE10") {
      setDiscountApplied(true);
    } else {
      setDiscountApplied(false);
    }
  };


  const ProceedPayment = () => {
    dispatch(clearCart())
    navigate(`/checkout`)
  }


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity,0);
  const shipping = 5;
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-wrapper">
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Action</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="center-flex">
              <p className="empty-text">Your cart is empty.</p>
            </div>
          ) : (
            <div className="cart-table">
              {cartItems.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-product">
                    <img
                      src={item?.images[0]}
                      alt={item.title}
                      className="cart-image"
                    />
                    <p className="cart-product-name">{item.title}</p>
                  </div>

                  <div className="cart-price">${item.price.toFixed(2)}</div>

                  <div className="cart-quantity">
                    {/* <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1, item.title)
                      }
                      className="qty-btn"
                    >
                      -
                    </button> */}
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      max="10"
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value), item.title)
                      }
                    />
                    {/* <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1,item.title)
                      }
                      className="qty-btn"
                    >
                      +
                    </button> */}
                  </div>

                  <div className="cart-action">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id, item.title)}
                    >
                      <DeleteOutlined /> <span className="del-txt">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="discount-section">
            <label>Discount Code</label>
            <div className="discount-input">
              <input
                type="text"
                placeholder="Enter code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={handleApplyDiscount}>Apply</button>
            </div>

            {triedApplying && discountApplied && (
              <div className="discount-success">
                <CheckCircleOutlined /> Discount “SAVE10” applied!
              </div>
            )}

            {triedApplying && !discountApplied && (
              <div className="discount-error">
                <CheckCircleOutlined /> Not a valid code!
              </div>
            )}

          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="checkout-btn" onClick={ProceedPayment}>Proceed to Checkout</button>
          <p className="terms-text">
            By placing your order, you agree to our
            <a href="/terms"> Terms of Service </a>
            and
            <a href="/privacy"> Privacy Policy</a>.
          </p>
        </div>
      </div>

      <div className="review-sections">

        <div className="review-card">
          <div className="review-card-header">
            <h3>Shipping Info</h3>
            <button className="edit-btn">Edit</button>
          </div>

          <div className="review-body">
            <p className="bold">Digvijay Patil</p>

            <p>Bahiratwadi</p>
            <p>SB road, Pune, 411016</p>
            <p>India</p>

            <p className="shipping-type">Standard Shipping (Est. 3-5 days)</p>
          </div>
        </div>


        <div className="review-card">
          <div className="review-card-header">
            <h3>Payment Method</h3>
            <button className="edit-btn">Edit</button>
          </div>

          <div className="review-body">
            <p className="bold">Visa ending in 42432</p>

            <p>Cardholder: Digvijay Patil</p>
            <p>Billing address same as shipping</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CartPage;
