/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config( { path : 'Server/Config/.gitignore/.env' } );
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

// test to see if the connection is working
app.listen(3001, () => {
  console.log('App is running')
})
