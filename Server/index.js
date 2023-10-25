/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import cors from 'cors'
// import bcrypt from 'bcrypt'

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

app.options(cors());

// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors())
app.options('*', cors());

// Not sure what this is needed for yet lol
app.use(express.urlencoded({ extended: false}));

// ------------------- Endpoints

app.get('/books', async (req, res) => {
    const query = 'SELECT * FROM books LIMIT 50;';
    try {
      const [rows] = await connection.query(query);
      console.log(rows);
      res.send(rows);
    } catch (err) {
      console.log(err)
    }
})

app.get('/home/search/:letters', async (req, res) => {

  const letters = req.params.letters

  console.log("Made it here")
  const query = `SELECT * FROM movies WHERE title LIKE '%${letters}%' LIMIT 30;`;
  try {
    const [rows] = await connection.query(query);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err)
  }
})

app.get('/movies', async (req, res) => {
  const query = 'SELECT * FROM movies LIMIT 50;';
  try {
    const [rows] = await connection.query(query);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err)
  }
})

app.get('/videogames', async (req, res) => {
  const query = 'SELECT * FROM videoGames LIMIT 50;';
  try {
    const [rows] = await connection.query(query);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err)
  }
})

// Get the method from the library
app.get('/get/:userID/:library/:action/:itemID', async (req,res) => {
  // get the element from end point
  const userID = req.params.userID;
  const library = req.params.library;
  const action = req.params.action;
  const itemID = req.params.itemID;

  // Base on different action, we will deal with different library
  if (action == "getArray") {
    if (userID == -1 && itemID == -1){
      try {
        const query = 'SELECT * FROM ' + library + ';';
        const [rows] = await connection.query(query);
        console.log("inserver ", rows);
        res.status(200).send(rows);
      } catch (err) {
        console.error(err);
      }
    } else if (userID == -1 && itemID >= 0) {
      try {
        let libraryID;
        if (library == "books") {
          libraryID = "bookID"
        } else if (library == "movies") {
          libraryID = "movieID"
        } else if (library == "videoGames") {
          libraryID = "videoGameID"
        }

        const query = 'SELECT * FROM ' + library + ' WHERE ' + libraryID + '= ' + itemID + ';';
        const [rows] = await connection.query(query, [itemID]);

        // probably change this error message into something more UI friendly later
        if (!rows[0]){
          return res.json({msg: "Couldn't find that book."})
        }
        res.status(200).json(rows[0]);
      } catch (err) {
        console.error(err);
      }
    } else if (userID >= 0 && itemID == -1) {
      try {
        let likedLibrary;
        let libraryAttr;
        if (library == "books") {
          likedLibrary = "likedBooks";
          libraryAttr = "bookID";
        } else if (library == "movies") {
          likedLibrary = "likedMovies";
          libraryAttr = "movieID";
        } else if (library == "videoGames") {
          likedLibrary = "likedVideoGames";
          libraryAttr = "videoGameID";
        }

        const query = 'SELECT * ' +
                      'FROM ' + library + ' JOIN ' + likedLibrary + ' ' +
                      'ON ' + library + '.' + libraryAttr + ' = ' + likedLibrary + '.' + libraryAttr + ' ' +
                      'WHERE userID = ' + userID + ';';
        console.log(query);
        const [rows] = await connection.query(query);

        // probably change this error message into something more UI friendly later
        if (!rows[0]){
          return res.json({msg: "Couldn't find that book."})
        }
        res.status(200).json(rows);
      } catch (err) {
        console.error(err);
      }
    }
  } else if (action == "add") {
    let addLibrary;
    let libraryAttr;
    try {
      if (library == "books") {
        addLibrary = "likedBooks";
        libraryAttr = "bookID";
      } else if (library == "movies") {
        addLibrary = "likedMovies";
        libraryAttr = "movieID";
      } else if (library == "videoGames") {
        addLibrary = "likedVideoGames";
        libraryAttr = "videoGameID"
      }
      const query = 'INSERT INTO ' + addLibrary + ' ( userID, ' +  libraryAttr + ' ) VALUES ( ' + userID + ', ' + itemID + ' );';
      await connection.query(query)
      req.send("Data is added")
    } catch (err) {
      console.error(err);
    }
  } else if (action == "delete") {
    let addLibrary;
    let libraryAttr;
    try {
      if (library == "books") {
        addLibrary = "likedBooks";
        libraryAttr = "bookID";
      } else if (library == "movies") {
        addLibrary = "likedMovies";
        libraryAttr = "movieID";
      } else if (library == "videoGames") {
        addLibrary = "likedVideoGames";
        libraryAttr = "videoGameID"
      }
      const query = 'DELETE FROM ' + addLibrary + ' WHERE ' + libraryAttr + '= ' + itemID + ' ;';
      await connection.query(query)
      req.send("Data is added")
    } catch (err) {
      console.error(err);
    }
  }
})

// // Request for Adding method to liked table
// app.post('/add', async (req, res) => {
//   try {
//     console.log("It is FREAKING in here")
//     console.log("Body: ", req.body)
//     let addLibrary = req.addLibrary;
//     let userID = req.body["addUserID"];
//     let itemID = req.body["addItemID"];
//     console.log("check", addLibrary, itemID)
//     if (addLibrary == "books") {
//       addLibrary = "likedBooks";
//       itemID = "bookID";
//     } else if (addLibrary == "movies") {
//       addLibrary = "likedMovies";
//       itemID = "movieID";
//     } else if (addLibrary == "videoGames") {
//       addLibrary = "likedVideoGames";
//       itemID = "videoGameID";
//     }
  
//     const query = 'INSERT INTO ' + addLibrary + ' ( userID, ' +  itemID + ' ) VALUES ( ' + userID + ', ' + itemID + ' );';
//     await connection.query(query)
//   } catch (err) {
//     console.error(err);
//   }
// });

// // Request for Removing method from liked table
// app.delete('/delete', async(req, res) => {
//   let libraryDelete;
//   let itemID = "somethinginput"; // Need to change later
//   if (library == "books") { // Need to change library input
//     libraryDelete = "likedBooks";
//   } else if (library == "movies") {
//     libraryDelete = "likedMovies";
//   } else if (library == "videoGames") {
//     libraryDelete = "likedVideoGames";
//   }
//   const query = 'DELETE FROM ' + libraryDelete + ' WHERE id = ' + itemID;
//   connection.query(query, [data.value1, data.value2], (error, results, fields) => {
//     if (error) throw error;
//     res.send('Data deleted successfully');
//   });
// });

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
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
  // inserts the hashed password into the database
  connection.query(query, [userName, email, hashedPassword], (err) => {
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

app.get('/test', (req, res) => {
  res.send('Server is connected to the frontend');
});

// test to see if the connection is working
app.listen(3002, () => {
  console.log('App is running')
})
