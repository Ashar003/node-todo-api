const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'akash@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]

}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
}
];

const todos = [
    { 
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
}, 
    {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 555,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() =>  {
      return Todo.insertMany(todos);
}). then(() => done())
};

const populateUsers = (done) => {
    User.remove({}).then(() => { //({}) passing in empty obj means remove everything.
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])//Promise.all: we wait until the tasks are completed to run cb func.
    }).then(() => done());
};

module.exports = {populateTodos, todos, users, populateUsers};