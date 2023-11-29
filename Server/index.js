/*
    index.js
*/

import supabase from './Config/db.js'
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
  // console.log('Connected to PlanetScale!');
});

// ------------------- Set up express server

const app = express()

// Needed for express POST requests to parse a JSON req.body
app.use(express.json());

app.options(cors());
app.use(cors())

// Not sure what this is needed for yet lol
app.use(express.urlencoded({ extended: false}));

// ------------------- Endpoints

// generalized search endpoint for all categories
app.get('/search/:category/:letters', async (req, res) => {
  // category is books, video games, movies, or users
  // letters is the search value
  let { category, letters } = req.params;

  category = category.charAt(0).toUpperCase() + category.slice(1);

  try {
    let data, error;

    if (category === 'Users') {
        // Search for users by username
        const response = await supabase
            .from('Users')
            .select('*')
            .ilike('username', `%${letters}%`);
        data = response.data;
        error = response.error;
    }
    else if (category === 'Books') {
        // Limit book searches for the images we have
        const response = await supabase
            .from('Books')
            .select('*')
            .ilike('title', `%${letters}%`)
        data = response.data;
        error = response.error;
    }
    else {
        // For movies and video games
        const response = await supabase
            .from(category)
            .select('*')
            .ilike('title', `%${letters}%`);
        data = response.data;
        error = response.error;
    }

    res.send(data);
    console.log(data);
    if (error) throw error;
  } catch (err) {
      res.status(500).send('Server error');
  }
});

// ------- search
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

// ------------- get all

app.get('/Books', async (req, res) => {

  // already switched to supabase
    try {
      let { data: Books, error } = await supabase
      .from('Books')
      .select('*')
      .range(0, 31)
      .order('id', { ascending: true })
      // console.log(Books);
      res.send(Books);
    } catch (err) {
      // console.log(err)
    }
})
app.get('/Movies', async (req, res) => {

  // already switched to supabase
    try {
      let { data: Movies, error } = await supabase
      .from('Movies')
      .select('*')
      .range(0, 31)
      .order('id', { ascending: true })

      // console.log(Movies);
      res.send(Movies);
    } catch (err) {
      // console.log(err)
    }
})
app.get('/VideoGames', async (req, res) => {


  // already switched to supabase
    try {
      let { data: VideoGames, error } = await supabase
      .from('VideoGames')
      .select('*')
      .range(0, 31)
      .order('id', { ascending: true })
      
      // console.log(VideoGames);
      res.send(VideoGames);
    } catch (err) {
      // console.log(err)
    }
})

// ------------ liked books
app.get('/getLikedBooks/:uid', async (req, res) => {

  const uid = req.params.uid

  console.log(uid)

  try {
    let { data: Books, error } = await supabase
    .from('likedBooks')
    .select('*, Books( * )')
    .eq('uid', uid)

    res.send(Books);
  } catch (err) {
    // console.log(err)
  }
})
app.post('/removeLikedBooks', async (req, res) => {

	const uid = req.body.uid;
	const itemId = req.body.itemId;

	console.log(`Removing book ${itemId}`)

	try {
		let { data: Books, error } = await supabase
		.from('likedBooks')
		.delete()
		.eq('uid', uid)
		.eq('itemId', itemId)

		res.send(Books);
	} catch (err) {
		console.log(err)
	}
})
app.post('/addLikedBooks', async (req, res) => {

	const uid = req.body.uid;
	const itemId = req.body.itemId;

	console.log(`Adding book ${itemId}`)

	try {
		let { data: Books, error } = await supabase
		.from('likedBooks')
		.insert([
			{ 'uid': uid, 'itemId': itemId },
		])
		.select()

	} catch (err) {
		console.log(err)
	}
})

