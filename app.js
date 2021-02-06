var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var mysql = require('mysql');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/:id', function(req, res) {
    let id = req.params.id; 
    console.log(id);
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'sql_store'
      });

      connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
        query = `SELECT * FROM customers WHERE customer_id = ${id}`;
        connection.query(query, function (err, result, fields) {
          console.log(result);
          res.json({"hello":"asd"});
        });
      });   
});

// more routes for our API will happen here

router.route('/')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let birth_date = req.body.birth_date;
        let phone = req.body.phone;
        let address = req.body.address;
        let city = req.body.city;
        let state = req.body.state;
        let points = req.body.points;

        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sql_store'
        });

        connection.connect(function(err) {
            if (err) {
              return console.error('error: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
            query = `INSERT INTO customers (first_name, last_name, birth_date, phone, address, city, state, points) VALUES ("${first_name}", "${last_name}", "${birth_date}", "${phone}", "${address}", "${city}", "${state}", "${points}")`;
            console.log(query);
            connection.query(query, function (err, result, fields) {
              console.log(result);
              res.json(result);
            });
        });   
    });

router.route('/:id')
    .delete(function(req, res) {
        let id = req.params.id;
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sql_store'
        });

        connection.connect(function(err) {
            if (err) {
              return console.error('error: ' + err.message);
            }
            console.log('Connected to the MySQL server.');
            query = `DELETE FROM customers WHERE customer_id = ${id}`;
            connection.query(query, function (err, result, fields) {
              console.log(result);
              res.json(result);
            });
        });   
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);