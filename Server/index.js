/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


const app = express()


app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' })
})

// test to see if the connection is working
app.listen(3001, () => {
  console.log('App is running')
})