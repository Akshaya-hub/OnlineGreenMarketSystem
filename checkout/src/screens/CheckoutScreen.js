import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartItems, getCartTotal } from '../features/slice/cartSlice';


const CheckoutScreen = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount,setDiscount] = useState('')
  const applyCoupon =()=>{
    if(couponCode === 'PR15' )
    {
      setDiscount(0.10)
    }
    else
      return null;

  }

  
  
  const cartItems = useSelector(getCartItems);
  const cartTotalAmount = useSelector(getCartTotal);
  const totalAmount = cartTotalAmount - (cartTotalAmount*discount);

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
      <div className="checkoutscreen-summary">
      <p>Subtotal: <span>${cartTotalAmount.toFixed(2)}</span></p>
      </div>
        { cartTotalAmount > 50000 && (

        <div className='checkoutscreen-coupon'>
          
        <input
          className='checkoutscreen-textbox'
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          />
        <button onClick={applyCoupon} className='checkoutscreen-button'>Apply Coupon</button>
        </div>
        )}
        <p>Total: <span>${totalAmount.toFixed(2)}</span></p>
        <div className="checkoutscreen-buttons">
          <button className="checkoutscreen-button">Confirm Order</button>
          <button className="checkoutscreen-button">Package Option</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
