const express = require('express');
const app = express();
//-- Import cors package
const cors = require('cors');

app.use(express.json());
//-- Use cors as the middleware
app.use(cors());

//-- import database models from models folder
const db = require('./models');

//-- Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);

db.sequelize.sync().then(() => {
  //-- Listen to port number 3001 where the server is running on
  //-- Note that the port number should be different than the port number for
  //--   our frontend (React)
  app.listen(3001, () => {
    console.log('Server running on port');
  });
});
