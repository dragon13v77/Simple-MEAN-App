angular.module('app').directive('ensureUnique', function($http, RegisterService) {
	return {
		require: 'ngModel',
		link: function(scope, el, attrs, ctrl) {
			scope.$watch(attrs.ngModel, function( val ) {
				console.log('Calling ensure unique ', val);
				console.log('Field = ', attrs.ensureUnique);
				console.log('Attrs', attrs);
				if (!val) {
					return;
				}

				RegisterService.checkUniqueUsername(attrs.ensureUnique, val)
					.then(function(isUnique) {
						console.log('RESPONSE', isUnique);
						ctrl.$setValidity('unique', isUnique);
					})
					.catch(function(err) {
						ctrl.$setValidity('unique', false);
						console.log('ERROR', err);
					});
			})
		}
	}
});