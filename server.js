const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bio'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Successfully connected to database');
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/admin', (req, res) => {
    const sql = "SELECT * FROM mgr";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error getting the data:", err);
            return res.status(500).json({ error: "Error getting the data" });
        }
        res.status(200).json(result);
    });
});

app.post('/signup', (req, res) => {
    const { name, age, date, username, email, password, role } = req.body;
    const values = [name, age, date, username, email, password, role];

    if (!name || !age || !date|| !username || !email || !password || !role) {
        return res.status(400).json({ error: "Invalid data" });
    }

    const sql = "INSERT INTO mgr (name, age, date, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting the data:", err);
            return res.status(500).json({ error: "Error inserting the data" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to the LiverMate",
            text: `Hello ${name},\n\nYou have successfully signed up.\n\nBest regards from the office,\n\nYour username: ${username}\nYour password: ${password}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending the mail:", err);
            } else {
                console.log("Mail sent:", info.response);
            }
        });

        res.status(200).json({
            id: result.insertId,
            name,
            age,
            date,
            username,
            email,
            password,
            role
        });
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM mgr WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting the data:", err);
            return res.status(500).json({ error: "Error deleting the data" });
        }

        res.status(200).json(result);
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, date, username, email, password, role } = req.body;

    if (!name || !age || !date || !username || !email || !password || !role) {
        return res.status(400).json({ error: "Invalid fields" });
    }

    const sql = "UPDATE mgr SET name = ?, age = ?, date = ?, username = ?, email = ?, password = ?, role = ? WHERE id = ?";
    const values = [name, age, date, username, email, password, role, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating the data:", err);
            return res.status(500).json({ error: "Error updating the data" });
        }

        res.status(200).json({
            id,
            name,
            age,
            date,
            username,
            email,
            password,
            role
        });
    });
});

app.post('/home', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = "SELECT * FROM mgr WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to login' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        res.status(200).json({ message: 'Login successful', role: user.role });
    });
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
