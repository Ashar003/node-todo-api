const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

    var UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true, //Prevent two of the same emails
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            } 
         },
         password: {
             type: String,
             require: true,
             minlength: 6
         },
         tokens: [{
             access: {
                type: String,
                required: true
             },
             token: {
                type: String,
                required: true
             }
         }]
    });

    UserSchema.methods.toJSON = function () { //Here we decide what gets sent back with a mongoose model is converted into a JSON value.
        var user = this;
        var userObject = user.toObject()

        return _.pick(userObject, ['_id', 'email']); //The id and email is picked and sent back.
    }

    UserSchema.methods.generateAuthToken = function () {
        var user = this; //this points to whatever user created it.
        var access = 'auth';
        var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

        user.tokens.push({access, token});

       return user.save().then(() => {
            return token;
        });
    };

    //These two methods above are instance methods
    
    UserSchema.statics.findByToken = function (token) {  //Model method
        var User = this; //The entire model
        var decoded;

        try {
            decoded = jwt.verify(token, 'abc123');
        } catch (e){
            return Promise.reject(); //Easier way to reject, and we can pass a value in 
        }

       return User.findOne({   //returns a callback which we use in server.js
           '_id': decoded._id,
           'tokens.token': token,
           'tokens.access': 'auth'
           
       })
    };

    var User = mongoose.model('User', UserSchema);
module.exports = {User};