var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
			productTitle: {type: String}, 
			productDescription: {type: String},
			productCategory: {type: String},
			images: [{type: String}],
			price: {type: Number},
			dateUpdated: {type: Date, default: Date.now()},
			dateCreated: {type: Date},
			colorSize: [{
					color: {type: String} ,
					smallQty: {type: Number},
					mediumQty: {type: Number},
					largeQty: {type: Number},
					mainImg: {type: String},
					imageNumber : {type: Number},
					wantList: [{type: String}]
	 }]
});


productSchema.pre('save', function(next) {
	var product = this;
	product.dateCreated = Date.now();
	next();
});

module.exports = mongoose.model('Product', productSchema);
