import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => (
    <section id="home">
        <div className="container">
            <div className="square">
                <img src="logo.jpg" alt="Logo" className="logo"></img>
                <button className="top-left-button active">Register</button>
                <button className="bottom-right-button active">Login</button>
            </div>
            <div className="oval">
                <button className="oval-button">Admin center</button>
            </div>
        </div>
    </section >
);


export default HomePage;
