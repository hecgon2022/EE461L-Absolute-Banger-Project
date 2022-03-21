import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to="/" className='navbar-logo'>
                        Our Project
                    </Link>

                    <ul>
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
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;