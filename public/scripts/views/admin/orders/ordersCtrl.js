var app = angular.module('GroupStore');

app.controller('ordersCtrl', function($scope, orders, orderService) {

	$scope.orders = orders.data;
	console.log($scope.orders);

	$scope.showOrder = function(order) {
        order.show = !order.show;
    }

	$scope.orderStatusOptions = ['processing', 'shipped', 'on hold', 'canceled'];

	$scope.updateOrder = function(orderId, orderNote, orderStatus) {
		var orderObj = {note: orderNote, status: orderStatus};
		orderService.updateOrder(orderId, orderObj).then(function(response) {
			console.log(response, "updating order - made it to front Order Ctrl");
			Materialize.toast('ORDER UPDATED YO', 2000);	
		})
	};


});