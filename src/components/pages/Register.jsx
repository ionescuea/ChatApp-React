import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// Check if the passwords match
const passwordInput = document.getElementById('exampleInputPassword1');
const rePasswordInput = document.getElementById('exampleInputRePassword1');
const passwordError = document.getElementById('passwordError');
const registerButton = document.getElementById('registerButton');

rePasswordInput.addEventListener('input', () => {
  if (passwordInput.value !== rePasswordInput.value) {
    passwordError.textContent = 'Passwords do not match';
    registerButton.disabled = true;
  } else {
    passwordError.textContent = '';
    registerButton.disabled = false;
  }
});

const Register = () => (
  <section id="register">
    <div className="container">
      <div className="square-register">
        <form>
          <h1 className="register-title d-grid col-4 mx-auto">Register</h1>
          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email*"></input>
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" id="exampleInputUsername1" placeholder="Username*"></input>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password*"></input>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputRePassword1" placeholder="Re-enter Password*"></input>
            <div id="passwordError" className="text-danger"></div>
          </div>
          <div id="emailHelp" className="form-text d-grid col-9 mx-auto">Please complete all fields that are marked with *.</div>
          <button type="submit" className="d-grid col-6 mx-auto register-button btn btn-primary" id="registerButton">Register</button>
          <p className="text-center mt-3">Already registered? <Link to="/login">Go to login</Link></p>
        </form>
      </div>
    </div>
  </section >
);

export default Register;
