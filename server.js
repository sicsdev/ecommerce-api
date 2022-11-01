const express = require("express");
const app = express();
var http = require("http").createServer(app);
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./app/middleware/error');
const connectDB = require('./app/db/mongoose');
const routes = require('./route');

//load env variables
require('dotenv').config()
const PORT = process.env.PORT || 8800;

//loading database
connectDB();

app.set("view engine", "ejs");
app.set("views", "views");

//intializing cors
app.use(cors({ credentials: true }));

//middleware to interact with body// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('./uploads'));

//setting up morgan for development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//mapping routes
routes.map(route => {
  app.use(route.path, route.handler);
});

//our errorHandler middleware(it is after brands route becuase node executes in linear order)
app.use(errorHandler);


server = http.listen(PORT, console.log(`Server is up and running at port number ${PORT} , Mode=${process.env.NODE_ENV}`));