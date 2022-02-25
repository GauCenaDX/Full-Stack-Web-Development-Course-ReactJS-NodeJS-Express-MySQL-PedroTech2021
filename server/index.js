const express = require('express')
const app = express()

app.use(express.json())

//-- import database models from models folder
const db = require('./models') 

//-- Routers
const postRouter = require('./routes/Posts')
app.use('/posts', postRouter)

db.sequelize.sync().then(() => {
  //-- Listen to port number 3001 where the server is running on
  //-- Note that the port number should be different than the port number for
  //--   our frontend (React)
  app.listen(3001, () => {
    console.log('Server running on port')
  });
});
