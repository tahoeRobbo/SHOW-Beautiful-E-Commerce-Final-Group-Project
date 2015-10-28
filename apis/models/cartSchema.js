 var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    /*if customer wants to purchase 2+ of a given product, product will appear two or more times in cart*/
    /*products will need to be tied to available inventory to prevent overselling, although this could also be fixed only allowing customers to add items to cart when inventory is displayed as "in stock"*/
    /*also need a way to ensure that product inventory will reflect increases in qty if session ends or customers clear their cart*/
    productObject: [{
        /*not sure that this will work given that you're trying to pass in what appears below*/
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
        , color: {type: String}
        , size: {type: String}
    }]
    , total: {type: Number, required: true}
    , updatedAt: {type: Date, default: Date.now}
});

cartSchema.pre('addProductToCart', function(next) {
    var cart = this;
    cart.updatedAt = Date.now();
    /*this is, to me, the most logical place to set up this function*/
    cart.total += product.price;
    next();
})

cartSchema.pre('removeProductFromCart', function() {
    this.updatedAt = Date.now();
})

module.exports = mongoose.model("Cart", cartSchema);

/*var productObject = {
            refId: product._id
            , imageUrl: product.mainImg
            , name: product.productTitle
            , color: color
            , size: size
            , price: product.price
        };*/