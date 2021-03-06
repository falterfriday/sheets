var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMaterial', 'ngMessages']);
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
	   .primaryPalette('cyan', {
            'default': '400',
            'hue-1': '900',
            'hue-2': '600',
            'hue-3': '400',
       });

});
app.config(function($routeProvider){
$routeProvider
	.when('/', {
		templateUrl: 'partials/welcome.html',
		controller: 'adminController'
	})
	.when('/stations', {
		templateUrl: 'partials/stations.html',
		controller: 'batchController'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'batchController'
	})
	.when('/wash', {
		templateUrl: 'partials/wash_station.html',
		controller: 'batchController'
	})
	.when('/dry', {
		templateUrl: 'partials/dry_station.html',
		controller: 'batchController'
	})
	.when('/folder', {
		templateUrl: 'partials/folder_station.html',
		controller: 'batchController'
	})
	.when('/finish', {
		templateUrl: 'partials/finish_station.html',
		controller: 'batchController'
	})
	.when('/batch', {
		templateUrl: 'partials/batch.html',
		controller: 'batchController'
	})
	.when('/new_customer', {
		templateUrl: 'partials/newcustomer.html',
		controller: 'customerController'
	})
	.when('/edit_customer/:id', {
		templateUrl: 'partials/edit_customer.html',
		controller: 'customerController'
	})
	.when('/customer_manage', {
		templateUrl: 'partials/manage_customer.html',
		controller: 'customerController'
	})
	.when('/new_item',  {
		templateUrl: 'partials/newitem.html',
		controller: 'itemController'
	})
	.when('/item_manage', {
		templateUrl: 'partials/manage_items.html',
		controller: 'itemController'
	})
	.when('/edit_item/:id', {
		templateUrl: 'partials/edit_items.html',
		controller: 'itemController'
	})
	.when('/update_user', {
		templateUrl: 'partials/update_user.html',
		controller: 'adminController'
	})
	.when('/view_batch/:id', {
		templateUrl: 'partials/view_batch.html',
		controller: 'batchController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
