let userData = {};

function loadUserData() {
    return fetch('user.json')
        .then(response => response.json())
        .then(data => {
            userData = data;
            return userData; 
        })
        .catch(error => {
            console.error('Error loading user data:', error);
            throw error; 
        });
}

function signUp() {
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!firstName || !lastName || !username || !email || !password) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!userData.userInfo) {
        userData.userInfo = [];
    }

    const newUser = {
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        password: password
    };

    userData.userInfo.push(newUser);

    saveUserData();
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    window.location.href = "../homepage.html";

    return false;
}

function logIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loadUserData().then(() => {
        const user = userData.userInfo.find(user => user.username === username || user.email === username);
        
        if (!user) {
            alert('Invalid username/email.');
            return;
        }

        if (user.password !== password) {
            alert('Invalid password.');
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = "../homepage.html"; 

        document.getElementById('Displayname').textContent = user.firstname + " " + user.lastname; 
        document.getElementById('Username').textContent = "@" + user.username;
    }).catch(error => console.error('Error logging in:', error));
}

function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}
