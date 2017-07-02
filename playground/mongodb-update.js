//const MongoClient = require('mongodb').MongoClient; //Pull off MongoClient method from library
const { MongoClient, ObjectID} = require('mongodb'); //Object Destructuring



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server'); //Return to prevent success message; Could also write else.
    }
    console.log('Connected to MongoDb server');

//findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59592249aa912dffdf0c1f94')
    // }, {
    //     $set: { //update operator from MongoDb
    //         completed: true
    //     }
    //     }, {
    //         returnOriginal: false //check MongoDb doc for. Returns updated object.
    // }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5959138d97feb31091d8a709') 
    // }, {
    //     $set: { 
    //         name: 'Akash'
    //     }
    // }, {
    //     returnOriginal: false

    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').update(
        { _id: new ObjectID('5959138d97feb31091d8a709')},
        { $inc: {age: 1}
    
     }).then((result) => {
        console.log(result);
        });

   // db.close(); //disconnect from server 
});