var async = require('async');

module.exports = function(app) {
  var Customer = app.models.Customer;
  var emails = [
    {
      label: 'work',
      address: 'larry@xyz.com'
    },
    {
      name: 'home',
      address: 'larry@gmail.com'
    }
  ];
  Customer.create({ name: 'Larry Smith' }, function(err, customer) {
    console.log('Customer:', customer);
    async.each(emails, function(email, done) {
      customer.emails.create(email, done);
    }, function(err) {
      console.log('Customer with emails:', customer);
      var id1 = customer.emailList[0].id;
      var id2 = customer.emailList[1].id;
      async.series([
        // Find an email by id
        function(done) {
          customer.emails.get(id1, function(err, email) {
            console.log('Email:', email);
            done();
          });
        },
        function(done) {
          customer.emails.set(id2, {label: 'home', address: 'larry@yahoo.com'},
            function(err, email) {
              done();
            });
        },
        // Remove an email by id
        function(done) {
          customer.emails.unset(id1, function(err) {
            done();
          });
        }], function(err) {
        console.log('Customer with emails:', customer);
      });
    });
  });
};
