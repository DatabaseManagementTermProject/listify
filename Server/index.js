/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config( { path : '.env' } );
const connection = await mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to PlanetScale!');
});

const app = express()

// get all books
app.get('/books', async (req, res) => {

    try {
		const query = 'SELECT * FROM books;';
		const [rows] = await connection.query(query);
		res.send(rows);
    } catch (err) {
      console.error(err);
    }
})

// get book by id
app.get('/books/:id', async (req, res) => {

    try {
		const {id} = req.params;
		const query = 'SELECT * FROM books WHERE bookId=?;';

		const [rows] = await connection.query(query, [id]);

		if (!rows[0]){
			return res.json({msg: "Couldn't find that book."})
		}
		res.json(rows[0]);
    } catch (err) {
      console.error(err);
    }
})

// user registration
// users table auto_increments userID value for each user so no need to modify that value
app.post('/register', (req, res) => {
  const { userName, locationCountry, locationState, locationCity } = req.body;

// for user input when registering
  const query = 'INSERT INTO users (userName, locationCountry, locationState, locationCity) VALUES (?, ?, ?, ?)';
  connection.query(query, [userName, locationCountry, locationState, locationCity], (err, result) => {
    if (err) {
      console.error('Error registering account: ', err);
      res.status(500).json({ error: 'Registration failed' });
    } else {
      res.status(201).json({ message: 'Account made' });
    }
  });
});

// test to see if the connection is working
app.listen(3001, () => {
  console.log('App is running')
})
