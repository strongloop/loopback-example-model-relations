var async = require('async');

module.exports = function(app) {
  var Book = app.models.Book;
  var Author = app.models.Author;
  var Reader = app.models.Reader;

  var book;
  var author;
  var reader;
  async.series([
    function createAuthor(done) {
      Author.create({ name: 'Author 1' }, function(err, p) {
        author = p;
        done(err, p);
      });
    },
    function createReader(done) {
      Reader.create({ name: 'Reader 1' }, function(err, p) {
        reader = p;
        done(err, p);
      });
    },
    function createBook(done) {
      Book.create({ name: 'Book 1' }, function(err, b) {
        book = b;
        var link1 = book.people.build({notes: 'Note 1' });
        link1.linked(author);
        var link2 = book.people.build({notes: 'Note 2'});
        link2.linked(reader);
        console.log('Book:', book);
        book.save(done);
      });
    }], function(err) {
    console.log('done');
  });
};
