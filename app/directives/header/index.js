angular.module('header', [])
	.directive('myHeader', function () {
		return {
			restrict: 'EA',
			templateUrl: '/directives/header/header.html',
			controller: ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

			}]
		}
	});