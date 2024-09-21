import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, getCartTotalQuantity, getCartTotal, removeFromCart, addToCart, decreaseCart } from '../features/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(getCartItems);
  const totalQuantity = useSelector(getCartTotalQuantity);
  const cartTotalAmount = useSelector(getCartTotal);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(() => {
    
  }, [cartItems, dispatch]);

  const handleAddToCart = (item) => {
    if (item.cartQuantity < item.quantity) {
      dispatch(addToCart(item));
    } else {
      setError('Cannot add more than available stock');
      setTimeout(() => setError(''), 3000); 
    }
  };

  const removeHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  const decrementQuantity = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleCheckout = async () => {
    setIsLoading(true);  
    try {
      const response = await fetch('http://localhost:8000/api/cartItems/checkout', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems, 
          totalAmount: cartTotalAmount, 
          totalQuantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to complete checkout');
      }
  
      const data = await response.json();
      
      navigate('/checkout', { state: { data } });
    } catch (error) {
      setError('Checkout failed. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };
  

  return (
    <div className='cartscreen'>
      {error && <div className='error-message'>{error}</div>}
      <div className="cartscreen-top">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Add Products to your cart!</Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td className='product-image'>
                    <img src={item.imageUrl} alt={item.name} />
                    <div className='product-name'>
                      <h5>{item.name}</h5>
                      <h5>{item.description}</h5>
                      <button className='remove-btn' onClick={() => removeHandler(item)}>Remove</button>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className='quantity-controls-button'>
                      <button className='quantity-controls' onClick={() => decrementQuantity(item)}>-</button>
                      {item.cartQuantity}
                      <button className='quantity-controls' onClick={() => handleAddToCart(item)}>+</button>
                    </div>
                  </td>
                  <td>${(item.price * item.cartQuantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="cartscreen-bottom">
        <div className="cartscreen-info">
          <p>Subtotal ({totalQuantity} items):</p>
          <p>${cartTotalAmount.toFixed(2)}</p>
        </div>
        <div>
          <button onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
