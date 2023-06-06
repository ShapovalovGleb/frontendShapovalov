// npm run start:nodemon
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Database connection data
const database_access = {
    host: "localhost",
    user: "root",
    database: "website",
    password: "13487S_PQL",
};

const app = express();

app.use(cors())
app.use(body_parser.json())

// Get user by email and password when loggin in.
app.post('/get_user', (request, response) => {
    console.log('Getting user data...')

    let user_info = request.body

    const connection = mysql.createConnection(database_access);

    connection.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log('Database: ' + connection.state);
    });

    let query;

    if (user_info['type'] === 'login'){
        query = "SELECT * FROM users " +
                "WHERE user_email = '" + user_info['user_email'].trim() +
                "' AND user_password = " + user_info['user_password'].trim()
    } else if (user_info['type'] === 'recover'){
        query = "SELECT * FROM users " +
                "WHERE user_email = '" + user_info['user_email'].trim() +
                "' AND user_firstname = '" + user_info['user_firstname'].trim() +
                "' AND user_lastname = '" + user_info['user_lastname'].trim() + '\''
    }

    connection.query(query, (err, result, field) => {
        console.log(err);

        response.json({
            data: result
        });
    });

    connection.end();
});

// Add new user when registering.
app.post('/add_user', (request, response) => {
    console.log('Adding user...')

    let user_info = request.body

    const connection = mysql.createConnection(database_access);

    connection.connect((err) => {
        if (err) {
            console.log(err);
        }
        console.log('Database: ' + connection.state);
    });

    let query = "INSERT INTO users(user_firstname, user_lastname, user_email, user_password) " +
        "VALUES ('" + user_info['user_firstname'].trim() + "', '" + user_info['user_lastname'].trim() + " ', '" +
        user_info['user_email'].trim() + "', '" + user_info['user_password'].trim() + "');";

    connection.query(query, (err, result, field) => {
        console.log(err);

        response.json({
            data: result
        });
    });

    connection.end();
});

// Running server
app.listen(5000, (err) => {
    if (err) {
        return console.log(err);
    }
});
console.log('Server is running at port 5000...');

const connection = mysql.createConnection(database_access);
