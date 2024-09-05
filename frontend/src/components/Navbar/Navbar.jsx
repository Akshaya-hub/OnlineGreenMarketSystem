import React from 'react'
import './Navbar.css'
import { assests } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assests.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>products</li>
        <li>AboutUs</li>
        <li>Customer Service</li>
      </ul>
      <div class="navbar-right">
  <img src={assests.search} alt="" className="search" />
  <div className="navbar-search-icon">
    <img src={assests.basket_icon} alt="" className="basket" />
    <div className="dot"></div>
    <button>Sign in</button>
  </div>
</div>
</div>
    
  )
}

export default Navbar