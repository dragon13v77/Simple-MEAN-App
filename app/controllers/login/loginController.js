angular.module('app').controller('loginController', function($scope, $rootScope, $stateParams, $state, LoginService) {

	$scope.login = function(user) {
		LoginService.login(user.username, user.password).then(function(response) {
			$rootScope.authenticatedUser = response;
			if (response) {
				$scope.error = '';
				$scope.user.username = '';
				$scope.user.password = '';
				$state.transitionTo('home');
				console.log('LOGIN SUCCESS');
			}
			else {
				$scope.error = "Incorrect username/password !";
				console.log('ERROR LOGIN');
			}
		});
	};
});