/*
    index.js

    Establishes connection to server

*/

// currently just set up for testing
import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

app.use(cors())
app.use((req, res, next) => {
  const origin = req.get('Origin');

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Continue processing
  next();
});

// Not sure what this is needed for yet lol
app.use(express.urlencoded({ extended: false}));

// ------------------- Endpoints

// user registration (work in progress)
// added AUTO_INCREMENT constraint to userID so no need to modify that value
app.post('/register', async (req, res) => {

    const { userName, email, password } = req.body;

// for user input, hashes user password before storing into database
try {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the hashed password into the database
  const queryText = 'INSERT INTO users (userName, email, password) VALUES (?, ?, ?)';
  await connection.query(queryText, [userName, email, hashedPassword]);

  res.status(201).json({ message: 'Account created' });
} catch (error) {
  console.error('Error during registration:', error);
  res.status(500).json({ error: 'Registration failed' });
}
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const user = results[0];
  
    // Compare the provided password with the hashed password in the database
    const passwordMatch = bcrypt.compare(password, user.password);
  
    if (passwordMatch) {
      // Passwords match, create a JWT token
      const token = jwt.sign({ email: user.email, /* id: user.userID */ }, 'your-secret-key', { expiresIn: '3h' });
      // HTTP response 200 indicates success
      return res.status(200).json({ token });
    } else {
      // HTTP response 401 indicates user is unauthorized
      return res.status(401).json({ message: 'Username or Password Invalid' });
    }
    });
  });

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

// test to see if the connection is working
app.listen(3002, () => {
  console.log('App is running')
})

// use in get/post functions where user authentication is required
const verifyToken = (req, res, next) => {
  // extract the token from the request's headers, query string, or cookies
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // attach the user's information to the request for subsequent routes to use
    req.user = decoded;
    next();
  });
};
