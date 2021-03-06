require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => { 
     const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });

});

app.get('/todos', authenticate, (req,res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (error) => {
        res.status(400).send(error);
    })

});


app.get('/todos/:id', authenticate, (req, res) => {
    const _id = req.params.id;
        if(!ObjectID.isValid(_id)){
             return res.status(404).send(); //send empty body
 };
    Todo.findOne(
        {
        _id:_id, 
         _creator: req.user._id
        }).then((todo) => {
        //console.log({todo});
        if(!todo) {
            return res.status(404).send();
        }

        return res.send({todo});
    }).catch((error) => {
         res.status(400).send();
 
    });

});

app.delete('/todos/:id', authenticate,(req, res) => {
    const _id = req.params.id;
        if(!ObjectID.isValid(_id)){
            return res.status(404).send();
        };
    Todo.findOneAndRemove({_id:_id, _creator: req.user.id}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
            return res.status(200).send({todo});
    }).catch((error) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
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
    Todo.findOneAndUpdate({_id:_id, _creator: req.user.id}, {$set: body}, {new: true}).then((todo) => {//'new' returns the new obj
        if (!todo){
            return res.status(404).send();
        }
            res.send({todo});
        }).catch((error) => {
            res.status(400).send();
        })
    

});

    app.post('/users', (req,res) =>{
        var body = _.pick(req.body, ['email', 'password']);
        var user = new User(body);

        user.save().then(() => {
          return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
    }).catch((error) => {
            res.status(400).send(error);
    })

});



app.get('/users/me', authenticate, (req, res) => { //Private route
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
       return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => { //reject() works with .catch
        res.status(400).send();
    });
});
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(()=> {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});



//         res.send(req.params);
//         console.log(req.params);

app.listen(PORT,() => {
    console.log(`Started server on port ${PORT}`);
});

module.exports= {app};