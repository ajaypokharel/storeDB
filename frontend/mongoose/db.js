const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ajaypokharel8:1dLy9RwrlGJ9nxwp@cluster1.qpmqfui.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));

module.exports = mongoose.connection;
