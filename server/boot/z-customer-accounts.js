var async = require('async');

module.exports = function(app) {
  var Customer = app.models.Customer;
  var accounts = [
    {
      name: 'Checking',
      balance: 5000
    },
    {
      name: 'Saving',
      balance: 2000
    }
  ];
  Customer.create({ name: 'Mary Smith' }, function(err, customer) {
    console.log('Customer:', customer);
    async.each(accounts, function(account, done) {
      customer.accounts.create(account, done);
    }, function(err) {
      console.log('Customer with accounts:', customer);
      customer.accounts(console.log);
    });
  });
};
