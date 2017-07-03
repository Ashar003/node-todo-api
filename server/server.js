var express = require('express');
var bodyParser = require('body-Parser');
var {ObjectID} = require('mongodb');


var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (error) => {
        res.status(400).send(error);
    })

});

//GET /todos/:id

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
        if(!ObjectID.isValid(id)){
             return res.status(404).send(); //send empty body
 };
    Todo.findById(id).then((todo) => {
        //console.log({todo});
        if(!todo) {
            return res.status(404).send();
        }

        return res.send({todo});
    }).catch((error) => {
         res.status(400).send();
 
    });

});

//         res.send(req.params);
//         console.log(req.params);

app.listen(PORT,() => {
    console.log(`Started server on port ${PORT}`);
});

module.exports= {app};