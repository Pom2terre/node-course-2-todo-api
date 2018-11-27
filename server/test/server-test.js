const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First todo test' // dummy seed element for the
  }, {
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
    .get('/ttodos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});