// ------------ liked movies
app.get('/getLikedMovies/:uid', async (req, res) => {

	const uid = req.params.uid

	console.log(uid)
  
	try {
	  let { data: Movies, error } = await supabase
	  .from('likedMovies')
	  .select('*, Movies( * )')
	  .eq('uid', uid)

	  console.log(Movies)
  
	  res.send(Movies);
	} catch (err) {
	  console.log(err)
	}
})
app.post('/removeLikedMovies', async (req, res) => {

  const uid = req.body.uid;
  const itemId = req.body.itemId;

  console.log(`Removing movie ${itemId}`)

  try {
    let { data: Movie, error } = await supabase
    .from('likedMovies')
    .delete()
    .eq('uid', uid)
    .eq('itemId', itemId)

  } catch (err) {
    console.log(err)
  }
})
app.post('/addLikedMovies', async (req, res) => {

	const uid = req.body.uid;
	const itemId = req.body.itemId;

	console.log(`Adding Movie ${itemId}`)

	try {
		let { data: Movies, error } = await supabase
		.from('likedMovies')
		.insert([
			{ 'uid': uid, 'itemId': itemId },
		])
		.select()

	} catch (err) {
		console.log(err)
	}
})

// ------------ liked videogames
app.get('/getLikedVideoGames/:uid', async (req, res) => {

	const uid = req.params.uid

	console.log(uid)
  
	try {
	  let { data: VideoGames, error } = await supabase
	  .from('likedVideoGames')
	  .select('*, VideoGames( * )')
	  .eq('uid', uid)

	  console.log(VideoGames)
  
	  res.send(VideoGames);
	} catch (err) {
	  console.log(err)
	}
})
app.post('/removeLikedVideoGames', async (req, res) => {

	const uid = req.body.uid;
	const itemId = req.body.itemId;
  
	console.log(`Removing Videogame ${itemId}`)
  
	try {
	  let { data: VideoGames, error } = await supabase
	  .from('likedVideoGames')
	  .delete()
	  .eq('uid', uid)
	  .eq('itemId', itemId)
  
	} catch (err) {
	  console.log(err)
	}
  })
app.post('/addLikedVideoGames', async (req, res) => {

	const uid = req.body.uid;
	const itemId = req.body.itemId;

	console.log(`Adding Video Game ${itemId}`)

	try {
		let { data: VideoGames, error } = await supabase
		.from('likedVideoGames')
		.insert([
			{ 'uid': uid, 'itemId': itemId },
		])
		.select()

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
        // console.log("inserver ", rows);
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
        // console.log(query);
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
    } catch (err) {
      console.error(err);
    }
  }
})

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


// SharedList.jsx: get and set the username
app.get('/username/:userID', async (req, res) => {
  console.log("fetching username");
  const userID = req.params.userID;
  console.log(userID);
  try {
    let { data: userName, error } = await supabase
    .from('Users').select('username')
    .eq('id', userID)
    console.log(userName);
    res.send(userName);
  } catch (err) {
    // console.log(err)
  }
})

// SharedList.jsx: get the accessed lists for that user
app.get("/getAccessedLists/:userName", async (req, res) => {
  console.log("fetching accessed lists");
  const userName = req.params.userName;
  try {
    let { data: Lists, error } = await supabase
    .from('AccessLists').select('tableID')
    .eq('userID', userName)
    console.log(Lists);
    res.send(Lists);
  } catch (error) {
    console.error(error);
  }
});

// SharedList.jsx: get the list from the table
app.get("/gettable/:tableName", async (req, res) => {
  console.log("fetching table");
  const tableName = req.params.tableName;
  try {
    let { data: Lists, error } = await supabase
    .from(tableName).select("*")
    res.send(Lists);
  } catch (err) {
    console.error(err);
  }
});

// SharedList.jsx: add into shared list
app.post("/addToList/:access", async (req, res) => {
  console.log("adding to list");
  const access = req.params.access;
  const categories = req.body.categories;
  const itemID = req.body.itemID;
  try {
    let { data: Lists, error } = await supabase
    .from(access).insert([
      { 'category': categories, 'itemID': itemID },
    ])
    .select("*")
    res.send(Lists);
  } catch (err) {
    console.error(err);
  }
});

// SharedList.jsx: delete from shared list
app.delete("/deleteFromList/:access", async (req, res) => {
  console.log("deleting from list");
  const access = req.params.access;
  const deleteCategories = req.body.categories;
  const itemID = req.body.itemID;
  console.log(access, deleteCategories, itemID)
  try {
    const { error } = await supabase
    .from(access).delete()
    .eq('category', deleteCategories)
    .eq('itemID', itemID)
    res.send({category: deleteCategories, itemID: itemID});
  } catch (err) {
    console.error(err);
  }
});

// test to see if the connection is working
app.listen(3002, () => {
  console.log('App is running')
})
