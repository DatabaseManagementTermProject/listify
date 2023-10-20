/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import cors from 'cors'

dotenv.config( { path : '.env' } );
const connection = await mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to PlanetScale!');
});

// ------------------- Set up express server

const app = express()
app.use(cors())

// Needed for express POST requests to parse a JSON req.body
app.use(express.json());

// Not sure what this is needed for yet lol
app.use(express.urlencoded({ extended: false}));

// ------------------- Endpoints

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

		// probably change this error message into something more UI friendly later
		if (!rows[0]){
			return res.json({msg: "Couldn't find that book."})
		}
		res.json(rows[0]);
    } catch (err) {
      console.error(err);
    }
})

// get all movies
app.get('/movies', async (req, res) => {

  try {
  const query = 'SELECT * FROM movies;';
  const [rows] = await connection.query(query);
  res.send(rows);
  } catch (err) {
    console.error(err);
  }
})

// get book by id
app.get('/movies/:id', async (req, res) => {

  try {
  const {id} = req.params;
  const query = 'SELECT * FROM movies WHERE movieID=?;';
  const [rows] = await connection.query(query, [id]);

  // probably change this error message into something more UI friendly later
  if (!rows[0]){
    return res.json({msg: "Couldn't find that movie."})
  }
  res.json(rows[0]);
  } catch (err) {
    console.error(err);
  }
})

// user registration (work in progress)
// added AUTO_INCREMENT constraint to userID so no need to modify that value
app.post('/register', (req, res) => {
  const { userName, locationCountry, locationState, locationCity } = req.body;

// for user input
  const query = 'INSERT INTO users (userName, password, locationCountry, locationState, locationCity) VALUES (?, ?, ?, ?)';
  connection.query(query, [userName, password, locationCountry, locationState, locationCity], (err, result) => {
    if (err) {
      console.error('Error registering account: ', err);
      // http 500 server error response
      res.status(500).json({ error: 'Registration failed' });
    } else {
      // http response 201 created (the request succeed, and new resource created)
      res.status(201).json({ message: 'Account made' });
    }
  });
});

// test to see if the connection is working
app.listen(3002, () => {
  console.log('App is running')
})
