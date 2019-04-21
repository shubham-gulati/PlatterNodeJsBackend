var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
	var email = request.body.user.email;
	var password = request.body.user.password;

	if (email && password) {
		global.connection.query('SELECT * FROM Users WHERE email = ? and password = ?', [email, password], function(error, results, fields) {

			if (results.length > 0) {
				response.json({
            		status:200,
            		message:'Succceful login'
        		})
			} else {
				response.json({
            		status:401,
            		message:'Incorrect email and/or Password!'
        		})
			}			
			response.end();
		});
	} else {
		response.json({
    		status:401,
    		message:'Please enter email and Password!'
		})
		response.end();
	}
});

module.exports = router;
