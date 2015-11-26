module.exports = function(app) {
  var Customer = app.models.Customer;

  // define a custom scope
  Customer.scope('youngFolks', {where: {age: {lte: 22 }}});
  app.dataSources.db.automigrate('Customer', function(err) {
    if (err) throw err;
    var customers = [
      {name: 'Customer A', age: 21},
      {name: 'Customer B', age: 22},
      {name: 'Customer C', age: 23},
      {name: 'Customer D', age: 24},
      {age: 25}
    ];
    var count = customers.length;
    customers.forEach(function(customer) {
      Customer.create(customer, function(err, instance) {
        if (err)
          return console.log(err);
        console.log('Customer created:', instance);
        count--;
        if (count === 0)
          console.log('Customers A-D Done' + '\n');
      });
    });
  });
};
