import React, { useState, useEffect } from 'react';
import './Home.css';
import Banner from '../UI/Banner';
// import CategoryCards from '../UI/CategoryCards.jsx';
import ItemCard from '../UI/ItemCard.jsx';
import CategorySection from '../UI/CategorySection.jsx';
const baseURL = import.meta.env.VITE_API_URL;


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("products");

    if (cachedData) {
      setProducts(JSON.parse(cachedData));
      return;
    }

    fetch(`${baseURL}/products?limit=100`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        localStorage.setItem("products", JSON.stringify(data.products));
        console.log('fetched')
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  let category = [
    ...new Map(products.map((item) => [item.category, item])).values()
  ].slice(7);

  const newArrivals = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
  return (
    <div className="Banner-container">
      <Banner />
      {/* <h2 className="category-heading">Shop By Category</h2> */}
      {/* <CategoryCards data={category} /> */}
      <CategorySection/>
      <h2 className="category-heading">New Arrival</h2>
      <div className="ItemCards-container">
        {newArrivals.map((item, index) => (
          <ItemCard key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
