var Promise = require('bluebird');
module.exports = function(app, done) {
  console.log("Creating hasManyThrough samples:");

  var Patient = app.models.Patient;
  var Appointment = app.models.Appointment;
  var Physician = app.models.Physician;

  Patient.create([{name: 'patient1'}, {name: 'patient2'}], function(err, patients) {
  	if(err) console.log(err);
  	console.log('Created Patient >>>', patients);

  	Physician.create({name: 'physician1'}, function(err, physician) {
  		if(err) console.log(err);
  		console.log('Created Physician >>>', physician);
  		var date = new Date();
  		Appointment.create([{
  			'appointmentDate': date.getDate(),
  			'patientId': '1',
  			'physicianId': '1'
  		},{
  			'appointmentDate': date.getDate(),
  			'patientId': '2',
  			'physicianId': '1'
  		}], function(err, appointment){
  			console.log('Created Appointment >>>', appointment);
  			done(null);
  		});
  	});
  });
}