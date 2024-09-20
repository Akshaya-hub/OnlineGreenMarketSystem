// src/components/Navbar.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotalQuantity, getTotals } from '../features/slice/cartSlice';
import SearchBar from './SearchBar';

const Navbar = ({ click }) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(getCartTotalQuantity);

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch]);

  return (
    <nav className='navbar'>
      <div className="navbar-logo">
        <Link to="/"><h2>Shopping Cart</h2></Link>
      </div>
      <SearchBar />
      <ul className="navbar-links">
        <li>
          <Link to="/cart" className='cart-link'>
            <i className='fas fa-shopping-cart'></i>
            <span>
              Cart
              <span className='cartlogo-badge'>{cartQuantity}</span>
            </span>
          </Link>
        </li>
      </ul>
      <div className="hamburger-menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
