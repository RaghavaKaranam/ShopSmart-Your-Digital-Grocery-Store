import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';

function Products() {
  const [products, setProducts] = useState({});
  const [activeCategory, setActiveCategory] = useState('');
  const [activeSub, setActiveSub] = useState('');
  const { addToCart } = useCart();
  const [popup, setPopup] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(res => {
        const grouped = {};
        res.data.forEach(p => {
          if (!p.Image_Url || p.Image_Url.includes('undefined')) return;
          if (!grouped[p.Category]) grouped[p.Category] = {};
          if (!grouped[p.Category][p.SubCategory]) grouped[p.Category][p.SubCategory] = [];
          if (grouped[p.Category][p.SubCategory].length < 10) {
            grouped[p.Category][p.SubCategory].push(p);
          }
        });

        setProducts(grouped);
        const firstCategory = Object.keys(grouped)[0];
        const firstSub = firstCategory && Object.keys(grouped[firstCategory])[0];
        setActiveCategory(firstCategory);
        setActiveSub(firstSub);
      })
      .catch(err => console.log(err));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopup(`${product.title} added to cart!`);
    setTimeout(() => setPopup(''), 2000);
  };

  return (
    <div className="product-page">
      {popup && <div className="cart-popup">{popup}</div>}

      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {Object.keys(products).map(cat => (
            <li key={cat}>
              <button
                className={activeCategory === cat ? 'active' : ''}
                onClick={() => {
                  setActiveCategory(cat);
                  const firstSub = Object.keys(products[cat])[0];
                  setActiveSub(firstSub);
                }}
              >
                {cat}
              </button>
              {activeCategory === cat && (
                <ul className="subcats">
                  {Object.keys(products[cat]).map(sub => (
                    <li key={sub}>
                      <button
                        className={activeSub === sub ? 'active-sub' : ''}
                        onClick={() => setActiveSub(sub)}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="product-grid">
        {activeCategory && activeSub && products[activeCategory][activeSub] ? (
          products[activeCategory][activeSub].map((p, i) => (
            <div key={i} className="product-card" title={p.ProductName}>
              <img src={p.Image_Url} alt={p.ProductName} />
              <h4>{p.ProductName}</h4>
              <p>{p.Quantity}</p>
              <p className="price">₹{p.Price}</p>
              <div className="card-buttons">
                <button type='button'
                  onClick={() =>
                    handleAddToCart({
                      id: p._id,
                      title: p.ProductName,
                      price: p.Price,
                      image: p.Image_Url,
                    })
                  }
                >
                  Add to Cart
                </button>
                <Link to="/checkout">
                  <button>Checkout</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="placeholder-msg">No products to show.</p>
        )}
      </main>
    </div>
  );
}

export default Products;
