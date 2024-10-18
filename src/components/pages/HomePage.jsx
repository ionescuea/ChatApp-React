import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const HomePage = () => (
    <section id="home">
        <div className="container">
            <div className="square">
                <img src="/logo.jpg" alt="Logo" className="logo"></img>
                <Link to="/register">
                    <button className="top-left-button active">Register</button>
                </Link>
                <Link to="/login"> 
                    <button className="bottom-right-button active">Login</button>
                </Link>
            </div>
        </div>
    </section>
);

export default HomePage;
