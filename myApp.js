const express = require('express');
const app = express();



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", process.env.MESSAGE_STYLE, function(req, res) {
  res.json({
    message: "Hello json",
  })
})

app.use("/public", express.static(__dirname + "/public"));

app.listen(3500, () => {
  console.log('Server is running on http://localhost:3500');
});

module.exports = app;