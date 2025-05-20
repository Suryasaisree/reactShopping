import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const initialCart = location.state?.cart || JSON.parse(localStorage.getItem('cartItems')) || [];

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity = (newCart[index].quantity || 1) + 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    const currentQty = newCart[index].quantity || 1;
    if (currentQty > 1) {
      newCart[index].quantity = currentQty - 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const handleRemove = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No items in the cart.</p>
      ) : (
        cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <div className="cart-item-left">
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrease(index)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => handleIncrease(index)}>+</button>
                </div>
              </div>
            </div>
            <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;