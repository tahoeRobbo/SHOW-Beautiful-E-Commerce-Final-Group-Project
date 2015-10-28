var app = angular.module('GroupStore');

app.service('ProductService', function($http, $q) {

  this.findColorSizeIndex = function(color, email) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/products/colorSizeIndex',
      data: {
        colorSizeId: color,
        wantList: email
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    });
    return deferred.promise;
  };

	this.removeEmailsFromWaitlist = function( colorSizeId) {
		var deferred = $q.defer();
		$http({
			method : 'PUT',
			url: '/api/products/colorSizeIndex/' + colorSizeId
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};
	
	//****TYTEBBS SERIVICES FROM OLD productService.js***//
	this.createPayment = function(x){
		return $http({
			method: 'POST',
			url: '/api/paypal',
			data: {payment: x}
		});
	};

	this.executePayment = function(x){
		return $http({
			method: 'GET',
			url: "/api/paypal/"
			// url: "/api/paypal/" + x.related_resources[0].authorization.id
		});
	};

	this.addProduct = function(product){
        console.log("ProductInService", product);
        console.log('add product service hit')
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: "/api/products",
            data: product
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };// end ProductService.addProduct
	
	this.getProduct = function(product){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: "/api/products",
        }).then(function(response) {
            console.log('I got the data I requested', response.data);
            deferred.resolve(response.data)
        });
        return deferred.promise;
    }; // end ProductService.getProduct
	
	this.getOneProduct = function(productId) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: "/api/products/" + productId
		}).then(function(response) {
			console.log(response.data, " response.data from getOneProduct in ProductService")
			deferred.resolve(response.data)
		})//end .then
		return deferred.promise;
	};// end ProductService.getOneProduct
	
	this.updateProduct = function(product){
        console.log('update product service hit')
				console.log(product, " product from updateProductService in ProductService");
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: "/api/products/" + product._id,
						data : {
							_id : product._id,
							product : product
						}
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };// end ProductService.updateProduct
	
	this.deleteProduct = function(mongoId){
        console.log('delete product service hit')
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: "/api/products/" + mongoId,
        }).then(function(response) {
            deferred.resolve(response.data)
        });
        return deferred.promise;
    };//end ProductService.deleteProduct
	
	//	**RH - MAY NOT NEED**  \\
	
//this.updateSmallQty = function(smallQtyObj){
//	console.log(smallQtyObj, ' smallQtyObj from AdminService.updateSmallQty');
//	
//	var deferred = $q.defer();
//	$http({
//		method : 'PUT',
//		url: "/api/produts/:productId",
//		data: {
//			_id : smallQtyObj.id,
//			qty : smallQtyObj.qty
//		}
//	}).then(function(response) {
//		deferred.resolve(response.data);
//	});
//	return deferred.promise;
//};//end updateSmallQty
//	
	
	this.decrementSize = function(checkedOutCart) {
		console.log(checkedOutCart, ' checkedOutCart from ProductService');
		for(var i = 0; i < checkedOutCart.length; i++) {
			if(checkedOutCart[i].size === "S"){
				console.log('checkedOutCart[i] IS S, within decrementSize');
				$http({
					method: 'PUT',
					url: "api/products/",
					data: {
						productId : checkedOutCart[i].refId,
						colorSizeId : checkedOutCart[i].colorSizeId,
						sizeToDec : 'smallQty',
					}
				});
			}// end if checkedOutCart[i] is small
			else if(checkedOutCart[i].size === "M"){
				console.log('checkedOutCart[i] IS M, within decrementSize');
				$http({
					method : "PUT",
					url: "api/products/",
					data: {
						productId : checkedOutCart[i].refId,
						colorSizeId : checkedOutCart[i].colorSizeId,
						sizeToDec : 'mediumQty'
					}
				});
			} // end if checkedOutCart[i] is medium
			else if(checkedOutCart[i].size === "L") {
				console.log('checkedOutCart[i] is L');
				$http({
					method : "PUT",
					url : "api/products/",
					data : {
						productId : checkedOutCart[i].refId,
						colorSizeId : checkedOutCart[i].colorSizeId,
						sizeToDec : 'largeQty'
					}
				});
			}// end if cartObj[i] is large
		}
	};
	
	
});// ********end AdminService*********







//		//**RH - PROBABLY DONT NEED**\\
//
//	this.getAdminProducts = function() {
//		var deferred = $q.defer();
//		$http({
//			method : 'GET',
//			url: "/api/products"
//		}).then(function(response){
//			console.log(response.data, " response.data from getAdminProducts");
//				deferred.resolve(response.data);
//		});//end .then
//			return deferred.promise;
//	};//end AdminService.getAdminProducts

