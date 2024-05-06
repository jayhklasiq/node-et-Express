const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')

app.use("/", function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase')
  {
    res.json({
      message: response.toUpperCase()
    });
  } else {
    res.json({
      message: response
    });
  }
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word })
});


//This is an api endpoint mounted at GET/name with the first and last name encoded in a query string. 
app.route("/name")
.get(function(req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
})
.post(function(req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName })
    ;
});


//this api uses the body-parser middleware to parse the request body and return the parsed data in the response.

app.post('/submit-form', function(req, res){
  const formData = req.body;
  res.send(formData);
});



app.listen(3500, () => {
  console.log('Server is running on http://localhost:3500');
});

module.exports = app;
