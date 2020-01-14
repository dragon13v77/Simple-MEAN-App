angular.module('app').controller('loginController', function($scope, $rootScope, $stateParams, $state, LoginService) {

	$scope.login = function(user) {
		if (user && user.username && user.password) {
			LoginService.login(user.username, user.password).then(function (response) {
				$rootScope.loggedIn = response.loggedIn;
				if (response) {
					$rootScope.authenticatedUser = response.user;

					$scope.error = '';
					$scope.user.username = '';
					$scope.user.password = '';
					$state.transitionTo('home');
					console.log('LOGIN SUCCESS', response);
				}
				else {
					$scope.error = "Incorrect username/password !";
					console.log('ERROR LOGIN');
				}
			});
		}
		else {
			console.log('NO USER DATA!');
		}
	};
});