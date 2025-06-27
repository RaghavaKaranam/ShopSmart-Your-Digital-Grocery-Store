// src/User-module/components/home/Home.js
import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';

function Home() {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [popup, setPopup] = useState('');
  const { addToCart } = useCart();

  const popularCategories = [
    'Fruits and Vegetables', 'Beauty and Cosmetics', 'Bath Items',
    'Snacks', 'Fast Food', 'Beverages', 'Home Items', 'Food Items'
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        const data = res.data;
        const unique = new Set();
        const categoryMap = {};

        for (let product of data) {
          const key = `${product.ProductName}-${product.Category}-${product.SubCategory}`;
          if (unique.has(key)) continue;
          unique.add(key);

          if (!popularCategories.includes(product.Category)) continue;

          const groupKey = `${product.Category} > ${product.SubCategory}`;
          if (!categoryMap[groupKey]) categoryMap[groupKey] = [];

          if (categoryMap[groupKey].length < 10) {
            categoryMap[groupKey].push(product);
          }
        }

        setGroupedProducts(categoryMap);
      })
      .catch(err => console.log(err));
  }, []);

  const scrollLeft = (id) => {
    const ele = document.getElementById(`carousel-${id}`);
    if (ele) ele.scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    const ele = document.getElementById(`carousel-${id}`);
    if (ele) ele.scrollLeft += 300;
  };

  const handleAddToCart = async (p) => {
    const product = {
      id: p._id,
      title: p.ProductName,
      price: p.Price,
      image: p.Image_Url
    };

    await addToCart(product); // now handles DB and state update

    setPopup(`${p.ProductName} added to cart!`);
    setTimeout(() => setPopup(''), 2000);
  };

  return (
    <>
      <section id="productspace">
        <h2>HOME</h2>
        {popup && <div className="cart-popup">{popup}</div>}
        {Object.keys(groupedProducts).map((category, idx) => (
          <div key={idx} className="category-section">
            <h3>{category}</h3>
            <div className="carousel-container">
              <button className="scroll-btn left" onClick={() => scrollLeft(idx)}>&#10094;</button>
              <div className="carousel" id={`carousel-${idx}`}>
                {groupedProducts[category].map((p, i) => (
                  <div key={i} className="Products2" title={p.ProductName}>
                    <img src={p.Image_Url} alt={p.ProductName} />
                    <h2>{p.ProductName}</h2>
                    <p>{p.Quantity}</p>
                    <div className="price">₹{p.Price}</div>
                    <div className="card-buttons">
                      <button type="button" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                      <Link to="/checkout"><button type="button">Checkout</button></Link>
                    </div>
                  </div>
                ))}
              </div>
              <button className="scroll-btn right" onClick={() => scrollRight(idx)}>&#10095;</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Home;
