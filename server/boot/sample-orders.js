module.exports = function(app) {
  app.dataSources.db.automigrate('Order', function(err) {
    if (err) throw err;
    app.models.Customer.find(function(err, customers) {
      if (err) throw err;
      var orders = [
        {
          description: 'First order by Customer A',
          date: '01-01-2015',
          customerId: 4
        },
        {
          description: 'Second order by Customer A',
          date: '02-01-2015', customerId: 4
        },
        {
          description: 'Order by Customer B',
          date: '03-01-2015', customerId: 5
        },
        {
          description: 'Order by Customer C',
          date: '04-01-2015',
          customerId: 6},
        {
          description: 'Order by Anonymous',
          date: '05-01-2015'
        }
      ];
      var count = orders.length;
      orders.forEach(function(order) {
        app.models.Order.create(order, function(err, instance) {
          if (err)
            return console.log(err);
          console.log('Order created:', instance);
          count--;
          if (count === 0)
            console.log('Orders done \n');
        });
      });
    });
  });
};
