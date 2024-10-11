import 'bootstrap/dist/css/bootstrap.min.css';


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
            <input type="username" className="form-control" id="exampleInputUsername1" placeholder="Username*"></input>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password*"></input>
          </div>
          <div id="emailHelp" className="form-text d-grid col-9 mx-auto">Please complete all fields that are marked with *.</div>
          <button type="submit" className="d-grid col-6 mx-auto register-button btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </section >
);

export default Register;
