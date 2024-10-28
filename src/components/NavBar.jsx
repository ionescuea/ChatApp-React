import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('currentUser') !== null);
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('currentUser') !== null);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        navigate('/HomePage');
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0 w-100">
            <div className="container-fluid w-100 h-100 m-0 p-0">
                <div className="row flex-nowrap w-100 align-items-center text-center justify-content-center">
                    <div className="col-2 align-items-left">
                        <Link to="/HomePage" className="navbar-brand m-0">
                            <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                        </Link>
                    </div>

                    <div className="col-2 d-flex justify-content-center">
                        {(isLoggedIn && props.isAdmin) && location.pathname !== '/adminPage' && (
                            <Link to="/adminPage" className="nav nav-pills nav-link me-2">
                                Admin Page
                            </Link>
                        )}
                        {(isLoggedIn && location.pathname !== '/chat') && (
                            <Link to="/chat" className="nav nav-pills nav-link">
                                Chat Page
                            </Link>
                        )}
                    </div>

                    <div className="col-4">
                        <Link to="/HomePage" className="navbar-title mx-auto">
                            ChatApp
                        </Link>
                    </div>

                    <div className="col-2">
                        {(location.pathname !== '/login' && location.pathname !== '/register' && isLoggedIn) && (
                            <h1 className="navbar-subtitle">
                                Hello, {localStorage.getItem('currentUser')}
                            </h1>
                        )}
                    </div>

                    <div className="col-2">
                        {(location.pathname !== '/login' && location.pathname !== '/register' && isLoggedIn) && (
                            <button type="button" className="btn btn-outline-light" onClick={handleLogout}>
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
    handlePageChange: PropTypes.func,
};

export default NavBar;