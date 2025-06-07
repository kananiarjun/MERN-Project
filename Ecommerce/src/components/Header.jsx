import React, { useState } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";


const Header = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        alert('Logout successful');
        setIsLoggedIn(false);
        navigate('/');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <img height="40px" src="https://cdn.prod.website-files.com/662b641a42a7c6dc6e1736b1/676303126be9ba02bc7b3217_1655873659shopify-black-logo.png" alt="" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <Link className="nav-link cart-icon" to="/">
                                    <IoMdHome size={25} /><span className='m-1'>Home</span>
                                </Link>
                            </li><li className="nav-item">
                                <Link className="nav-link cart-icon" to="/shop">
                                    <FaShoppingBag size={20} /><span className='m-1'>Shop</span>
                                </Link>
                            </li><li className="nav-item">
                                <Link className="nav-link cart-icon" to="/about">
                                    <FaCircleInfo size={20} /><span className='m-1'>About</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link cart-icon" to="/contact">
                                    <BsTelephoneFill size={20} /><span className='m-1'>Contact</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link cart-icon" to="/cart">
                                    <FaShoppingCart size={20} /><span className='m-1'>Cart</span>
                                </Link>
                            </li>

                        </ul>
                        {!isLoggedIn ? (
                            <div>
                                <Link to="login"><Button title="Login" /></Link>
                                <Link to="signup"><Button title="Signup" /></Link>
                            </div>
                        ) : (
                            <div>
                                <Button title="Logout" onClick={handleLogout} />
                            </div>
                        )}

                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header