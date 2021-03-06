const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First todo test' // dummy seed element for the
  }, {
    _id: new ObjectID(),
    text: 'Second test todo'
  }]; // get/todos test.

beforeEach((done) => { // will run before every single test case
  Todo.deleteMany({}).then(() => { // delete all the TodaApp content!
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', function() {
  it('should create a new todo', (done) => {
    var text = 'Test todo text document';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err); // generate an error message and exit the test
        }
        Todo.find({text}) // if OK, we check the response in mongodb
          .then((todos) => { //load all the todos
            expect(todos.length).toBe(1); //only one record found see the beforeEach section
            expect(todos[0].text).toBe(text); // db text === text variable
            done();
          })
          .catch((err) => done(err));
      });
  });

  it('should NOT create a todo with invalid body data', (done) => {
    // we do not pass any text at all => invalid data!
    request(app)
      .post('/todos')
      .send({}) // send nothing
      .expect(400) // bad request
      .end((err, res) => {
        if (err) {
          return done(res);
        }
      });

    Todo.find()
      .then((todos) => {
        expect(todos.length).toBe(2);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('GET /todos',() => {
  it('should get all records from the todos collection', (done) => {

    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return a valid todo document', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end((res, err) => {
        if (err) {
          return done(res);
        }
      });
  });

  it('should return 404 for an invalid ObjectID', (done) => {
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end((res, err) => {
      if (err) {
        return done(res);
      }
    });
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});
