var express = require('express');
var mysql = require('mysql');
var app = express();
var findRecord = require('./src/findRecord');

app.get('/api/v1/books/:id', function(request, response){
	
	findRecord(request.params.id).then(function(book){
		response.json(book);
	}, function(error){    
		response.status(404).json(error);
		// console.log(error);
		// response.json(error);
	});
});

app.listen(8000);