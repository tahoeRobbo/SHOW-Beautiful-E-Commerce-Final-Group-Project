//var app = angular.module('GroupStore');
//
//app.service('OLDPRODCTSERVICE', function($http, $q){
//
//	ALL OF THESE ARE IN public/scripts/services/ProductService
//	
//    // this.addProduct = function(product){
//    //     console.log('add product service hit')
//    //     var deferred = $q.defer();
//    //     $http({
//    //         method: 'POST',
//    //         url: "/addProduct",
//    //         headers: {
//    //            'Content-Type': "application/json"
//    //         },
//    //         data: {product: product}
//    //     }).then(function(response) {
//    //         deferred.resolve(response.data)
//    //     });
//    //     return deferred.promise;
//    // }
//
//        this.addProduct = function(product){
//          console.log("ProductInService", product);
//        console.log('add product service hit')
//        var deferred = $q.defer();
//        $http({
//            method: 'POST',
//            url: "/api/products",
//            data: product
//        }).then(function(response) {
//            deferred.resolve(response.data)
//        });
//        return deferred.promise;
//    };
//
//    // this.getProduct = function(product){
//    //     var deferred = $q.defer();
//    //     $http({
//    //         method: 'GET',
//    //         url: "/getProduct",
//    //     }).then(function(response) {
//    //         console.log('I got the data I requested');
//    //         deferred.resolve(response.data)
//    //     });
//    //     return deferred.promise;
//    // }
//
//    
//    this.getProduct = function(product){
//        var deferred = $q.defer();
//        $http({
//            method: 'GET',
//            url: "/api/products",
//        }).then(function(response) {
//            console.log('I got the data I requested');
//            deferred.resolve(response.data)
//        });
//        return deferred.promise;
//    };
//
//
//    this.updateProduct = function(product){
//        console.log('update product service hit')
//        var deferred = $q.defer();
//        $http({
//            method: 'PUT',
//            url: "/api/products",
//        }).then(function(response) {
//            deferred.resolve(response.data)
//        });
//        return deferred.promise;
//    };
//
//    this.deleteProduct = function(product){
//        console.log('delete product service hit')
//        var deferred = $q.defer();
//        $http({
//            method: 'DELETE',
//            url: "/api/products",
//        }).then(function(response) {
//            deferred.resolve(response.data)
//        });
//        return deferred.promise;
//    };
//    
//});