/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

// ------------------- Set up connection to database

// loads what is in .env as an environment variable.
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

app.post('/books/', async (req, res) => {
	// TODO: input validation
	
	const post = req.body;

	// TODO: parse req.body (will likely be JSON) to be passed as a query to database
	// TODO: return some type of success or failure response
})

// test to see if the connection is working
app.listen(3001, () => {
  console.log('App is running')
})
