// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');
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

  // // findOneAndUpdate(filter, update, option, cb)
  // collection.findOneAndUpdate({
  //   _id: new ObjectID('5bee93cd0257df83f13a964a')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res);
  // });
  collection = db.collection('Users');
  collection.findOneAndUpdate({
    _id: new ObjectID('5beb10be4b9c14776fe660b3')
  }, {
    $set: {name: 'Colette'},
    $inc: {age: 30}
  }, {
    returnOriginal: false
  })
  .then((res) => {
    console.log(res);
  });

  //  client.close();
});
