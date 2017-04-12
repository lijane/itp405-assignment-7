var mysql = require('mysql');

function findRecord (id){
  return new Promise(function(resolve,reject){

    var connection = mysql.createConnection({
      host     : 'itp460.usc.edu',
      user     : 'student',
      password : 'ttrojan',
      database : 'itp405-midterm'
    });

    connection.connect();
    connection.query('SELECT * FROM books WHERE id = ?', [id], function(error, books) {
      if (error){
        reject();
      } 

      else {
        if (books.length === 0){
          reject({
            error: {
              message: 'Book not found'
            }
            // id: id
          });
        } 

        else {
          var book = books[0];

          // Nested Author
          connection.query('SELECT * FROM authors WHERE id = ?', [ book.author_id ], function(error, authors) {
            if (error){
              reject();
            } 

            else {
              if (authors.length === 0){
                reject({
                  errorType: 'Author not found',
                  id: id
                });
              } 

              else {
                var author = authors[0];

                // Nested Author
                connection.query('SELECT * FROM publishers WHERE id = ?', [ book.publisher_id ], function(error, publishers) {
                  if (error){
                    reject();
                  } 

                  else {
                    if (publishers.length === 0){
                      reject({
                        errorType: 'Publisher not found',
                        id: id
                      });
                    } 

                    else {
                      var publisher = publishers[0];
                      author.publisher = publisher;
                      book.author = author;
                      resolve(book);
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  });
}


module.exports = findRecord;

