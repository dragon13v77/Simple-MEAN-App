angular.module('app').controller('logoutController', function($scope, $rootScope, $stateParams, $state, LoginService) {

	$scope.logout = function() {
		LoginService.logout().then(function(response) {
			if (response) {
				$rootScope.loggedIn = !response;
				$state.go('home');
				console.log('LOGOUT SUCCESS');
			}
		})
	}
});