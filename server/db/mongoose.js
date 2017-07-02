var mongoose = require('mongoose');


mongoose.Promise = global.Promise; //Mongoose is going to use the built in Promise.
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};