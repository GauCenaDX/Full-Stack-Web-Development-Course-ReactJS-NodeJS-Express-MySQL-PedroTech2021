## Full Stack Web Development Course [1] | ReactJS, NodeJS, Express, MySQL

Author: PedroTech  
Date: Apr 02, 2021  

Started: Feb 24, 2022  
End: TBU  

This is a code along session from a YouTube video by PredroTech:
https://www.youtube.com/watch?v=Hl7diL7SFw8&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=1  

### Initialize backend:
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


