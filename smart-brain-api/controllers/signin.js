
const handleSignin = (req, res, db, bcrypt)=>{
    const { email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect form submmission');
    }
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
}

module.exports = {
    handleSignin: handleSignin
}