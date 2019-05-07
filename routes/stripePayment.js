var express = require('express');
var router = express.Router();
const stripe = require('stripe')('sk_test_Exsg9IzoUZSav22qakc5DmRk00X6zOi4Yq');


router.post('/', function(request, response) {
	return stripe.charges
	    .create({
	      amount: request.body.amount, // Unit: cents
	      currency: 'USD',
	      source: request.body.tokenId,
	      description: 'Test payment',
	    })
	    .then(result => res.status(200).json(result));
});

module.exports = router;
