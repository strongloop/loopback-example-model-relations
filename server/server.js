var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
boot(app, __dirname, function(err) {
  if (err) throw err;

  app.set('view engine', 'ejs'); // LoopBack comes with EJS out-of-box
  app.set('json spaces', 2); // format json responses for easier viewing

  // must be set to serve views properly when starting from project root
  app.set('views', path.resolve(__dirname, 'views'));

  app.use('/', function(req, res, next) {
    app.models.Customer.findOne(function(err, customer) {
      if (err) return next(err);
      res.render('index', {customer: customer});
    });
  });

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

