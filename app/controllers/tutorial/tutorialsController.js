angular.module('app').controller('tutorialsController', function($scope, Tutorials) {
	Tutorials.getTutorials().then(function(response) {
		$scope.tutorials = response;
	});
});