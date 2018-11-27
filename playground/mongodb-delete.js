// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true
});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  var db = client.db(dbName);
  var collection = db.collection('Todos');

  // deleteMany()
    // collection.deleteMany({text: 'Go for shopping'}).then((res) => {
    //   console.log(res);
    // });

  // deleteOne()
    // collection.deleteOne({text: 'eat lunch'}).then((res) => {
    //   console.log(res);
    // });

  // findOneAndDelete()
    collection.findOneAndDelete({completed: true}).then((res) => {
      console.log(res);
    });


    //  client.close();
});
