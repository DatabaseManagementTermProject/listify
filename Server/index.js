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

app.options('*', cors());

// Needed for express POST requests to parse a JSON req.body
app.use(express.json());

// Not sure what this is needed for yet lol
app.use(express.urlencoded({ extended: false}));

// ------------------- Endpoints

// app.get('/get/:userID/:library/:action/:itemID', async (req,res) => {
//   // get the element from end point
//   const userID = req.params.userID;
//   const library = req.params.library;
//   const action = req.params.action;
//   const itemID = req.params.itemID;

//   // Base on different action, we will deal with different library
//   if (action == "getArray") {
//     if (itemID == -1){
//       try {
//         const query = 'SELECT * FROM ' + library + ';';
//         const [rows] = await connection.query(query);
//         console.log("inserver ", rows);
//         res.send(rows);
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       try {
//         const query = 'SELECT * FROM ' + library + ' WHERE bookId= ' + itemID + ';';
//         const [rows] = await connection.query(query, [itemID]);

//         // probably change this error message into something more UI friendly later
//         if (!rows[0]){
//           return res.json({msg: "Couldn't find that book."})
//         }
//         res.json(rows[0]);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// })

app.get('/books', async (req, res) => {
    const query = 'SELECT * FROM books;';
    try {
      const [rows] = await connection.query(query);
      console.log(rows);
      res.send(rows);
    } catch (err) {
      console.log(err)
    }
})

app.get('/movies', async (req, res) => {
  const query = 'SELECT * FROM movies;';
  try {
    const [rows] = await connection.query(query);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err)
  }
})

app.get('/videogames', async (req, res) => {
  const query = 'SELECT * FROM videoGames;';
  try {
    const [rows] = await connection.query(query);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err)
  }
})


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
          console.error("Password comparison error:", err);
          return res.status(500).json({ message: "Server error" });
      }

      if (passwordMatch) {
          // if passwords match, a token which keeps the user logged in for 3 hours (jwt = jason web token)
          const token = jwt.sign({ email: user.email, id: user.id }, "your-secret-key", { expiresIn: "3h" });
          // http response 200 indicates success
          return res.status(200).json({ token });
      } else {
          // http response 401 indicates user is unauthorized
          return res.status(401).json({ message: "Username or Password Invalid" });
      }
    });
  });
});

// user registration (work in progress)
// added AUTO_INCREMENT constraint to userID so no need to modify that value
app.post('/register', (req, res) => {
  const { userName, email, password } = req.body;

// for user input, hashes user password before storing into database
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password: ', err);
    res.status(500).json({ error: 'Registration Error' });
  }
  else {
  const query = 'INSERT INTO users (userName, email, password) VALUES (?, ?, ?)';
  connection.query(query, [userName, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering account: ', err);
      // http 500 server error response
      res.status(500).json({ error: 'Registration failed' });
    } else {
      // http response 201 created (the request succeed, and new resource created)
      res.status(201).json({ message: 'Account made' });
    }
  });
  }
}); });

// test to see if the connection is working
app.listen(3002, () => {
  console.log('App is running')
})