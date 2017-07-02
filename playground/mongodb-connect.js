//const MongoClient = require('mongodb').MongoClient; //Pull off MongoClient method from library
const { MongoClient, ObjectID} = require('mongodb'); //Object Destructuring



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server'); //Return to prevent success message; Could also write else.
    }
    console.log('Connected to MongoDb server');
 
    // db.collection('Todos').insertOne({  //Todos collection part of the TodoApp up there^.
    //     text: 'Something to do',
    //     completed: false
    //     //InsertOne object ^^.
    // }, (err, result) => { //callback func.
    //     if (err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //Insert new doc into Users ( name,age location)

    // db.collection('Users').insertOne({ //Users collection part of the TodoApp.
    //     name: 'Akash',
    //     age: 20,
    //     location: 'New York'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user', err);
    //     }
    //     // console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close(); //disconnect from server 
});