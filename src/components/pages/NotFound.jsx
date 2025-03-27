import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section id="page-not-found">
    <div className="container">
      <div className="square-not-found d-flex flex-column align-items-center justify-content-center">
        <div className="row text-center">
          <div className="col-12">
            <p className="not-found-text">
              Sorry, you don&apos;t have access to this page, yet...
            </p>
            <img src="/logo.jpg" alt="Logo" className="logo-not-found img-fluid"></img>
          </div>
          <div className="col-12 text-overlay">
            <Link to="/">
              <button className="center-button active">Back to Main Page</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default NotFound;