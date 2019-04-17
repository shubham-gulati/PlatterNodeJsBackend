var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
	console.log("inside");

	var email = request.body.email;
	var password = request.body.password;
	
	if (email && password) {
		global.connection.query('SELECT * FROM Users WHERE email = ? and password = ?', [email, password], function(error, results, fields) {

			if (results.length > 0) {
				response.send("Succceful login");
			} else {
				console.log("incorrect email or password");
				response.send('Incorrect email and/or Password!');
			}			
			response.end();
		});
	} else {	
		response.send('Please enter email and Password!');
		response.end();
	}
});

module.exports = router;

