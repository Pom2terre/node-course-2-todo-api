const {ObjectID} = require('mongodb')
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove{}.then((result) => { // w/o criteria, everything will be deleted!
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndDelete({_id: '5c0aa3e373e6bd318ae73a5b'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5c0aac641b16e088d0e60708').then((todo) => {
  console.log(todo);
});
