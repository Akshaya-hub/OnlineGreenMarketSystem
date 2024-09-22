import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartItems, getCartTotal } from '../features/slice/cartSlice';


const CheckoutScreen = () => {
  const cartItems = useSelector(getCartItems);
  const cartTotalAmount = useSelector(getCartTotal);
  
  // Dummy discount amount
  const discountAmount = 10; // Replace with actual logic to get discount
  const totalAmount = cartTotalAmount - discountAmount;

  return (
    <div className="checkoutscreen">
      <div className="checkoutscreen-box">
        {cartItems.map(item => (
          <div key={item._id} className="checkoutscreen-box-item">
            <div className="checkoutscreen-box-item-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="checkoutscreen-box-item-info">
              <p className="checkoutscreen-box-item-name">{item.description}</p>
              <p>{item.description}</p>
              <p className="checkoutscreen-box-item-price">${item.price}</p>
            </div>
            <div className="checkoutscreen-box-item-quantity">
              <p>Qty: {item.cartQuantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkoutscreen-summary">
        <p>Subtotal: <span>${cartTotalAmount.toFixed(2)}</span></p>
        <p>Discount: <span>${discountAmount.toFixed(2)}</span></p>
        <p>Total: <span>${totalAmount.toFixed(2)}</span></p>
        <div className="checkoutscreen-buttons">
        <Link to="/package">
          <button className="checkoutscreen-button">Package Option</button>
        </Link>
          <button className="checkoutscreen-button">Confirm Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
