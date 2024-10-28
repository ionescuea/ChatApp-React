// Dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

// Login component
function Login({ onLogin }) {
  const navigate = useNavigate();
  
  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordType: 'password',
  });
  
  const [error, setError] = useState({ text: '', type: '' });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const MAX_FAILED_ATTEMPTS = 2;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const { email, password } = formData;
    const storedUsers = getStoredUsers();
    const user = storedUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', user.username);
      localStorage.setItem('isAdmin', user.role === 'admin');
      onLogin(user.role === 'admin');
      navigate('/chat', { state: { isAdmin: user.role === 'admin' } });
      setFailedAttempts(0);
    } else {
      handleFailedLogin();
    }
  };

  const handleFailedLogin = () => {
    setFailedAttempts(prev => prev + 1);
    
    if (failedAttempts < MAX_FAILED_ATTEMPTS) {
      setError({ text: 'Email or password is incorrect. Please try again.', type: 'danger' });
    } else {
      setError({ text: 'Maximum login attempts reached. Redirecting to the register page...', type: 'danger' });
      setTimeout(() => navigate('/register'), 3000);
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      passwordType: prev.passwordType === 'password' ? 'text' : 'password',
    }));
  };

  return (
    <section id="login">
      <div className="container">
        <div className="square-login">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title d-grid col-3 mx-auto">Login</h1>
            {error.text && <div className={`text-danger-${error.type}`}>{error.text}</div>}
            
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type={formData.passwordType}
                name="password"
                className="form-control"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                <i className={`fas ${formData.passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>

            <div id="emailHelp" className="form-text d-grid col-9 mx-auto">
              To login, complete all fields that are marked with *.
            </div>

            <button type="submit" className="d-grid col-6 mx-auto login-button btn btn-primary">
              Login
            </button>

            <p className="text-center mt-3">
              Not registered? <Link to="/register">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
