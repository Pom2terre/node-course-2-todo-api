// Original way to initialize a MongoClient object:
// const MongoClient = require('mongodb').MongoClient;

// New option using ES6 object destructuring.
// result = 2 objects assigned to variables MongoClient and ObjectID:
const { MongoClient, ObjectID } = require('mongodb');

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

// Create a new MongoClient instance
const client = new MongoClient(url, {
  useNewUrlParser: true
});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  var db = client.db(dbName);
  var collection = db.collection('Todos');

  // Insert new record into Todos collection
  collection.insertOne({
    text: 'Something to do',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert a todo record', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  collection = db.collection('Users');

  // Insert new record into Todos collection
  collection.insertOne({
    name: 'Bertrand',
    age: 55,
    location: 'Champion (CH)'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert a user record', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  client.close();
});
