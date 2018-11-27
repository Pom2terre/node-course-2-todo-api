var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tells mongoose we want to use Promises
mongoose.connect('mongodb://localhost:27017/TodaApp', {
  useNewUrlParser: true
});

module.exports = {
  mongoose
};
