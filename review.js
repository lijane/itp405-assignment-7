var express = require('express');
var mysql = require('mysql');
var app = express();
var findAll = require('./src/findAll');

// app.get('/songs/:id', function (request, response) {

//   getSong(request.params.id).then(function(song) {
//   	response.json(song);
//   }, function(error) {
//   	console.log(error);
//   	response.json(error);
//   });
// });

app.get('/api/v1/reviews', function(request,response){
	
	findAll().then(function(review){
		response.json(review);
	}, function(error){
		console.log(error);
		response.json(error);
	});
});

app.listen(8000);

