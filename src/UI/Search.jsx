import React, { useState, useEffect } from "react";
import { AutoComplete, Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './Search.css'
import api from "../app/Api";


function Search() {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.trim()) {
        fetchResults(searchText);
      } else {
        setOptions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSelect = (_, option) => {
    navigate(`/products/${option.id}`);
  };

  const fetchResults = async (query) => {
    setLoading(true);
    try {
      // const res = await fetch(`${baseURL}/products/search?q=${query}`);
      // const data = await res.json();

      const res = await api.get(`/products/search?q=${query}`);
      console.log(res)
      const formatted = res.data.products.map((item) => ({
        value: item.title,
        id: item.id,
        obj: item,
      }));

      setOptions(formatted);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // navigate(`/category/${searchText}`);   
    }
  };

  return (
    <div className="search-bar">
      <AutoComplete
        className="autoComplete"
        options={
          loading ? [{ label: <Spin size="small" />, value: "" }] : options
        }
        onSearch={(value) => setSearchText(value)}
        onSelect={handleSelect}
        placeholder="Search product..."
        allowClear={{ clearIcon: <CloseOutlined /> }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;
