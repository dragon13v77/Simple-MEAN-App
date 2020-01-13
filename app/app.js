var app = angular.module('app', ['ui.router', 'ngCookies', 'ngMaterial', 'ngMessages', 'header', 'footer']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

	//$locationProvider.html5Mode({
	//	enabled: true,
	//	requireBase: false
	//});

	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('orange');

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/partials/home/partial-home.html'
		})
		//.state('home.list', {
		//	url: '/list',
		//	templateUrl: '/app/partials/home/partial-home-list.html',
		//	controller: function ($scope) {
		//		$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
		//	}
		//})
		//.state('home.paragraph', {
		//	url: '/paragraph',
		//	template: 'I could sure use a drink right now.'
		//})
		.state('tutorials', {
			url: '/tutorials',
			templateUrl: '/partials/tutorials/partial-tutorials-list.html',
			controller: 'tutorialsController'
		})
		.state('tutorial', {
			url: '/tutorial/{tutorialId}',
			templateUrl: '/partials/tutorials/partial-tutorial.html',
			controller: 'tutorialController'
		})
		.state('about', {
			url: '/about',
			views: {
				// the main template will be placed here (relatively named)
				'': {
					templateUrl: '/partials/about/partial-about.html'
				},

				// the child views will be defined here (absolutely named)
				'columnOne@about': {
					template: 'Look I am a column!'
				},

				// for column two, we'll define a separate controller
				'columnTwo@about': {
					templateUrl: '/partials/about/table-data.html',
					controller: 'scotchController'
				}
			}
		})
		.state('login', {
			url: '/login',
			templateUrl: '/partials/login/partial-login.html',
			controller: 'loginController'
		})
});

app.controller('scotchController', function ($scope) {
	$scope.message = 'Fine scotches';

	$scope.scotches = [
		{
			name: 'Macallan 12',
			price: 50
		},
		{
			name: 'Chivas Regal Royal Salute',
			price: 10000
		},
		{
			name: 'Glenfiddich 1937',
			price: 20000
		}
	];
});
