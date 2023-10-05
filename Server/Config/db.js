/*
    db.js

    Establishes connection to PlanetScale database

*/ 

//currently just set up for testing
import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config( { path : 'Server/Config/.env' } );
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to PlanetScale!');
  });

connection.end()
