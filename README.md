# Full Stack Web Development Course | ReactJS, NodeJS, Express, MySQL

Author: PedroTech  
Date: Apr 02, 2021  

Started: Feb 24, 2022  
End: TBU  

This is a code along session from a YouTube playlist by PredroTech:
https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=1  

## Setting up backend:
In backend/server folder, run:  

> $ npm init

### Packages:
In backend/server folder, install these packages:

- *express* is the framework we use for creating Rest API in NodeJS
- *cors* is to make the connection between the frontend (ReactJS) and the server (NodeJS)
- *mysql2* is used to connect to the database and serve SQL queries

> $ npm install express cors nodemon

Install *nodemon* package, this package will restart the server everytime we save our changes

> $ npm install nodemon

Add the *start* script to the scripts section of package.json.

```json
"scripts": {  
   "test": "echo \"Error: no test specified\" && exit 1",  
   "start": "nodemon index.js"  
 },  
```

Next, create a MySQL database for this tutorial. The database named we use is 'PedroTechFullStackDB'.

Install SQL ORM packages. These packages allows querying and manipulating data from a database using an object-oriented paradigm.

> $ npm install sequelize sequelize-cli

Run sequilize init to setup folders in server folder.

> $ sequelize init  
> or  
> $ npx sequlize init

Remove 'migrations' and 'seeders' folders.

App for Test APIs:  
https://insomnia.rest/download

Install *bcrypt* package for string hashing implementation. This will help with encryt user's password when implementing user's login page.

> npm install bcrypt

Install *jsonwebtoken (jwt)* for stateless authentication mechanisms for users and providers, this means maintaining session is on the client-side instead of storing sessions on the server. This will help with implementing secured session after user logged in.

> $ npm install jsonwebtoken

To use jwt:

```javascript
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

### Notes:

==Validation middleware==  
When we make a request (such as adding a comment to a post), we will also pass some sort of validation middleware to the request. This will check to see if the user has the correct jwt token stored in his session storage.

## Setting up frontend

In 'client' folder, create a React project

> $ npx create-react-app .

To start the application:

> $ npm start

In 'src' folder, remove these files: index.css, logo.svg, setupTests.js

Remove 'import './index.css';' from index.js.

Clean up App.css, only keep the following code:

```javascript
.App {  
  text-align: center;  
}
```

Clean up App.js, the content should looks like below

```javascript
import './App.css';

function App() {  
  return (  
    <div className="App"></div>  
  );  
}

export default App;
```


### Install Pakages

Install *axios* package to make API requests

> npm install axios

Install *react-router-dom* so we can create different routes and urls for our app

> npm install react-router-dom

Install *formik* to control form.

> npm instal formik

Here are some info about Formik:

Formik is a small group of React components and hooks for building forms in React and React Native. It helps with the three most annoying parts:

1. Getting values in and out of form state
2. Validation and error messages
3. Handling form submission

Install *yup* package for value parsing and validation. It is useful for perform user input validation to the form.

> npm install yup

### Setting up whitelist for the localhost

When running 'npm start' in client folder, we will see this error:

> Access to XMLHttpRequest at 'http://localhost:3001/posts' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

To fix this, set the whitelist for CORS. So in the index.js in server folder.

```javascript
-- Import cors package  
const cors = require('cors');

-- Use cors as the middleware  
app.use(cors());
```

### Notes:

For Switch from react-router-dom: In react-router-dom v6, "Switch" is replaced by "Routes".

```javascript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
```

For component prop in <Route>: In V6, you can't use the component prop anymore. It was replaced in favor of element.
 
```javascript
<Route path='/' exact element={<Home />} />
```

For *useHistory* from react-router-dom: In V6, useHistory is replaced by
*useNavigate*. So:

```javascript
let history = useHistory();  
history.push('/path');
```

has become:

```javascript
let navigate = useNavigate();
navigate('/path');
```

If encounter the error:

> TypeError: Router.use() requires middleware function but got a Object

In any one of your js pages, if your are using express and doing

```javascript
const router = express.Router();
```

make sure you are not missing

```javascript
module.exports = router;
```

## 09 JWT Authentication

1. Install jsonwebtoken to generate token
    > npm install jsonwebtoken
2. Create an Access Token using 'sign' function from jsonwebtoken
3. Create a Middleware to validate token being sent from server side
3. Apply the Token Validate middleware to all api in backend that require user to sign in
    - server/routes/Comments.js
4. In frontend, add the Access Token in Session Storage to the Header for ajax requests that require user to sign in
    - client/src/pages/Post.js  ->  addComment
5. In addComment in client/src/pages/Post.js, check for error being returned from backend
6. Navigate users to Home page after they successfully logged in

## 10 Auth in the Frontend

We want to add the username to the comment:

1. Drop/Delete the Comments table in the database
2. In backend, add 'username' column to the Comments model. Then, we restart the server to recreate the table.
3. Extract the username info from validateToken function in AuthMiddleware.js
4. Update the post('/') api in server/routes/Comments.js
5. In client/src/pages/Post.js, update the comment display to include the username

We want to remove the Login and Registration parts in nav bar when users logged in, and we want to do frontend authentication correctly


1. Store the token in local storage instead of session storage.
    - If we use session storage, all information will be lost when we close the browser tab.
    - client/src/pages/Login.js
    - client/src/pages/Post.js
2. Hide Login and Registration parts in nav bar (client/src/App.js)
3. Create a Context variable to store information about user including whether the user is authenticated or not.
    - Create client/src/helpers/AuthContext.js
    - Provide AuthContext for all components in App.js
    - In App.js create our Authentication State using useState from React
    - In Login.js, set the authentication state to true after user successfully logged in
    - In App.js, use useEffect to check and ensure the authentication state is set correctly when the page reload.
    - Create a new end point api to validate user's token. This will prevent fake token being injected into the browser. In server/routes/Users.js, create a new end point get('/auth')

## 11 Logging Out

1. Add Log Out option in client/src/App.js
2. Show username on the nav bar when users logged in
    - update authState to an object that keeps track of username, user id and user status (logged in or not)
    - check and update authState value of all requests and routes
3. Give option to delete comment
    - Create a Delete route in server/routes/Comments.js
    - In client/src/pages/Post.js
      - Add delete button to comments that a user can delete
      - Create a Delete request to delete a comment
    


