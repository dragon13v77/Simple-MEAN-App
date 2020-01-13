angular.module('app').controller('logoutController', function($scope, $rootScope, $stateParams, $state, LoginService) {

	$scope.logout = function() {
		LoginService.logout().then(function(response) {
			$rootScope.authenticatedUser = !response;
			$state.go('home');
		})
	}
});