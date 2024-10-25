import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar(props) {
    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState('HomePage');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(location.pathname);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }, [location.pathname]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        props.handlePageChange(page);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        setIsAdmin(false);
        navigate('/HomePage');
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0 w-100">
            <div className="container-fluid w-100 h-100 m-0 p-0">
                <div className="row flex-nowrap w-100 align-items-center text-center justify-content-center">
                    <div className="col-2 align-items-left">
                        <Link to="/HomePage" className="navbar-brand m-0" onClick={() => handlePageChange('HomePage')}>
                            <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                        </Link>
                    </div>

                    <div className="adminChat col-2 d-flex justify-content-center">
                        {isAdmin && location.pathname !== '/AdminPage' && (
                            <Link to="/AdminPage" className="nav nav-pills nav-link me-2" onClick={() => handlePageChange('AdminPage')}>
                                Admin Page
                            </Link>
                        )}
                        {location.pathname === '/AdminPage' && (
                            <Link to="/chat" className="nav nav-pills nav-link" onClick={() => handlePageChange('Chat')}>
                                Chat Page
                            </Link>
                        )}
                    </div>

                    <div className="col-4">
                        <Link to="/HomePage" className="navbar-title mx-auto" onClick={() => handlePageChange('HomePage')}>
                            ChatApp
                        </Link>
                    </div>

                    <div className="col-2">
                        {(location.pathname !== '/login' && location.pathname !== '/register' && isAdmin) && (
                            <h1 className="navbar-subtitle">
                                Hello, {localStorage.getItem('currentUser')}
                            </h1>
                        )}
                    </div>

                    <div className="col-2">
                        {(location.pathname !== '/login' && location.pathname !== '/register' && isAdmin) && (
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
