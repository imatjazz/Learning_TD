const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '71e181476c814fa5a6f6d475f8841e62'
  });

const handleApiCall = (req, res) => {
    const { input } = req.body;
    // res.json(input);
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db)=>{
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
           res.json(entries[0]);
        })
        .catch(err => res.sendStatus(400).json('unable to get entries'));
}


module.exports = {
    handleImage,
    handleApiCall
}