import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function NavBar(props) {
    const [setCurrentPage] = useState('HomePage');
    const [isAdmin] = useState(false);

    const handlePageChange = (page) => {
        props.handlePageChange(page);
        setCurrentPage(page);
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0">
            <div className="container-fluid pr-0 d-flex justify-content-between">
                <Link to="/HomePage" className="navbar-brand m-0" onClick={() => handlePageChange('HomePage')}>
                    <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                </Link>
                <div className="d-flex justify-content-around" style={{ width: '80%' }}>
                    <span className="admin-page-placeholder"></span>
                    <Link to="/HomePage" className="navbar-title" onClick={() => handlePageChange('HomePage')}>ChatApp</Link>
                    {isAdmin ? (
                        <Link to="/AdminPage" className="nav nav-pills nav-link" onClick={() => handlePageChange('AdminPage')}>Admin Page</Link>
                    ) : (
                        <span className="admin-page-placeholder"></span>
                    )}
                </div>
                <button type="button" className="btn btn-outline-light">Log out</button>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
};

export default NavBar;
