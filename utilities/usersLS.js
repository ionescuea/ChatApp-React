// Define an array of original users with user information
const originalUsers = [
    { username: 'anasmith', email: 'anna@example.com', password: 'apple1', role: 'admin' },
    { username: 'johnd', email: 'john@example.com', password: 'beer7', role: 'user' },
    { username: 'rossddd', email: 'ross@example.com', password: 'root8', role: 'user' },
    { username: 'mikyie', email: 'mike@example.com', password: 'ginger6', role: 'user' },
    { username: 'helllena', email: 'helena@example.com', password: 'grape3', role: 'user' }
];

// Function to initialize localStorage with original users if not already present
export function initializeStoredUsers() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(originalUsers));
    }
}

// Export a function to retrieve the stored users from localStorage
export function getStoredUsers() {
    initializeStoredUsers(); // Initialize users if not present
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    return storedUsers || [];
}

// Export a function to add a new user to the stored users
export function addStoredUser(newUser) {
    const storedUsers = getStoredUsers();
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
}

// Export a function to update an existing user in the stored users
export function updateStoredUser(updatedUser) {
    const storedUsers = getStoredUsers();
    const index = storedUsers.findIndex((user) => user.username === updatedUser.username);
    if (index !== -1) {
        storedUsers[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(storedUsers));
    }
}

// Export a function to remove an existing user from the stored users
export function removeStoredUser(username) {
    const storedUsers = getStoredUsers();
    const updatedUsers = storedUsers.filter((user) => user.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
}