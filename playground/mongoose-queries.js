const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "5bfc14077255eb1dd2f59986";

// Validate incorrect id
if (!ObjectID.isValid(id)) {
  console.log('ID is not valid!');
}

// generic find: mongodb returns an array of todo documents
Todo.find({
  completed: false
}).then((todos) => {
  console.log('Todos array:', todos);
});

// findOne: mongodb only returns 1 todo document
// no Todos but Todo instead
Todo.findOne({
  _id: id
}).then((todo) => {
  console.log('Todo record:', todo);
});

// findByID: mongodb only returns 1 todo document
// corresponding to the ID queried
// only pass the id var to the method!
Todo.findById(id).then((todo) => {
  if(!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by Id:', todo);
}).catch((e) => console.log(e));

// User findByID: only pass the id var to the method!
// User.findById('5beff8d72e711c1f67fcd048').then((user) => {
//   if (!user) {
//     return console.log('Id not found');
//   }
//   console.log('User by id:', JSON.stringify(user, undefined, 2));
// }).catch((e) => console.log(e));
