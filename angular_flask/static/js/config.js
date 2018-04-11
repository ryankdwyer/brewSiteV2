(function () {
    'use strict';
    angular
        .module('RKDBrewingTools')
    	.config(['$routeProvider', '$locationProvider',
    		function($routeProvider, $locationProvider) {
                $locationProvider.html5Mode({
                      enabled: true,
                        requireBase: false
                });
    		    $routeProvider
    		        .when('/', {
    		        	templateUrl: 'static/partials/landing.html',
    		        	controller: 'IndexController'
    		        })
    		        .when('/about', {
    		        	templateUrl: 'static/partials/about.html',
    		        	controller: 'AboutController'
    		        })
    		        .when('/calculators', {
    		        	templateUrl: 'static/partials/calculators.html',
    		        	controller: 'CalculatorController'
    		        })
					.when('/hydrometer', {
                        templateUrl: 'static/partials/hydrometer.html',
                        controller: 'HydrometerController',
                        controllerAs: 'vm'
                    })
                    .when('/abv', {
                        templateUrl: 'static/partials/abv.html',
                        controller: 'ABVController',
                        controllerAs: 'vm'
                    })
                    .when('/srm', {
                        templateUrl: 'static/partials/srm.html',
                        controller: 'SRMController',
                        controllerAs: 'vm',
                    })
    		        .otherwise({
    		        	redirectTo: '/'
    		        });
    		    $locationProvider.html5Mode(true);
    	}]);
})();
