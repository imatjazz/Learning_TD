const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'TimDo',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Tim',
            email: 'tiendo@kpmg.com.au',
            password: 'yumyum',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Dylan',
            email: 'dylan@kpmg.com.au',
            password: 'roblox',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=>{ res.send(database.users)})

app.post('/signin', (req,res)=>{signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res)=>{profile.handleProfile(req, res, db)})

app.put('/image', (req,res)=>{image.handleImage(req,res, db)})
   
app.post('/imageurl', (req,res)=>{image.handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log('App is running on port 3000')
})















