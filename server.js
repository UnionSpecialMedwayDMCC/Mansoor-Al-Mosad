const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Dummy credentials
const USERNAME = 'admin';
const PASSWORD = '1234';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.loggedIn = true;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials! <a href="/">Try again</a>');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('https://192.168.0.200/node-red/ui/#!/1?socketid=bLUvnrH7U2iuv9gKAAAC'); // Change if your Node-RED runs on different URL
    } else {
        res.redirect('/');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
