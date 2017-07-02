const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '595977f4cca438511f930b7711';
const userId= '59595b440dfb18c718785ed3';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(`Todos, ${todos}`);
//  //returns as a object
// });

// Todo.findOne({ //Use for other properties
//   _id: id
// }).then((todo) => {
//     console.log(`Todo, ${todo}`);
// //returns as a obj
// });

// Todo.findById(id).then((todo) => { //Use only for Id
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log(`Todo By Id, ${todo}`);
// }).catch((error) => console.log(error)); 

// //returns as a obj

//user.findById

User.findById(userId).then((user) => {
    if(!user){
        return console.log('User not found');
    }
    console.log(`Email , ${user}`);
}).catch((error) => console.log(error));