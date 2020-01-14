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

angular.module('app').service('LoginService', ['$http', '$q', '$cookies', '$rootScope', 'SessionService', function ($http, $q, $cookies, $rootScope, SessionService) {

	this.login = function(username, password) {
		var deferred = $q.defer();
		$http.get('/api/login', {params: { username: username, password: password }})
		    .then(function (response) {
				deferred.resolve(response.data);
				SessionService.create(response.data.sessId, response.data.user.username, null);
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

	this.isAuthenticated = function () {
		return !!SessionService.userName;
	};

	this.checkProfile = function() {
		var deferred = $q.defer();
		$http.get('/api/profile')
			.then(function (response) {
				deferred.resolve(response.data);
				if (response.data && response.data.username) {
					SessionService.create(response.data.sessId, response.data.username, null);
				}
			}, function(response) {
				deferred.resolve(response);
			});
		return deferred.promise;
	}
}]);

angular.module('app').service('UserService', ['$http', '$q', '$cookies', '$rootScope', function ($http, $q, $cookies, $rootScope) {

}]);

angular.module('app').service('SessionService', ['$http', '$q', '$cookies', '$rootScope', function ($http, $q, $cookies, $rootScope) {

	this.id = null;
	this.userName = null;
	this.userRole = null;

	this.create = function (sessionId, userName, userRole) {
		this.id = sessionId;
		this.userName = userName;
		this.userRole = userRole;
		$rootScope.loggedIn = true;
	};
	this.destroy = function () {
		this.id = null;
		this.userName = null;
		this.userRole = null;
		$rootScope.loggedIn = false;
	};
}]);