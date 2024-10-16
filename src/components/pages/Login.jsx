import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [errorType, setErrorType] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  let failedAttempts = 0;

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const storedUsers = getStoredUsers();
    const user = storedUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      navigate('/chat');
      failedAttempts = 0; // reset the counter on successful login
    } else {
      failedAttempts++;
      if (failedAttempts < 3) {
        setErrorText('Email or password is incorrect. Please try again.');
        setErrorType('danger');
      } else {
        setErrorText('Maximum login attempts reached. You will be redirected to the register page.');
        setErrorType('danger');
        setTimeout(() => {
          navigate('/register');
        }, 5000);
      }
    }
  }

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

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
              <input type="email" name="email" className="form-control" placeholder="Email*"></input>
            </div>
            <div className="mb-3">
              <input
                type={passwordType}
                name="password"
                className="form-control"
                placeholder="Password*"
              ></input>
              <span className="password-toggle" onClick={togglePassword}>
                <i className={`fas ${passwordType === 'password' ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            <div id="emailHelp" className="form-text d-grid col-9 mx-auto">To login, complete all fields that are marked with *.</div>
            <button type="submit" className="d-grid col-6 mx-auto login-button btn btn-primary">Login</button>
            <p className="text-center mt-3">Not registered? <Link to="/register">Create an account</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;