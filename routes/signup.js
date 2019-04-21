var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
        var today = new Date().toISOString().slice(0, 19).replace('T', ' ');
        //var encryptedString = cryptr.encrypt(req.body.password);

    var users = {
        "name":request.body.user.name,
        "email":request.body.user.email,
        "password":request.body.user.password,
        "mobile_number":request.body.user.mobile_number,
        "is_platter_member": 0,
        "added_datetime":today
    }


        global.connection.query('INSERT INTO Users SET ?', users, function (error, results, fields) {

     if (error) {
        response.json({
            status:401,
            message:'There is some error with query'
        })
      } else{
          response.json({
            status:200,
            data:results,
            message:'User Registered Sucessfully'
        })
      }
    });
});

module.exports = router;