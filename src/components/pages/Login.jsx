// Dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Login component
function Login() {
  // Initialize navigation hook
  const navigate = useNavigate();

  // Initialize state variables
  const [errorText, setErrorText] = useState(''); // Initialize error text state
  const [errorType, setErrorType] = useState(''); // Initialize error type state
  const [passwordType, setPasswordType] = useState('password'); // Initialize password type state
  const [failedAttempts, setFailedAttempts] = useState(0); // Initialize failed attempts state
  const [email, setEmail] = useState(''); // Initialize email state
  const [password, setPassword] = useState(''); // Initialize password state


  // Handle form submission
  function handleSubmit(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get stored users from local storage
    const storedUsers = getStoredUsers();

    // Check if email and password match a user in stored users
    const user = storedUsers.find((user) => user.email === email && user.password === password);

    // If user is found, navigate to chat page and reset failed attempts counter
    if (user) {
      navigate('/chat');
      setFailedAttempts(0); // Reset failed attempts counter on successful login
    } else {
      // Increment failed attempts counter
      setFailedAttempts(failedAttempts + 1);

      // If number of failed attempts is less than 2, display error message
      if (failedAttempts < 2) {
        setErrorText('Email or password is incorrect. Please try again.');
        setErrorType('danger');
      } else {
        // If maximum number of attempts is reached, display error message and redirect to register page
        setErrorText('Maximum login attempts reached. You will be redirected to the register page.');
        setErrorType('danger');

        // Wait for 3 seconds before redirecting to register page
        setTimeout(() => {
          // Remove user from local storage
          const updatedUsers = storedUsers.filter((user) => user.email !== email);
          localStorage.setItem('users', JSON.stringify(updatedUsers));

          // Navigate to register page
          navigate('/register');
        }, 3000);
      }
    }
  }

  // Handle email input change
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // Handle password input change
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // Toggle password visibility
  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  // Render the login form
  return (
    <section id="login">
      <div className="container">
        <div className="square-login">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title d-grid col-3 mx-auto">Login</h1>

            {errorText && (
              <div className={`text-danger-${errorType}`}>
                {errorText}
              </div>
            )}

            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email*"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="mb-3">
              <input
                type={passwordType}
                name="password"
                className="form-control"
                placeholder="Password*"
                value={password}
                onChange={handlePasswordChange}
              />
              <span className="password-toggle" onClick={togglePassword}>
                <i className={`fas ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
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

// Export the Login component
export default Login;
