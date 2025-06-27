import React from 'react';
import { useCart } from '../../CartContext/CartContext';
import './Cart.css';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={item.image} alt={item.title} />
                <div className="cart-details">
                  <h4>{item.title}</h4>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.productId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
            <button onClick={clearCart} className="clear-btn">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
