var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
		name: {
			first: String,
			last: String
		},
		email: String,
		payerId: String,
		shippingAddress: {
	    street: String,
	    city: String,
			state: String,
			zip: String,
			country: String
		}
});

module.exports = customerSchema;