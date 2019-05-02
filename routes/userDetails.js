var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
	var email = request.body.email;
	
	if (email) {
		global.connection.query('SELECT * FROM Users WHERE email = ?',
		 [email], function(error, results, fields) {

			if (results.length > 0) {
				response.json({
            		status:200,
            		message: 'Success',
            		results:results
        		})
			} else {
				response.json({
            		status:401,
            		message:'No visits exists for this User'
        		})
			}			
			response.end();
		});
	} else {
		response.json({
    		status:401,
    		message:'Some Error Occured'
		})
		response.end();
	}
});

module.exports = router;
