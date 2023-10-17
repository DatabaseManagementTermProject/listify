/*
    db.js

    Establishes connection to PlanetScale database

*/ 

//currently just set up for testing
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config( { path : 'Server/Config/.gitignore/.env' } );
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const connection = await mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to PlanetScale!');
  });

const query = "SELECT * FROM books WHERE BookId = 10001;";
const data = await connection.query(query);
console.log(data);

connection.end()
