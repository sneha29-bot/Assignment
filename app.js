const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('./model/usermodel');
const path = require('path')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));



app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/home', (req, res) => {
    res.render("home");
});


app.get('/register', (req, res) => {
    res.render("register");
});

// LOGIN
app.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) return res.status(404).send("User not found");
    if (user.password !== password) return res.status(400).send("Wrong password");

    let token = jwt.sign({ email }, 'goddd');
    res.cookie("token", token);
    res.send("Login successful");
});

// REGISTER
app.post('/register', async (req, res) => {
    try {
        let { email, name, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).send("User already registered");

        let newUser = await userModel.create({ 
            name, 
            email, 
            password 
        });

        let token = jwt.sign({ email }, 'goddd');
        res.cookie('token', token);
        res.send("Registration successful");
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(4000);
