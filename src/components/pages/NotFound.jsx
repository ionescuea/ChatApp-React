import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section id="page-not-found">
    <div className="container">
      <div className="square-not-found">
        <div className="row text-center">
          <div className="text-overlay">
            <p className="not-found-text">
              Sorry, you don&apos;t have access to this page, yet...
            </p>
            <Link to="/">
              <button className="center-button active">Back to Main Page</button>
            </Link>
          </div>
          <img src="/logo.jpg" alt="Logo" className="logo"></img>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;