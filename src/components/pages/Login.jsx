import 'bootstrap/dist/css/bootstrap.min.css';
import getStoredUsers from '/utilities/usersLS.js';
// import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const storedUsers = getStoredUsers();
    const user = storedUsers.find((user) => user.email === email && user.password === password);
  
    if (user) {
      navigate('/chat');
      // console.log('Login successful');
    } else {
      navigate('/register');
      // console.log('Login failed');
    }
  };

  return (
    <section id="login">
      <div className="container">
        <div className="square-login">
          <form onSubmit={handleSubmit}>
            <h1 className="login-title d-grid col-3 mx-auto">Login</h1>
            <div className="mb-3">
              <input type="email" name="email" className="form-control" placeholder="Email*"></input>
            </div>
            <div className="mb-3">
              <input type="password" name="password" className="form-control" placeholder="Password*"></input>
            </div>
            <div id="emailHelp" className="form-text d-grid col-9 mx-auto">To login, complete all fields that are marked with *.</div>
            <button type="submit" className="d-grid col-6 mx-auto login-button btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </section >
  );
};

export default Login;
