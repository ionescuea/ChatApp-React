// Importing the necessary dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import { getStoredUsers } from '/utilities/usersLS.js';
import { useState, useEffect } from 'react';


// Functional component that represents the AdminPage
function AdminPage() {

    // State variable to store the users retrieved from local storage
    const [storedUsers, setStoredUsers] = useState(getStoredUsers());


    // useEffect hook to update the storedUsers state when the component mounts
    useEffect(() => {
        setStoredUsers(getStoredUsers());
    }, []);


    // Function to handle the removal of a user
    const handleRemoveUser = (index) => {
        // Filter the storedUsers array to remove the user at the given index
        const updatedUsers = storedUsers.filter((user, i) => i !== index);
        // Update the storedUsers state with the updated array
        setStoredUsers(updatedUsers);
        // Update the local storage with the updated array
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };


    // Function to handle the change of a user's role
    const handleRoleChange = (index, role) => {
        // Map the storedUsers array to update the role of the user at the given index
        const updatedUsers = storedUsers.map((user, i) => {
            if (i === index) {
                return { ...user, role: role };
            }
            return user;
        });
        // Update the storedUsers state with the updated array
        setStoredUsers(updatedUsers);
        // Update the local storage with the updated array
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };


    // Render the AdminPage component
    return (
        <section id="adminPage">
            <div className="admin container">
                <div className="admin-row row gx-5">
                    {/* Map the storedUsers array to render a row for each user */}
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


// Export the AdminPage component
export default AdminPage;
