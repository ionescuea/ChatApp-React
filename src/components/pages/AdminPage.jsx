import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js';
import { useState, useEffect } from 'react';

function AdminPage() {
  const [storedUsers, setStoredUsers] = useState(getStoredUsers());

  useEffect(() => {
    setStoredUsers(getStoredUsers());
  }, []);

  const handleRemoveUser = (index) => {
    const updatedUsers = storedUsers.filter((user, i) => i !== index);
    setStoredUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleRoleChange = (index, role) => {
    const updatedUsers = storedUsers.map((user, i) => {
      if (i === index) {
        return { ...user, role: role };
      }
      return user;
    });
    setStoredUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <section id="adminPage">
      <div className="admin container">
        <div className="admin-row row gx-5">
          {storedUsers.map((user, index) => (
            <div key={index} className="admin-row row gx-5">
              <div className="admin-card col-lg-4 col-sm-12">
                <p>{user.user}</p>
              </div>
              <div className="admin-card col-lg-4 col-sm-12">
                <p>{user.email}</p>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`role-switch-${index}`}
                    checked={user.role === 'admin'}
                    onChange={(e) => handleRoleChange(index, e.target.checked ? 'admin' : 'user')}
                  />
                  <label className="form-check-label" htmlFor={`role-switch-${index}`}>
                    {user.role === 'admin' ? 'Admin' : 'User'}
                  </label>
                </div>
              </div>
              <div className="col-lg-2 col-sm-12">
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveUser(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// const AdminPage = () => (
//   <section id="adminPage">
//     <h1 className="text-center">Admin Page</h1>
//     <div className="admin container">
//       <div className="admin-row row gx-5">
//         <div className="admin-card col-lg-3 border">
//           User 1
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Email
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Password
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Remove
//         </div>
//       </div>
//       <div className="admin-row row gx-5">
//         <div className="admin-card col-lg-3 border">
//           User 1
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Email
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Password
//         </div>
//         <div className="admin-card col-lg-3 border">
//           Remove
//         </div>
//       </div>
//     </div>
//   </section >
// )

export default AdminPage;