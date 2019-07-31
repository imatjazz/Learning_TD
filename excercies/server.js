const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/',(req, res)=>{
    res.send('Hellooooo')
});

app.get('/profile', (req,res)=>{
    res.send('getting profile');
});

app.post('/profile', (req,res)=>{
    console.log(req.body);
    res.send('Success');
    // const user={
    //     name: 'Tim',
    //     hobby: 'soccer'
    // }
    // res.send(user);
})

app.listen(3000);