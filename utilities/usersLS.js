// Define an array of original users with user information
const originalUsers = [
    { user: 'Anna Smith', email: 'anna@example.com', password: 'apple1', role: 'admin' },
    { user: 'John Doe', email: 'john@example.com', password: 'beer7', role: 'user' },
    { user: 'Ross Charlie', email: 'ross@example.com', password: 'root8', role: 'user' },
    { user: 'Mike Smith', email: 'mike@example.com', password: 'ginger6', role: 'user' },
    { user: 'Helena Johnson', email: 'helena@example.com', password: 'grape3', role: 'user' }
];

// Store the original users in the browser's localStorage as a JSON string
localStorage.setItem('users', JSON.stringify(originalUsers));

// Export a function to retrieve the stored users from localStorage
export function getStoredUsers() {
    // Retrieve the stored users from localStorage as a JSON string
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    // Log the stored users to the console for debugging purposes
    console.log('Stored users:', storedUsers);
    // Return the stored users
    return storedUsers;
}

// Export a function to add a new user to the stored users
export function addStoredUser(newUser) {
    // Log the new user to the console for debugging purposes
    console.log('New user:', newUser);
    // Retrieve the stored users from localStorage using the getStoredUsers function
    const storedUsers = getStoredUsers();
    // Add the new user to the stored users array
    storedUsers.push(newUser);
    // Log the stored users after the push operation to the console for debugging purposes
    console.log('Stored users after push:', storedUsers);
    // Update the localStorage with the new user by stringifying the stored users array
    localStorage.setItem('users', JSON.stringify(storedUsers));
    // Log the updated stored users to the console for debugging purposes
    console.log('User added to local storage:', storedUsers);
}