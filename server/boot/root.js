module.exports = function(app) {
	var router = app.loopback.Router();
	router.get('/', function(req, res, next) {
		app.models.Customer.findOne({
			where: {
				name: 'Customer A'
			}}, function(err, customer) {
				if (err) return next(err);
				res.render('index', {customer: customer});
			});
	});
	app.use(router);
};
