var app = angular.module('GroupStore', ['ngRoute', 'ui.materialize', 'flow', 'angular-carousel', 'smoothScroll']);

//This is just a comment
//More comments

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'scripts/views/user/home/homeTmpl.html',
		controller : 'homeCtrl',
		resolve: {
			cart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
	// .when('/product', {
	// 	templateUrl : 'scripts/views/user/productModal/productModalTmpl.html',
	// 	controller : 'productModalCtrl'
	// }) 

	.when('/cart', {
		templateUrl : 'scripts/views/user/cart/cartTmpl.html',
		controller: 'cartCtrl',
    resolve: {
      cart: function(cartService) {
        return cartService.getCart();
      }
    }
  })
	.when('/thankyou', {
		templateUrl : 'scripts/views/user/checkout/confirm.html',
		controller : 'thankyouCtrl', 
		resolve: {
			checkedOutCart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
		.when('/checkout', {
		templateUrl : 'scripts/views/user/checkout/checkoutTmpl.html',
		controller : 'checkoutCtrl', 
		resolve: {
			cart: function(cartService) {
				return cartService.getCart();
			}
		}
	})
	.when('/admin/home', {
		templateUrl : 'scripts/views/admin/adminHome/adminHomeTmpl.html',
		controller : 'adminHomeCtrl',
		resolve: {
			products: function(ProductService) {
				return ProductService.getProduct();
			},
//			//				THIS RESTRICTS ACCESS IF NOT LOGGED IN.  
////				IF NOT LOGGED IN, REDIRECTS TO LOGIN PAGE
////				COMMENTED OUT FOR DEV PURPOSES
//			loggedin : function(UserService) {
//				return UserService.checkLoggedin();
//			}
		}
	})
	.when('/admin/orders', {
		templateUrl : 'scripts/views/admin/orders/ordersTmpl.html',
		controller : 'ordersCtrl',
		resolve: {
			orders: function(orderService) {
				return orderService.getAllOrders();
			},
//			//				THIS RESTRICTS ACCESS IF NOT LOGGED IN.  
////				IF NOT LOGGED IN, REDIRECTS TO LOGIN PAGE
////				COMMENTED OUT FOR DEV PURPOSES
//			loggedin : function(UserService) {
//				return UserService.checkLoggedin();
//			}
		}
	})
	.when('/admin/product', {
		templateUrl : 'scripts/views/admin/product/productTmpl.html',
		controller : 'productCtrl',
		resolve : {
//			//				THIS RESTRICTS ACCESS IF NOT LOGGED IN.  
////				IF NOT LOGGED IN, REDIRECTS TO LOGIN PAGE
////				COMMENTED OUT FOR DEV PURPOSES
//			loggedin : function(UserService) {
//				return UserService.checkLoggedin();
//			}
		}
	})
	.when('/admin/product/:productId', {
		templateUrl : 'scripts/views/admin/product/updateProductTmpl.html',
		controller : 'UpdateProductCtrl',
		resolve : {
			product : function(ProductService, $route) {
				var productId = $route.current.params.productId;
				return ProductService.getOneProduct(productId);
			},
//			//				THIS RESTRICTS ACCESS IF NOT LOGGED IN.  
////				IF NOT LOGGED IN, REDIRECTS TO LOGIN PAGE
////				COMMENTED OUT FOR DEV PURPOSES
//			loggedin : function(UserService) {
//				return UserService.checkLoggedin();
//			}
		}
	})
	.when('/admin/login', {
		templateUrl : 'scripts/views/admin/login/adminLogin.html',
		controller : 'adminLoginCtrl'
	})
	.otherwise('/');	
	
	//UNUSED ROUTE, COMMENTED OUT 



});//end app.config in app.js

app.run(function ($rootScope, $window) {
 $rootScope.$on("$routeChangeSuccess", function(event){
    $window.scrollTo(0,0);
	});
});// end app.run in app.js


