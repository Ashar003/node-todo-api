var express = require('express');
var bodyParser = require('body-Parser');


var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => { 
     var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

});




app.listen(PORT,() => {
    console.log(`Started server on port ${PORT}`);
});