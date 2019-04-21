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

    // var data = {
    //     "res_id":request.body.user.name,
    //     "email":request.body.user.email,
    //     "unlock_datetime":today,
    //     "visit_code": random(6000,10000)
    // }


    var data = {
        "res_id":request.body.res_id,
        "email":request.body.email,
        "unlock_datetime":today,
        "visit_code": Math.round(random(6000,10000))
    }

    global.connection.query('INSERT INTO visits_unlocked SET ?', data, function (error, results, fields) {

      if (error) {
        response.json({
            status:false,
            message:'There is some error with query'
        })
      } else{
          response.json({
            status:true,
            data:results,
            message:'Visit Registered Sucessfully'
        })
      }
    });
});

module.exports = router;
