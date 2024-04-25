
const express = require('express');
const db = require('./db');
const sessionRoutes = require('./routing/sessionRoutes');

const app = express();
var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use('/sessions', sessionRoutes);

db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
