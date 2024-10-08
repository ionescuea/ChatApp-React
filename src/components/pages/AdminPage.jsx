import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => (
  <section id="adminPage">
    <h1 className="text-center">Admin Page</h1>
    <div className="admin container">
      <div className="admin-row row gx-5">
        <div className="admin-card col-lg-3 border">
          User 1
        </div>
        <div className="admin-card col-lg-3 border">
          Email
        </div>
        <div className="admin-card col-lg-3 border">
          Password
        </div>
        <div className="admin-card col-lg-3 border">
          Remove
        </div>
      </div>
      <div className="admin-row row gx-5">
        <div className="admin-card col-lg-3 border">
          User 1
        </div>
        <div className="admin-card col-lg-3 border">
          Email
        </div>
        <div className="admin-card col-lg-3 border">
          Password
        </div>
        <div className="admin-card col-lg-3 border">
          Remove
        </div>
      </div>
    </div>
  </section >
)

export default AdminPage;