import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function NavBar(props) {
    const [setCurrentPage] = useState('HomePage');

    const handlePageChange = (page) => {
        props.handlePageChange(page);
        setCurrentPage(page);
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0">
            <div className="container-fluid pr-0">
                <Link to="/HomePage" className="navbar-brand m-0" onClick={() => handlePageChange('HomePage')}>
                    <img src="/logo.jpg" alt="Logo" width="50" height="50" />
                </Link>
                <Link to="/HomePage" className="navbar-title" onClick={() => handlePageChange('HomePage')}>ChatApp</Link>
                <button type="button" className="btn btn-outline-light">Log out</button>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
};

export default NavBar;
