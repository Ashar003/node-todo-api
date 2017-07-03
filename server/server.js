const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');


var app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => { 
     const todo = new Todo({
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
    const id = req.params.id;
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

app.delete('/todos/:id', (req, res) => {
    const _id = req.params.id;
        if(!ObjectID.isValid(_id)){
            return res.status(404).send();
        };
    Todo.findByIdAndRemove(_id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
            return res.status(200).send({todo});
    }).catch((error) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var _id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(_id)){
            return res.status(404).send();
        }

    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;

    }
    Todo.findByIdAndUpdate(_id, {$set: body}, {new: true}).then((todo) => {//'new' returns the new obj
        if (!todo){
            return res.status(404).send();
        }
            res.send({todo});
        }).catch((error) => {
            res.status(400).send();
        })
    

});

//         res.send(req.params);
//         console.log(req.params);

app.listen(PORT,() => {
    console.log(`Started server on port ${PORT}`);
});

module.exports= {app};