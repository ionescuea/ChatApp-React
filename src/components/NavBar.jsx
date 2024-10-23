import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar(props) {
    const [currentPage, setCurrentPage] = useState('HomePage');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true'); // Check from localStorage initially
    const location = useLocation(); // Hook to get current page route
    const navigate = useNavigate();  // Hook to navigate programmatically

    // Update the current page based on the location
    useEffect(() => {
        setCurrentPage(location.pathname);
        setIsAdmin(localStorage.getItem('isAdmin') === 'true'); // Ensure the isAdmin state is accurate
    }, [location.pathname]);

    // Redirect to HomePage if not logged in
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isAdmin');
        if (!isLoggedIn) {
            navigate('/HomePage');
        }
    }, []);

      // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        props.handlePageChange(page);
    };

    // Handle logout functionality
    const handleLogout = () => {
        // Clear user session data from localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');

        // Redirect to login page
        navigate('/HomePage');
    };

    // Check if the current page is home, login, or register
    const shouldHideLogoutButton = ['/HomePage', '/login', '/register'].includes(location.pathname);

    return (
        <nav className="navbar fixed-top mb-0 p-0 w-100">
            <div className="container-fluid w-100 h-100 m-0 p-0">
                <div className="row flex-nowrap w-100 align-items-center text-center justify-content-center">
                    <div className="col-2 align-items-left">
                        <Link to="/HomePage" className="navbar-brand m-0" onClick={() => handlePageChange('HomePage')}>
                            <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                        </Link>
                    </div>

                    <div className="col-2">
                        {/* Render the Chat Page link only on the Admin Page */}
                        {location.pathname === '/AdminPage' && (
                            <div className="nav-chat">
                                <Link to="/chat" className="nav nav-pills nav-link" onClick={() => handlePageChange('Chat')}>
                                    Chat Page
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="col-4">
                        <Link to="/HomePage" className="navbar-title mx-auto" onClick={() => handlePageChange('HomePage')}>
                            ChatApp
                        </Link>
                    </div>

                    <div className="col-2">
                        {/* Render the Admin Page link if the user is an admin */}
                        {isAdmin && (
                            <Link to="/AdminPage" className="nav nav-pills nav-link" onClick={() => handlePageChange('AdminPage')}>
                                Admin Page
                            </Link>
                        )}
                    </div>

                    <div className="col-2">
                        {/* Conditionally render the logout button */}
                        {!shouldHideLogoutButton && (
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

// Define prop types for the NavBar component
NavBar.propTypes = {
    handlePageChange: PropTypes.func,
    isAdmin: PropTypes.bool.isRequired,
};

// Export the NavBar component as the default export
export default NavBar;
