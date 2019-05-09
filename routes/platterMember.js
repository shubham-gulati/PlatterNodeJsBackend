var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
    
    var users = {
        "email":request.body.email,
        "is_platter_member": request.body.is_platter_member
    }

    global.connection.query('UPDATE Users SET is_platter_member = ? WHERE email = ?', [users.is_platter_member, users.email], function (error, results, fields) {

      if (error) {
        response.json({
            status:false,
            message:'There is some error with query'
        })
      } else {

        var today = new Date().toISOString().slice(0, 19).replace('T', ' ');

        var dataApp = {
          "payment_mode":"card",
          "payment_datetime": today,
          "email":request.body.email
        }
          
         global.connection.query('INSERT INTO payment_history SET ?', dataApp, function (error, results, fields) {

          if (error) {
            response.json({
                status:401,
                message:'There is some error with query'
            })
          } 
        });

          response.json({
            status:true,
            data:results,
            message:'User Registered Sucessfully'
        })
      }
    });
});

module.exports = router;
