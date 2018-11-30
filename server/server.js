const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose} = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json()); // use body-parser as middleware

// Create a new document in collection todos
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => { // save() returns a Promise => use .then
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/1234324 by id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id; // -> id comes from POSTMAN request

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
