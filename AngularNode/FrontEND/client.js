// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static("./client"));

app.get("/", function(req, res) {
    res.sendFile("./client/index.html");
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});