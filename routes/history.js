var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
	var email = request.query.email;
	
	if (email) {
		global.connection.query('SELECT * FROM visits_unlocked vu JOIN Restaurants r ON vu.res_id = r.res_id WHERE vu.email = ?', [email], function(error, results, fields) {

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
