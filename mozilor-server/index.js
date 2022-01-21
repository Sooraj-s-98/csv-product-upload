require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const authorize = require('_middleware/authorize');
const busboyBodyParser = require('busboy-body-parser');
global.__basedir = __dirname + "/..";

  app.use(function (req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //   res.header("Access-Control-Allow-Credentials", true);
  //   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE,OPTIONS");
  //   res.header(
  //       "Access-Control-Allow-Headers",
  //       "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   if (req.method === "OPTIONS") {
  //     return res.status(200).end();
  // }
    next();
});
var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false  
  // ,keepExtensions: true, uploadDir: "uploads" 
}));
app.use(bodyParser.json());
app.use(busboyBodyParser());
// api routes
app.use('/users', require('./users/users.controller'));
app.use('/product', cors(corsOptions),authorize(),  require('./product/product.routes'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));