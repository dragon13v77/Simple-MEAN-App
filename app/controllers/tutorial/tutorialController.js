angular.module('app').controller('tutorialController', function($scope, $stateParams, Tutorials, $window) {
	Tutorials.getTutorial($stateParams.tutorialId).then(function(response) {
		$scope.tutorial = response;
	});

	$scope.goBack = function() {
		$window.history.back();
	}
});