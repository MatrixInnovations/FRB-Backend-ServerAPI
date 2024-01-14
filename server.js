const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const database = knex({
  client: 'pg',
  connection: {
    host : 'oregon-postgres.render.com',
    user : 'mindgamesdb_qvf3_user',
    password : 'brdXDP9eAIVIUcmWROGuOcSv7CaDzx8w',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors())
app.use(express.json()); 

// Welcome message for the root endpoint
app.get('/', (req, res)=> { res.send('Welcome to the Smart Brain API')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, database, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, database)})
app.put('/image', (req, res) => { image.handleImage(req, res, database)})
app.post('/imageurl', (req, res) => { image.handleApicall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
