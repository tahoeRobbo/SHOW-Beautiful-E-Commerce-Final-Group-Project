var app = angular.module('GroupStore');


app.controller('thankyouCtrl', function($scope, $routeParams, orderService, ProductService, cartService, checkedOutCart){
    
    console.log($routeParams);
    $scope.checkedOutCart = checkedOutCart;
    console.log($scope.checkedOutCart);

    var onOrder = function(){
        if($routeParams._id){
        	console.log('what the fuuuuuuuuuudge', '$routeParams._id', $routeParams._id, '$routeParams', $routeParams)
            orderService.getOrderDetails($routeParams._id).then(function(data){
              if(data.data.status === "approved"){
                  ProductService.decrementSize($scope.checkedOutCart);
                    orderService.emptyCart().then(function(data){
                        console.log('cart is empty now... fyi', data);
                    });
                }
                console.log('after order updateOrderByPaymentId', data);
            })
        } else
            orderService.updateOrderByPaymentId($routeParams).then(function(data){
            	console.log('what the fuuuuudge', '$routeParams._id', $routeParams._id, '$routeParams', $routeParams)
                if(data.data.status === "200") {
                    ProductService.decrementSize($scope.checkedOutCart);
                    orderService.emptyCart();
                }
            });
    };

    onOrder();

});// end thankyouCtrl


