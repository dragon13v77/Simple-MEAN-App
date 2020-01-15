angular.module('app').controller('adminController', function($scope, $mdDialog) {
	$scope.message = 'I AM ADMIN!';
	$scope.status = '  ';
	$scope.openDialog = function(ev) {
		var confirm = $mdDialog.confirm()
			.title('What You decided?')
			.textContent('All of the banks have agreed to forgive you your debts.')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('OK')
			.cancel('CANCEL');

		$mdDialog.show(confirm).then(function() {
			$scope.status = 'You said OK';
		}, function() {
			$scope.status = 'You said cancel';
		});
	}
});