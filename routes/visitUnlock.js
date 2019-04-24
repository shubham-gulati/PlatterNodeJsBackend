var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var format = require('biguint-format');

router.post('/', function(request, response) {
	var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
  	//var encryptedString = cryptr.encrypt(req.body.password);
    
    function randomC (qty) {
        var x= crypto.randomBytes(qty);
        return format(x, 'dec');
    }
    
    function random (low, high) {
      return randomC(4)/Math.pow(2,4*8-1) * (high - low) + low;
    }

    var dataApp = {
        "res_id":request.body.user.res_id,
        "email":request.body.user.email,
        "unlock_datetime":today,
        "visit_code": Math.round(random(6000,10000))
    }

    global.connection.query('INSERT INTO visits_unlocked SET ?', dataApp, function (error, results, fields) {

      console.log(error);

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
            message:'Visit Registered Sucessfully'
        })
      }
    });
});

module.exports = router;
