import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar({ currentPage, isAdmin }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('currentUser') !== null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('currentUser') !== null);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0 w-100">
            <div className="container-fluid w-100 h-100 m-0 p-0">
                <div className="row flex-nowrap w-100 align-items-center text-center justify-content-center">
                    <div className="col-2 align-items-left">
                        <Link to="/" className="navbar-brand m-0">
                            <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                        </Link>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        {isLoggedIn && isAdmin && (
                            <Link to="/adminPage" className="nav nav-pills nav-link me-2">
                                Admin
                            </Link>
                        )}
                        {isLoggedIn && (
                            <Link to="/chat" className="nav nav-pills nav-link">
                                Chat
                            </Link>
                        )}
                    </div>
                    <div className="col-4">
                        <Link to="/" className="navbar-title mx-auto">
                            ChatApp
                        </Link>
                    </div>
                    <div className="col-2">
                        {isLoggedIn && (
                            <h1 className="navbar-subtitle">
                                Hello, {localStorage.getItem('currentUser')}
                            </h1>
                        )}
                    </div>
                    <div className="col-2">
                        {isLoggedIn && (
                            <button type="button" className="btn" onClick={handleLogout}>
                                Log out
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    currentPage: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
};

export default NavBar;
