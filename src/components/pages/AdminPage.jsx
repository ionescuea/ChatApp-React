import { useState, useEffect } from 'react';
import { getStoredUsers } from '/utilities/usersLS.js';

function AdminPage() {
    const [storedUsers, setStoredUsers] = useState(getStoredUsers());

    useEffect(() => {
        // When the page loads, ensure that we load the most recent users from localStorage
        const usersFromStorage = getStoredUsers();
        if (usersFromStorage) {
            setStoredUsers(usersFromStorage);
        }
    }, []);

    const handleRoleChange = (index, checked) => {
        const admins = storedUsers.filter((user) => user.role === 'admin');

        // Prevent removing the last admin
        if (admins.length === 1 && admins[0].username === storedUsers[index].username && !checked) {
            alert('At least one user must be an admin.');
            return;
        }

        // Update the user's role and sync with localStorage
        const updatedUsers = storedUsers.map((user, i) => 
            i === index ? { ...user, role: checked ? 'admin' : 'user' } : user
        );

        // Save the updated users list in state and localStorage
        setStoredUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleRemoveUser = (index) => {
        const updatedUsers = storedUsers.filter((_, i) => i !== index);
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
                                <p>{user.username}</p>
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
                                        onChange={(e) => handleRoleChange(index, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={`role-switch-${index}`}>
                                        {user.role === 'admin' ? 'Admin' : 'User'}
                                    </label>
                                </div>
                            </div>
                            <div className="col-lg-2 col-sm-12">
                                <button className="btn btn-danger" onClick={() => handleRemoveUser(index)}>
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

export default AdminPage;
