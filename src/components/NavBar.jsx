import { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';


function NavBar(props) {
    const [setCurrentPage] = useState('HomePage');

    const handlePageChange = (page) => {
        props.handlePageChange(page);
        setCurrentPage(page);
    };

    return (
        <nav className="navbar fixed-top mb-0 p-0">
            <div className="container-fluid pr-0">
                <a className="navbar-brand m-0" href="#HomePage" onClick={() => handlePageChange('HomePage')}>
                    <img src="/logo.jpg" alt="Logo" width="50" height="50"/>
                </a>
                <a className="navbar-title" href="#HomePage" onClick={() => handlePageChange('HomePage')}>ChatApp</a>
                {/* <div className="avatar">
                    <span className="status active"></span>
                </div> */}
                <button type="button" className="btn btn-outline-light">Log out</button>
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    currentPage: PropTypes.string.isRequired,
    handlePageChange: PropTypes.func.isRequired,
};

export default NavBar;
