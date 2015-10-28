var app = angular.module('GroupStore');

app.controller('UpdateProductCtrl', function($scope, ProductService, $routeParams, product, $location){
		//take productId passed from route via $routeParams and assign to $scope.specProductId
	$scope.specProductId = $routeParams.productId;
	//console.log($scope.specProductId, " from UpdateProductCtrl in angular");
	
		//take product loaded via resolve in app.js and 
		//assign to $scope.specProduct
	$scope.specProduct = product;
	//console.log($scope.specProduct, " $scope.specProduct from productCtrl.js");
	
	//console.log($scope.specProduct._id, " specProduct._id");
	
	$scope.addProduct = function() {
    console.log($scope.product);
		ProductService.addProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    });
	};

	$scope.addColor = function() {
		var newColorSize = new ColorSize();
		$scope.specProduct.colorSize.push(newColorSize);
	};

  $scope.deleteColor = function(toBeDeleted) {
    $scope.specProduct.colorSize.splice(toBeDeleted, 1);
  };


	$scope.getProduct = function() {
		ProductService.getProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

	$scope.updateProduct = function(updatedProductObj, flow) {
		console.log(updatedProductObj, " uPO from uPCtrl")
		
		for(var i = 0; i < flow.files.length; i++) {
			var name = flow.files[i].name.replace(/ /g, "+");
 			$scope.specProduct.images.push("https://s3-us-west-2.amazonaws.com/goldmorning/" + name);
		}// loops through flow files, pushes url to images array in product
		
		for(var i = 0; i < $scope.specProduct.colorSize.length; i++) {
			$scope.specProduct.colorSize[i].mainImg = $scope.specProduct.images[($scope.specProduct.colorSize[i].imageNumber) - 1];
		}
		console.log($scope.specProduct, " $s.sP from after for loops in uPO ")
		
		
		ProductService.updateProduct($scope.specProduct)
	        .then(function(data) {
	            console.log(data);   
	    });
		$location.path('/admin/home');
	};

	$scope.deleteProduct = function() {
		ProductService.deleteProduct($scope.product)
	        .then(function(data) {
	            console.log(data);   
	    })
	};

//	$scope.product = new Product();
//	$scope.addColor();

});
