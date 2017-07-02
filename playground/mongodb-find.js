//const MongoClient = require('mongodb').MongoClient; //Pull off MongoClient method from library
const { MongoClient, ObjectID} = require('mongodb'); //Object Destructuring



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server'); //Return to prevent success message; Could also write else.
    }
    console.log('Connected to MongoDb server');
 
    // db.collection('Todos').find({
    //     _id: new ObjectID('595918faaa912dffdf0c1d63') //Query database with a specific id
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({
        name:'Akash'
    }).toArray().then((docs) => {
        console.log(`Arrays with name of Akash: ${JSON.stringify(docs, undefined, 2)}`);
    }, (err) => {
        console.log('Unable to fetch User arrays with name Akash', err);
    // }).count().then((count) => {
    //     console.log(`Users with name of Akash: ${count}`)
    // }, (err) => {
    //     console.log('Unable to fetch the number of Akashs', err);
    });

   // db.close(); //disconnect from server 
});