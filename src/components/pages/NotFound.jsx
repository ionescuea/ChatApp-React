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
              Sorry, the page you are looking for does not exist
            </p>
            <Link to="/">
              <button className="center-button active">Back to our site</button>
            </Link>
          </div>
          <img src="/logo.jpg" alt="Logo" className="logo"></img>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;