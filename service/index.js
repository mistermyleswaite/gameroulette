const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb://mongo:${config.password}@ac-eeex6zp-shard-00-00.1q1lgfr.mongodb.net:27017,ac-eeex6zp-shard-00-01.1q1lgfr.mongodb.net:27017,ac-eeex6zp-shard-00-02.1q1lgfr.mongodb.net:27017/?ssl=true&replicaSet=atlas-t1g0oh-shard-0&authSource=admin&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;


const app = express();
const authCookieName = "token";

// let users = [];
// let userStates = [];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await db.collection('users').findOne({ email: req.body.email })) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      token: uuid.v4()
    };
    await db.collection('users').insertOne(user);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await db.collection('users').findOne({ email: req.body.email });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const newToken = uuid.v4();

    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { token: newToken } }
    );

    setAuthCookie(res, newToken);
    res.send({ email: user.email });
    return;
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await db.collection('users').findOne({ token: req.cookies[authCookieName] });
  if (user) {
    await db.collection('users').updateOne(
      { _id: user._id },
      { $unset: { token: "" } }
    );
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const token = req.cookies[authCookieName];
  console.log("Checking token from cookie:", token);

  if (!db) return res.status(503).send({ msg: 'Database not ready' });

  const user = await db.collection('users').findOne({ token: req.cookies[authCookieName] });
  if (user) {
    console.log("User found:", user.email);
    req.user = user;
    next();
  } else {
    console.log("No user found for this token.");
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// get userState - only pulls the isolated user's state
apiRouter.get('/lists/get', verifyAuth, async (req, res) => {
  try {
    const state = await db.collection('lists').findOne({ email: req.user.email });

    if (state) {
        res.send(state);
    } else {
        res.send ({
            email: req.user.email,
            unsorted: [],
            sorted: { UPNX: [], ALPD: [], BKLG: [], PTOD: [] }
        });
    }
  } catch (err) {
    console.error("Error in /lists/get:", err);
    res.status(500).send({ msg: 'Internal Server Error, idiot!'})
  }
});

// post userState - isolates only the current user to update their state
apiRouter.post('/lists', verifyAuth, async (req, res) => {
  const { unsorted, sorted } = req.body;
  await db.collection('lists').updateOne(
    { email: req.user.email },
    { $set: {email: req.user.email, unsorted, sorted } },
    { upsert: true }  
  );

  res.send({unsorted, sorted });
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// function updateUserStates(email, unsorted, sorted) {
//   const index = userStates.findIndex((u) => u.email === email);
  
//   const newState = {
//     email: email,
//     unsorted: unsorted || [],
//     sorted: sorted || { UPNX: [], ALPD: [], BKLG: [], PTOD: [] },
//   };

//   if (index !== -1) {
//     userStates[index] = newState;
//   } else {
//     userStates.push(newState);
//   }
//   return newState;
// }

// async function createUser(email, password) {
//   const passwordHash = await bcrypt.hash(password, 10);

//   const user = {
//     email: email,
//     password: passwordHash,
//     token: uuid.v4(),
//   };
//   users.push(user);

//   return user;
// }

// async function findUser(field, value) {
//   if (!value) return null;

//   return users.find((u) => u[field] === value);
// }

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  });
}

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('gamesort'); 
    console.log("Database initialized and ready!");
  } catch (err) {
    console.error("Database connection failed AGAIN", err);
  }
}

connectToDatabase();

app.listen(port, () => {
  console.log(`Server is holding the line on port ${port}`);
});
