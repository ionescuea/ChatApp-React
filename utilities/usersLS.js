const originalUsers = {
    user1: {name: 'Anna Smith', email: 'anna@example.com', password: 'apple1', role: 'admin'},
    user2: {name: 'John Doe', email: 'john@example.com', password: 'beer7', role: 'user'},
    user3: {name: 'Ross Charlie', email: 'ross@example.com', password: 'root8', role: 'user'},
    user4: {name: 'Mike Smith', email: 'mike@example.com', password: 'ginger6', role: 'user'},
    user5: {name: 'Helena Johnson', email: 'helena@example.com', password: 'grape3', role: 'user'}
};

localStorage.setItem('users', JSON.stringify(originalUsers));

const storedUsers = JSON.parse(localStorage.getItem('users'));

console.log(storedUsers);
