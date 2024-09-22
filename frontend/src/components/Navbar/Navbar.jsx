import './Navbar.css'
import { useState } from 'react';
import logo from '../assets/logo.png'
import search from '../assets/search.png'
import basket_icon from '../assets/basket_icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const[menu, setMenu] = useState("home");
  return (
    <div className='navbar'>
        <img src={logo} alt="" id="logo" />
        <ul className="navbar-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu === "home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("products")}}><Link style={{textDecoration: 'none'}} to='/products'>products</Link>{menu === "products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("aboutUs")}}><Link style={{textDecoration: 'none'}} to='/aboutUs'>AboutUs</Link>{menu === "aboutUs"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("service")}}><Link style={{textDecoration: 'none'}} to='/service'>Customer Service</Link>{menu === "service"?<hr/>:<></>}</li>
        </ul>
        <div class="navbar-right">
            <img src={search} alt="" className="search" />
            <div className="navbar-search-icon">
                <Link to='/cart'> <img src={basket_icon} alt="" className="basket" /></Link>
                <div className="nav-cart-count">0</div>
                <div className="dot">
                <Link to='/login'><button>Sign in</button></Link>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Navbar