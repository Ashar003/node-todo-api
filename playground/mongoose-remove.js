const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//  Todo.remove({}).then((result) => { //doesn't return deleted object
//      console.log(result);
//  });

 //Todo.findOneAndRemove -returns the deleted object

 Todo.findOneAndRemove({_id: '595a7cc1f22ba8ef8edb11d4'}).then((todo) => {

 });

 //Todo.findByIdAndRemove - retusn the deleted object

//  Todo.findByIdAndRemove('595a7cc1f22ba8ef8edb11d4').then((todo) => {
//     console.log(todo);

//  });