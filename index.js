// index.js
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
app.get("/api/:ts?", function (req, res) {
  let result;
  let datePattern = new RegExp(/[0-9]{4}-[0-1]{1}[0-9]{1}-[0-9]{2}/);
  let d = req.params.ts
  console.log(d)

  if(!d){
    d = Date.now()
    d = new Date(d)
    result = {unix: d.getTime(), utc: d.toUTCString() }
  }
  // is a timestamp
  if( !isNaN(req.params.ts) ){
    d = new Date(parseInt(d))
    result = {unix: d.getTime(), utc: d.toUTCString() }
  }
  // is a date with YYYY-MM-DD format
  else if( datePattern.test(req.params.ts) ){
    d = new Date(d)
    result = {unix: d.getTime(), utc: d.toUTCString() }
  }
  else if( new Date(d) !== "Invalid Date" ){
    d = new Date(d)
    result = {unix: d.getTime(), utc: d.toUTCString() }
  }
  // wrong input type
  else {
    result = {error: "Invalid Date"}  
  }

  res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
