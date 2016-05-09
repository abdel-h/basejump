var express = require('express');
var app = express();
var moment = require('moment');
var path = require('path');

app.get('/', function(req, res) {
	var fileName = path.join(__dirname, 'public/index.html');
	res.sendFile(fileName, function(err) {
		if(err) res.send(err.status).end();
	});
});


app.get('/:date', function(req, res) {
	var date;
	if(!isNaN(req.params.date)) { // Unix timestamp 
		date = moment(req.params.date, 'X');
	} else {
		date = moment(req.params.date, 'MMM D, YYYY');
	}
	if(date.isValid()) {
		res.json({
			unix: date.format('X'),
			natural: date.format('MMM D, YYYY')
		});
	} else {
		res.json({
			unix: null,
			natural: null
		});
	}
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});