var mongoose = require('mongoose');


mongoose.Promise = global.Promise; //Mongoose is going to use the built in Promise.
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};

