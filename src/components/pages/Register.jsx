import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStoredUsers, addStoredUser } from '/utilities/usersLS.js';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = getStoredUsers();
    const existingUser = storedUsers.find((user) => user.email === email || user.username === username);
    setUserExists(!!existingUser);
  }, [email, username]);

  useEffect(() => {
    setPasswordError(password !== rePassword ? 'Passwords do not match' : '');
    setRegisterButtonDisabled(password !== rePassword || userExists);
  }, [password, rePassword, userExists]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userExists && password === rePassword) {
      const newUser = {
        username,
        email,
        password,
        role: 'user',
      };
      addStoredUser(newUser);
      onRegister();  // Call onRegister to clear any login state
      navigate('/login');  // Navigate to login page after successful registration
    }
  };

  return (
    <section id="register">
      <div className="container">
        <div className="square-register">
          <form onSubmit={handleSubmit}>
            <h1 className="register-title d-grid col-4 mx-auto">Register</h1>
            {userExists && <div className="text-danger">User already registered. Please try a different email or username.</div>}
            {passwordError && <div className="text-danger">{passwordError}</div>}
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Username*" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Re-enter Password*" value={rePassword} onChange={(e) => setRePassword(e.target.value)} />
            </div>
            <div id="emailHelp" className="form-text d-grid col-9 mx-auto">
              Please complete all fields that are marked with *.
            </div>
            <button type="submit" className="d-grid col-6 mx-auto register-button btn btn-primary" disabled={registerButtonDisabled}>
              Register
            </button>
            <p className="text-center mt-3">Already registered? <Link to="/login">Go to login</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
