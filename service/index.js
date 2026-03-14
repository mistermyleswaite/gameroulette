const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const app = express();

const authCookieName = "token";

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.get('/api/status', (_req, res) => {
  res.send({ msg: 'Startup service is active' });
});

app.listen(port, () => {
  console.log(`Server is holding the line on port ${port}`);
});