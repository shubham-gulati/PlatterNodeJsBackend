var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
	var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
  	//var encryptedString = cryptr.encrypt(req.body.password);
    
    var users = {
        "name":request.body.name,
        "email":request.body.email,
        "password":request.body.password,
        "mobile_number":request.body.mobile_number,
        "is_platter_member": 0,
        "added_datetime":today
    }

    global.connection.query('INSERT INTO Users SET ?', users, function (error, results, fields) {

      if (error) {
        response.json({
            status:false,
            message:'There is some error with query'
        })
      } else{
          response.json({
            status:true,
            data:results,
            message:'User Registered Sucessfully'
        })
      }
    });
});

module.exports = router;
