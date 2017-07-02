//const MongoClient = require('mongodb').MongoClient; //Pull off MongoClient method from library
const { MongoClient, ObjectID} = require('mongodb'); //Object Destructuring



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server'); //Return to prevent success message; Could also write else.
    }
    console.log('Connected to MongoDb server');
 
 //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

        // db.collection('Users').deleteMany({name: 'Akash'}).then((result) =>{
        //     console.log(result);
        // });

 //deleteOne
        // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        //     console.log(result);
        // });

 //findOneAndDelete
        // db.collection('Todos').findOneAndDelete({completed: false }).then((result) => {
        //     console.log(result);
        // });

        db.collection('Users').findOneAndDelete({_id: new ObjectID('595912ca693c0c108a87d013')}).then((result) =>{
            console.log(JSON.stringify(result, undefined, 2));
        })

    

   // db.close(); //disconnect from server 
});