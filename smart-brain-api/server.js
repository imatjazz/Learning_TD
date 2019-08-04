const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

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

// console.log(db.select('*').from('users'));

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

app.get('/',(req,res)=>{
    res.send(database.users);
})

app.post('/signin', (req,res)=>{
    // console.log(req.body);
    db.select('email','hash').from('login')
        .where('email','=', req.body.email)
        .then(data =>{
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log('at server.js line 60: user=> ', user);
                        return res.json(user)
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credential')
            }
            // console.log('======',data);
        })
        .catch(err => res.status(400).json('wrong credential'+ err))
    // if(req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password) {
    //         res.json('success');
    //     } else {
    //         res.status(400).json('error logging in');
    //     }
})

app.post('/register', (req,res)=>{
    const { name, email , password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
                .then(user =>{
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json(err));
    // db('users')
    //     .returning('*')
    //     .insert({
    //         name: name,
    //         email: email,
    //         entries: 0,
    //         joined: new Date()
    //     })
    //         .then(user =>{
    //             res.json(user[0]);
    //         })
    //         .catch(err => res.status(400).json('Unable to register'));

    // database.users.push({
    //     id: '125',
    //     name: name,
    //     email: email,
    //     password: password,
    //     entries: 0,
    //     joined: new Date()
    // })
    // res.json(database.users[database.users.length -1]);
    // res.send(database);
    
})

app.get('/profile/:id', (req,res)=>{
    const { id } = req.params;
    // let found = false;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                console.log(user);
                res.json(user[0]);
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err =>res.status(400).json('Error getting user'))
    // database.users.forEach(user=>{
    //     if(user.id === id){
    //         found = true;
    //         return res.json(user);
    //     } 
    // })
    // if(!found){
    //     res.status(400).json('not found')
    // }
})

app.put('/image', (req,res)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entires => {
           res.json(entires[0]);
        })
        .catch(err => res.send(400).json('unable to get entries'));
})

    // let found = false;
    // database.users.forEach(user=>{
    //     if(user.id === id){
    //         found = true;            
    //         user.entries++
    //         return res.json(user.entries);
    //     } 
    // })
    // if(!found){
    //     res.status(400).json('not found')
    // }


app.listen(3000, ()=>{
    console.log('App is running on port 3000')
})















//================================================================================================
/* PLANNING
/--> res = this is working 
/singin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
//================================================================================================
