// Import necessary dependencies from React and React Router
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import utility functions for storing and retrieving users from local storage
import { getStoredUsers } from '/utilities/usersLS.js';
import { addStoredUser } from '/utilities/usersLS.js';

// Define the Register component
const Register = () => {
  // Initialize state variables for form fields and error messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userExists, setUserExists] = useState(false); // Flag to indicate if user already exists
  const [passwordError, setPasswordError] = useState('');
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);
  const navigate = useNavigate(); // Use navigate hook from React Router

  // Effect hook to check if user already exists when email or username changes
  useEffect(() => {
    const storedUsers = getStoredUsers();
    const existingUser = storedUsers.find((user) => user.email === email || user.username === username);
    if (existingUser) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, [email, username]);

  // Effect hook to check if passwords match when password or re-password changes
  useEffect(() => {
    if (password !== rePassword) {
      setPasswordError('Passwords do not match');
      setRegisterButtonDisabled(true);
    } else {
      setPasswordError('');
      setRegisterButtonDisabled(false);
    }
  }, [password, rePassword]);

  // Handle changes to form fields
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRePasswordChange = (event) => {
    setRePassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userExists && password === rePassword) {
      const newUser = {
        username,
        email,
        password,
        role: 'user',
      };
      console.log('Adding new user to local storage:', newUser);
      addStoredUser(newUser);
      localStorage.setItem('currentUser', username);
      navigate('/login'); // Navigate to login page after successful registration
    }
  };

  // Toggle password visibility
  const [passwordType, setPasswordType] = useState('password');
  const [rePasswordType, setRePasswordType] = useState('password');

  // Render the registration form
  return (
    <section id="register">
      <div className="container">
        <div className="square-register">
          <form onSubmit={handleSubmit}>
            <h1 className="register-title d-grid col-4 mx-auto">Register</h1>
            {userExists && (
              <div className="text-danger">
                User already registered. Please try a different email or username.
              </div>
            )}
            {passwordError && (
              <div className="text-danger">{passwordError}</div>
            )}
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Email*"
                value={email}
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername1"
                placeholder="Username*"
                value={username}
                onChange={handleUsernameChange}
              ></input>
            </div>
            <div className="mb-3">
              <input
                type={passwordType}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password*"
                value={password}
                onChange={handlePasswordChange}
              ></input>
              <span className="password-toggle" onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}>
                <i className={`fas ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            <div className="mb-3 position-relative">
              <input
                type={rePasswordType}
                className="form-control"
                id="exampleInputRePassword1"
                placeholder="Re-enter Password*"
                value={rePassword}
                onChange={handleRePasswordChange}
              ></input>
              <span className="repassword-toggle" onClick={() => setRePasswordType(rePasswordType === 'password' ? 'text' : 'password')}>
                <i className={`fas ${rePasswordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            <div id="emailHelp" className="form-text d-grid col-9 mx-auto">
              Please complete all fields that are marked with *.
            </div>
            <button
              type="submit"
              className="d-grid col-6 mx-auto register-button btn btn-primary"
              id="registerButton"
              disabled={registerButtonDisabled || userExists}
            >
              Register
            </button>
            <p className="text-center mt-3">
              Already registered? <Link to="/login">Go to login</Link>
            </p>
          </form>
        </div>
      </div >
    </section >
  );
};

export default Register;
