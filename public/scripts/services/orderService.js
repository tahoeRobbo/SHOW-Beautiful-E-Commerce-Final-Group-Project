var app = angular.module('GroupStore');

app.service('orderService', function($http, $q){

	this.createOrder = function(order) {
		return $http({
			method: 'POST',
			url: '/api/user/order',
			data: order
		})
	};

	this.getOrderDetails = function(id) {
		return $http({
			method: 'GET',
			url: '/api/admin/order/' + id
		})
	};

	this.getAllOrders = function() {
		return $http({
			method: 'GET',
			url: '/api/admin/orders'
		})
	};

	this.updateOrder = function(id, orderObj) {
		return $http({
			method: 'PUT',
			url: '/api/admin/order/' + id,
			data: orderObj
		})
	};

	this.updateOrderByPaymentId = function(orderObj){
		console.log('what is this', orderObj)
		return $http({
			method: 'PUT',
			url: '/api/user/order/' + orderObj.paymentId,
			data: orderObj
		})
	};

	this.emptyCart = function() {
		return $http({
			method: 'DELETE',
			url: '/api/user/cart'
		})
	}


});