var mysql = require('mysql');

function findAll (){
return new Promise(function(resolve,reject){

    var connection = mysql.createConnection({
      host     : 'itp460.usc.edu',
      user     : 'student',
      password : 'ttrojan',
      database : 'itp405-midterm'
    });

    connection.connect();
    connection.query('SELECT * FROM reviews', function(error, reviews) {
      if (error){
        reject();
      } else {
        if (reviews.length === 0){
          reject({
            errorType: 'No reviews',
          });
        } else {
          resolve(reviews);
        }
      }
    });
  });
}


 module.exports = findAll;
