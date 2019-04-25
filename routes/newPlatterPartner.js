var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var format = require('biguint-format');

router.post('/', function(request, response) {
	var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
  	//var encryptedString = cryptr.encrypt(req.body.password);
    
    var dataApp = {
        "name":request.body.name,
        "address": request.body.address,
        "added_datetime" : today,
        "last_updated": today,
        "is_platter_partner": 1,
        "is_active": 1,
        "temp_closed_flag":0        
    }

    global.connection.query('INSERT INTO Restaurants SET ?', dataApp, function (error, results, fields) {


      if (error) {
        response.json({
            status:401,
            message:'There is some error with query'
        })
      } else{
          response.json({
            status:200,
            data:results,
            visit_code: dataApp.visit_code,
            message:'Partner Registered Sucessfully'
        })
      }
    });
});

module.exports = router;
