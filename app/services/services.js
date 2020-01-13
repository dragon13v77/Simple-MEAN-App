angular.module('app').service('Tutorials', ['$http', '$q', function ($http, $q) {
	this.getTutorials = function () {
		return $q(function (resolve, reject) {
			$http.get('/api/tutorials').then(function (response) {
			//$http.get('/app/data/tutorials.json').then(function (response) {
				if (response.status === 200) {
					resolve(response.data);
				}
				else {
					resolve(null);
				}
			});
		});
	};

	this.getTutorial = function (id) {
		var deferred = $q.defer();
		$http.get('/api/tutorials/' + id).then(function(response) {
		//$http.get('/app/data/tutorials.json').then(function(response) {
			deferred.resolve(response.data);
		}, function(response) {
			deferred.resolve({});
		});
		return deferred.promise;
	}
}]);

angular.module('app').service('LoginService', ['$http', '$q', '$cookies', '$rootScope', '$timeout', function ($http, $q, $cookies, $rootScope, $timeout) {

	this.login = function(username, password) {
		var deferred = $q.defer();
		$http.get('/api/login', {params: { username: username, password: password }})
		    .then(function (response) {
				deferred.resolve(response.data);
		    }, function(response) {
				deferred.resolve(response);
			});
		return deferred.promise;
	};

	this.logout = function() {
		var deferred = $q.defer();
		$http.get('/api/logout')
			.then(function (response) {
				deferred.resolve(response.data);
			}, function(response) {
				deferred.resolve(response);
			});
		return deferred.promise;
	}
}]);