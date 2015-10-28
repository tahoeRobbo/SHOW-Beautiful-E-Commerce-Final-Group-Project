var app = angular.module('GroupStore');

app.controller('homeCtrl', function($scope, ProductService, cart, cartService) {

	$scope.scroll = function() {
    console.log("clicked");
  }

$scope.thanks = true;
$scope.goodToGo = true;
$scope.emailList = {};

  $scope.findColorSizeIndex = function(color) {
    $scope.thanks = false;
    ProductService.findColorSizeIndex(color, $scope.emailList.wantEmail).then(function(response) {
      console.log("ADDED",response);
           $scope.emailList.wantEmail = "";
    })
  }


  $scope.passInProduct = function(product) {
  $scope.selectedProduct = product;
  console.log($scope.selectedProduct);
  $scope.selectedColorSize = {};
  $scope.goodToGo = true;
}


$scope.productModalNotAvailable = function(CS) {
    for (var i = 0; i < CS.length; i++) {
      if (CS[i].smallQty === 0 && CS[i].mediumQty === 0 && CS[i].largeQty === 0) {
        return true;
        console.log("true");
      }
    };
  
}

 $scope.selectedColorSize = {};
 
 $scope.selectedProduct = {
  productCategory: "Yo",
  colorSize: "Yo"
};

  $scope.selectColorSize = function(colorSize) {
    var colorSizeParsed = JSON.parse(colorSize);

    $scope.selectedColorSize = colorSizeParsed;
    console.log("PARSEDOBJ", $scope.selectedColorSize);
  }

$scope.selectSize = function(size) {
  $scope.theSize = size;
  $scope.goodToGo = false;
}


	$scope.getProducts = function(){
		ProductService.getProduct().then(function(data) {
			console.log('get product', data);
			$scope.products = data;
		})
	}

	$scope.getProducts();

  $scope.sizes = ["S", "M", "L"];

  $scope.inStock = function(selected) {
      if (selected > 0) {
        return true
      } 
  }

  $scope.anyAvailable = function(colorSize) {
      if (colorSize.smallQty <= 0 && colorSize.mediumQty <= 0 && colorSize.largeQty <= 0) {
        return true
      }
  }


  $scope.ifNot = function (x) {
      if (x.productCategory === "Accessories" || x.productCategory === "Soaps/Scrubs") {
        return true
      }
  }

  $scope.ifNotClothing = function (x) {
      if (x.productCategory === "Accessories" || x.productCategory === "Soaps/Scrubs") {
        return true
      }
  }

  $scope.available = true;

	$scope.cart = cart;

  $scope.addProductToCartFromModal = function(product, colorSize, size) {
    Materialize.toast('ITEM ADDED TO BAG', 2000, 'rounded');
    console.log(product, colorSize, size);
    var productObject = {
      name: product.productTitle
      , refId: product._id
      , colorSizeId: colorSize._id
      , imageUrl: colorSize.mainImg
      , color: colorSize.color
      , size: size
      , price: product.price
      , productCategory: product.productCategory
    };
    cartService.addProductToCart(productObject).then(function(response) {
      console.log(response.data);
      /*reset dynamic values to empty (cf. Mark)*/
      $scope.cart = response.data;
      // $scope.$apply();
      /*pull down modal for a second or two*/
      $scope.getTotal($scope.cart);
    });
  };





	$scope.addProductToCart = function(product, colorSize, size) {
    Materialize.toast('ITEM ADDED TO BAG', 1000, 'rounded')
		var productObject = {
			name: product.productTitle
			, refId: product._id
			, colorSizeId: colorSize._id
			, imageUrl: colorSize.mainImg
			, color: colorSize.color
			, size: size
			, price: product.price
      , productCategory: product.productCategory
		};
		console.log(productObject);
		console.log("colorSize", colorSize._id);
		cartService.addProductToCart(productObject).then(function(response) {  
			console.log(response.data);
			/*reset dynamic values to empty (cf. Mark)*/
			$scope.cart = response.data;
			// $scope.$apply();
			/*pull down modal for a second or two*/
			$scope.getTotal($scope.cart);
		});
	};

	$scope.removeProductFromCart = function(id) {
		console.log("Cart", cart);
		console.log("removing id", id);
		cartService.removeProductFromCart(id).then(function(response) {
			console.log(response);
			$scope.cart = response.data;
			console.log("Cart 23r", $scope.cart);
			$scope.getTotal($scope.cart);
		});
	};

	$scope.getTotal = function() {
		$scope.total = cartService.calculatePrice($scope.cart);
	}; // end $scope.getTotal
	
		$scope.decSizesFromCart = function() {
			ProductService.decrementSize($scope.cart);
		};//end decSizesFromCart
	
});// end homeCtrl


// Cart Modal Directive

app.directive('cartModal', function() {
	var modal = function(scope, element, attrs) {
		$(element).on('click', function() {
			console.log('clicked!', scope.cart);
			$('#modal2').openModal();
		});
	};

	return {
		restrict: 'A',
		link: modal
	}
});
//end homeCtrl
