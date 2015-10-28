var app = angular.module('GroupStore');

app.service('UserService', function($http, $q, $location, $window){
	this.checkLoggedin = function(){
		console.log('checkLoggedIn Hit')
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url : 'api/admin/loggedin'
		}).success(function(user){
			//authenticated user -- allow route
			if(user !== '0'){
				deferred.resolve();
				console.log('logged in within if of UserService.checkLoggedin');
			}
			//unauthenticated user -- redir to login
			else {
			console.log('logged in within else of UserService.checkLoggedin');
				deferred.reject();
				$window.location.href = '/api/login';
			}
		});
	};// end checkLoggedin
	
}); //end UserService