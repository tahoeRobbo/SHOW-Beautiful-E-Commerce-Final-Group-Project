var app = angular.module('GroupStore');

app.controller('adminHomeCtrl', function($scope, products, ProductService, $route) {
	$scope.adminHomeTest = "This is the adminHomeTmpl.html. trappin hard from the adminHomeCtrl!";
	//show and hide edit size inputs 
	//defaults to hidden
	$scope.confirmDelete = false;
	$scope.confirmDeleteWaitlist = false;
	
	$scope.showDeleteWaitlist = function(){
		$scope.confirmDeleteWaitlist = true;
	}
	
	$scope.cancelDeleteWaitlist = function() {
		$scope.confirmDeleteWaitlist = false;
	}
	
	
	
	$scope.toggleShowEditSizes = function() {
		$scope.showEditSizes = !$scope.showEditSizes;
	};
	
	//takes products from resolve in app.js and sets to $scope.products
	$scope.products = products;
	
	//takes mongo _id of specific colorSize object from ng-repeat
	//takes new qty for small
	$scope.updateSmallQty=function(id, updatedQty) {
		var smallQtyObj = {
			id: id,
			qty: updatedQty
		};
		//console.log(smallQtyObj.id, " smallQtyObj.id, ", smallQtyObj.qty, " smallQtyObj.qty from adminHomeCtrl");
		ProductService.updateSmallQty(smallQtyObj);
		$scope.showEditSizes = false;
		
	};//end updateSmallQty
	
	$scope.showConfirmDelete = function(mongoId) {
		$scope.confirmId = mongoId;
		console.log($scope.confirmId);
		$scope.confirmDelete = true;
	};// end showConfirmDelete
	
	$scope.hideConfirmDelete = function(mongoId){
		$scope.confirmId = mongoId;
		$scope.confirmDelete = false;
		$scope.confirmId = null;
	};// end hideConfirmDelete
	
	
	$scope.deleteProduct = function(mongoId){
		console.log(mongoId);
		ProductService.deleteProduct(mongoId)
		.then(function(){
			console.log("then from deleteProduct in adminHomeCtrl");
			$scope.confirmDelete = false;
			$route.reload();
			$scope.confirmId = null;
		});
	};// end deleteProduct

	$scope.onWait = function(listed) {
		if(listed > 0) {
			return true;
		}
	};
	
	$scope.removeEmail = function(colorSizeId, productId) {
//		$scope.emails.splice(key, 1);
//		return $scope.emails;
//			console.log('$scope.removeEmail HIT passed', colorSizeId, ' colorSizeId');	
		ProductService.removeEmailsFromWaitlist(colorSizeId);
			var resetView = function() {
				ProductService.getProduct().then(function(res){
					console.log(res, ' from .then getProduct');
					$scope.products = res;
				});
				$scope.showConfirmWaitlist = false;
				$route.reload();
			};
//			console.log(resetView());
		$scope.products = resetView();
		$scope.passInEmail(productId);
	};// end removeEmail
	
	

	$scope.passInEmail = function(product) {
		$scope.WL = product;
		$scope.emails = product.colorSize;
		console.log($scope.emails);
	};
	

	
////		COMMENTING OUT UNTIL WORKING - RH
//	app.directive('productModal', function() {
//	var modal = function(scope, element, attrs) {
//		$(element).on('click', 'img', function() {
//			console.log('clicked!');
//			$('#modal2').openModal();
//		});
//	};
//
//	return {
//		restrict: 'A',
//		link: modal
//	}
//});//end app.directive 'productModal'

	
	
});//end adminHomeCtrl