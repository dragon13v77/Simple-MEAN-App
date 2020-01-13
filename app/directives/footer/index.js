angular.module('footer', [])
	.directive('myFooter', function () {

		return {
			restrict: 'EA',
			templateUrl: '/directives/footer/footer.html',
			controller: 'footerController'
		}
	})
	.controller('footerController', ['$scope', function($scope) {
		$scope.message = '@ 2020 Diamond Dragon';
	}]);