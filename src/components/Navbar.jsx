import React, { useState } from "react";
import { Layout, Menu, Input, Button, Space, Badge } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../../public/logo2.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import Search from "../UI/Search";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const menuItems = [
    // { key: "/", label: <Link to="/">Home</Link> },
    // { key: "/shop", label: <Link to="/shop">Shop</Link> },
  ];

  return (
    <Header className="Navbar">
      <div className="logo-section" onClick={()=>navigate(`/`)}>
        <img src={logo} alt="ShopSwift Logo" />
        <span className="brand-name">ShopSwift</span>
      </div>

      <Menu
        theme="light"
        mode="horizontal"
        items={menuItems}
        selectedKeys={[location.pathname]}
        className="navbar-menu"
      />

      <Space size="large" className="navbar-actions">
        {/* <Input
          prefix={<SearchOutlined className="search-icon" />}
          placeholder="Search products..."
          className="search-input"
        /> */}
        <Search className="search-input"/>

        <Button
          shape="circle"
          size="large"
          icon={<HeartOutlined className="icon" />}
          className="icon-btn"
        />

        <Badge count={cartItems.length} offset={[0, 20]}>
          <Button
            shape="circle"
            size="large"
            onClick={() => navigate("/cart")}
            title="Cart"
            icon={<ShoppingCartOutlined className="icon" />}
            className="icon-btn"
          />
        </Badge>

        <Button
          shape="circle"
          size="large"
          icon={<UserOutlined className="icon" />}
          className="icon-btn"
        />
      </Space>
    </Header>
  );
};

export default Navbar;
