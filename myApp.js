const express = require('express');
const app = express();



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/json", function (req, res) {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({
      message: response.toUpperCase()
    });
  } else {
    res.json({
      message: response
    });
  }
});



app.use("/public", express.static(__dirname + "/public"));

app.listen(3500, () => {
  console.log('Server is running on http://localhost:3500');
});

module.exports = app;