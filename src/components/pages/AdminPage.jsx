import React from 'react';
import { useState, useEffect } from 'react';
import { getStoredUsers } from '/utilities/usersLS.js';

function AdminPage() {
    const [storedUsers, setStoredUsers] = useState(getStoredUsers());
    const currentUser = localStorage.getItem('currentUser');

    useEffect(() => {
        // When the page loads, ensure that we load the most recent users from localStorage
        const usersFromStorage = getStoredUsers();
        if (usersFromStorage) {
            setStoredUsers(usersFromStorage);
        }
    }, []);

    const handleRoleChange = (username, checked) => {
        const admins = storedUsers.filter((user) => user.role === 'admin');

        // Prevent removing the last admin
        if (admins.length === 1 && admins[0].username === username && !checked) {
            alert('At least one user must be an admin.');
            return;
        }

        // Update the user's role and sync with localStorage
        const updatedUsers = storedUsers.map((user) =>
            user.username === username ? { ...user, role: checked ? 'admin' : 'user' } : user
        );

        // Save the updated users list in state and localStorage
        setStoredUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleRemoveUser = (username) => {
        const confirmRemoval = window.confirm('Are you sure you want to remove this user?');
        if (confirmRemoval) {
            const updatedUsers = storedUsers.filter((user) => user.username !== username);
            setStoredUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }
    };

    return (
        <section id="adminPage">
            <div className="admin container">
                <div className="admin-row row gx-2">
                    {storedUsers
                        .filter((user) => user.username !== currentUser)
                        .map((user) => (
                            <div key={user.username} className="admin-row row gx-2 align-items-center">
                                <div className="admin-card col-lg-4 col-md-6 col-sm-4 col-4">
                                    <p>{user.username}</p>
                                </div>
                                <div className="admin-card2 col-lg-4 d-lg-block d-none">
                                    <p>{user.email}</p>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`switch${user.username}`}
                                            checked={user.role === 'admin'}
                                            onChange={(e) => handleRoleChange(user.username, e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor={`switch${user.username}`}>
                                            Admin
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3 col-sm-4 col-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveUser(user.username)}
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

export default AdminPage;
