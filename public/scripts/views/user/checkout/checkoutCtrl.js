var app = angular.module('GroupStore');

app.controller('checkoutCtrl', function($location, $window, $routeParams, $scope, cart, cartService, orderService) {

	$scope.cart = cart;

	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
		return $scope.total;
	};// end getTotal;

	console.log('this', cartService.calculatePrice($scope.cart));

	$scope.getTotal();
	
	
	console.log($scope.cart, " $scope.cart from checkoutCtrl");

	$scope.removeProductFromCart = function(product) { 
		cartService.removeProductFromCart(product).then(function(response) {
			$scope.cart = response.data;
			$scope.getTotal($scope.cart);
		});
	};

	$scope.guestCheckout = function() {
		// var orderData = createOrder();
		var products = [];
		var total = $scope.total;
		for(var i = 0; i < cart.length; i++){
			var newProduct = {
				product: cart[i].refId,
				size: cart[i].size,
				color: cart[i].color,
				colorSizeId: cart[i].colorSizeId,
				imageUrl: cart[i].imageUrl
			};
			products.push(newProduct);
		}
		var order = {products: products, total: total};
		cartService.createOrder(order).then(function(orderData){
			console.log('orderData', orderData)
			var payment = {
				"intent": "sale",
			  "payer": {
			    "payment_method": "credit_card",
			    "funding_instruments": [{
			      "credit_card": {
			        "number": '4827369667800959',
			        "type": 'visa',
			        "expire_month": '02',
			        "expire_year": '2019',
			        "cvv2": '111',
			        "first_name": 'Joe',
			        "last_name": 'Shopper',
			        "billing_address": {
			          "line1": '52 North Main ST',
			          "city": 'Johnstown',
			          "state": 'OH',
			          "postal_code": '43210',
			          "country_code": "US" }}}]},
			  "transactions": [{
			    "amount": {
			      "total": $scope.total,
			      "currency": "USD",
			      "details": {
			        "subtotal": $scope.total,
			        "tax": "0.00",
			        "shipping": "0.00"}},
			    "description": "Beautiful E-Commerce Store order # " + orderData.data._id
			  }]
			};
			cartService.createPmt(payment).then(function(paymentData){
				console.log('this is the payment data GUEST CHECKOUT', paymentData.data.id);
				var pmt = paymentData.data.payer.funding_instruments[0].credit_card;
				var updateData = {
					status: paymentData.data.state,
					paymentId: paymentData.data.id,
					customer: {
						name: {
							first: pmt.first_name,
							last: pmt.last_name
						},
						email: $scope.email,
						payerId: pmt.number,
						shippingAddress: {
							street: pmt.billing_address.line1,
							city: pmt.billing_address.city,
							state: pmt.billing_address.state,
							zip: pmt.billing_address.postal_code,
							country_code: pmt.billing_address.country_code
						}
					}
				};
				orderService.updateOrder(orderData.data._id, updateData).then(function(updatedOrderObj){
					var redirectUrl = 'http://localhost:1337/#/thankyou?_id=' + updatedOrderObj.data._id;
					console.log('redirectUrl', redirectUrl)
					$window.location.href = redirectUrl;
					console.log('THE END', updatedOrderObj);
				})
			})
		})
	};//end guestCheckout
		
	$scope.paypalCheckout = function(){
	    var products = [];
	    var total = $scope.total;
	    console.log(cart[0].imageUrl, 'this is cart')
	    for(var i = 0; i < cart.length; i++){
	        var newProduct = {
	            product: cart[i].refId,
	            size: cart[i].size,
	            color: cart[i].color,
	            colorSizeId: cart[i].colorSizeId,
	            imageUrl: cart[i].imageUrl
	        };
	        products.push(newProduct);
	    }
			console.log('total', total)
	    var order = {products: products, total: total};
	    console.log('ORDER HERER', order)
	    cartService.createOrder(order).then(function(orderData){
	        var order_Id = orderData.data._id;
	        var payment = {
	          "intent": "sale",
	          "payer": {
	            "payment_method": "paypal"
	          },
	          "redirect_urls": {
	            "return_url": "http://localhost:1337/#/thankyou",
	            "cancel_url": "http://localhost:1337/#/cancel"
	          },
	          "transactions": [{
	            "amount": {
	              "total": $scope.total,
	              "currency": "USD"
	            },
	            "description": "Beautiful E-Commerce Order # " + order_Id
	          }]
	        };
	        console.log('sending this shiz to paypal', payment);
	        cartService.createPmt(payment).then(function(paymentData){
	            console.log("response from paypal payment create request", paymentData)
	            orderService.updateOrder(order_Id, paymentData).then(function(){
	              var redirectUrl;
	              for(var i=0; i < paymentData.data.links.length; i++) {
	                var link = paymentData.data.links[i];
	                if (link.method === 'REDIRECT') {
	                  redirectUrl = link.href;
	                }
	              }
	              $window.location.href = redirectUrl;
	                });
	            });
	    });
	};//end paypalCheckout

    $scope.ifNotClothing = function (product, colorSize) {
      if (product.productCategory === "Accessories" || product.productCategory === "Soaps/Scrubs") {
        return true;
      }
  };
	

});// end checkoutCrtl


//
//	RH LEFT IN IN CASE OF MISTAKE
//	
//		console.log('this is the payment data GUEST CHECKOUT', paymentData.data.id);
//				var pmt = paymentData.data.payer.funding_instruments[0].credit_card;
//				var updateData = {
//					status: paymentData.data.state,
//					paymentId: paymentData.data.id,
//					customer: {
//						name: {
//							first: pmt.first_name,
//							last: pmt.last_name
//						},
//						email: $scope.email,
//						payerId: pmt.number,
//						shippingAddress: {
//							street: pmt.billing_address.line1,
//							city: pmt.billing_address.city,
//							state: pmt.billing_address.state,
//							zip: pmt.billing_address.postal_code,
//							country_code: pmt.billing_address.country_code
//						}
//					}
//				};
//				orderService.updateOrder(orderData.data._id, updateData).then(function(updatedOrderObj){
//					console.log('THE END', updatedOrderObj);
//				});
//				// orderService.updateOrder(orderData.data._id, paymentData).then(function(updatedOrderData){
//				// 	console.log('this is the order object after payment checkout', updatedOrderData);
//				// 	orderService.updateOrder(orderData.data._id, paymentData).then(function(updatedOrderData){
//				// 		console.log('updated Order object data', updatedOrderData);
//				// 	})
//				// })
//

//	var paymentSuccess = function() {
//		cartService.paymentSuccess($scope.payerId).then(function(data){
//			console.log("after paypal confirmation", data)
//		})
//	};
//
//	// $scope.confirmPmt = function(){
//	// 	ProductService.executePayment($scope.orderDetails).then(function(data){
//	// 		console.log(data);
//	// 	})
//	// };



