// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


const getTimestamp = (req, res, next) => {
  let dateString = req.params.date_string;

  const isnum = /^\d+$/.test(dateString);
  isnum ? dateString = Number(dateString) : null;

  const date = new Date(dateString);
  
  date == 'Invalid Date' ? res.json({error: "Invalid Date"}) : null;

  const unix = date.valueOf();
  const humanReadable = date.toUTCString();

  res.json({ 
    unix: unix ,
    utc: humanReadable
  })
}

const getTimestampNew = (req, res, next) => {
  const date = new Date();

  const unix = date.valueOf();
  const humanReadable = date.toUTCString();

  res.json({ 
    unix: unix, 
    utc: humanReadable 
  })
}

app.get("/api/timestamp/:date_string", getTimestamp);
app.get("/api/timestamp/", getTimestampNew);


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
