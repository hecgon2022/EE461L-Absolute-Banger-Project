import React, { useState, useEffect } from "react";
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className='navbar-logo'>
                        Our Project
                    </Link>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links'>
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/' className='nav-links'>
                                Projects
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/' className='nav-links'>
                                Datasets
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/' className='nav-links'>
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;