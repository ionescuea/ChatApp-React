import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => (
  <section id="login">
    <div className="container">
      <div className="square">
        <form>
          <h1 className="register-title d-grid col-3 mx-auto">Login</h1>
          <div className="mb-3">
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email*"></input>
          </div>
          <div className="mb-3">
            <input type="username" className="form-control" id="exampleInputUsername1" placeholder="Username"></input>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password*"></input>
          </div>
          <div id="emailHelp" className="form-text d-grid col-9 mx-auto">To login, complete all fields that are marked with *.</div>
          <button type="submit" className="d-grid col-6 mx-auto register-button btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </section >
);

export default Login;
