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
> "scripts": {  
>    "test": "echo \"Error: no test specified\" && exit 1",  
>    "start": "nodemon index.js"  
>  },  

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

## Setting up frontend

In 'client' folder, create a React project

> $ npx create-react-app .

To start the application:

> $ npm start

In 'src' folder, remove these files: index.css, logo.svg, setupTests.js

Remove 'import './index.css';' from index.js.

Clean up App.css, only keep the following code:

> .App {  
>   text-align: center;  
> }

Clean up App.js, the content should looks like below

> import './App.css';
> 
> function App() {  
>   return (  
>     <div className="App"></div>  
>   );  
> }
> 
> export default App;


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

> -- Import cors package  
> const cors = require('cors');
> 
> -- Use cors as the middleware  
> app.use(cors());

### Notes:

For Switch from react-router-dom: In react-router-dom v6, "Switch" is replaced by "Routes".

> import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

For component prop in <Route>: In V6, you can't use the component prop anymore. It was replaced in favor of element.

> <Route path='/' exact element={<Home />} />

For *useHistory* from react-router-dom: In V6, useHistory is replaced by
*useNavigate*. So:

>  let history = useHistory();  
>  history.push('/path');

has become:

>  let navigate = useNavigate();
>  navigate('/path');

If encounter the error:

> TypeError: Router.use() requires middleware function but got a Object

In any one of your js pages, if your are using express and doing

> const router = express.Router();

make sure you are not missing

> module.exports = router;



