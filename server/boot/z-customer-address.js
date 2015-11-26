var async = require('async');

module.exports = function(app) {
  var Customer = app.models.Customer;
  var address = {
    street: '123 A St',
    city: 'San Jose',
    state: 'CA',
    zipCode: '95131'
  };
  Customer.create({ name: 'John Smith' }, function(err, customer) {
    console.log('Customer:', customer);
    customer.address.create(address, function(err, address) {
      console.log('Address:', address);
      console.log('Customer with address:', customer);
    });
  });
};
