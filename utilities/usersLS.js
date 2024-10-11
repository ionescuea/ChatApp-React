const originalUsers = [
    {user: 'Anna Smith', email: 'anna@example.com', password: 'apple1', role: 'admin'},
    {user: 'John Doe', email: 'john@example.com', password: 'beer7', role: 'user'},
    {user: 'Ross Charlie', email: 'ross@example.com', password: 'root8', role: 'user'},
    {user: 'Mike Smith', email: 'mike@example.com', password: 'ginger6', role: 'user'},
    {user: 'Helena Johnson', email: 'helena@example.com', password: 'grape3', role: 'user'}
];

localStorage.setItem('users', JSON.stringify(originalUsers));

function getStoredUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

export default getStoredUsers;
