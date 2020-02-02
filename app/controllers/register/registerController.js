angular.module('app').controller('registerController', function($scope, $rootScope, $stateParams, $state) {

	$scope.register = function(user) {
		console.log('Register user', user);
	};
});