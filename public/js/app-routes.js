angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {

            templateUrl: 'views/pages/home.html',
            controller: 'homeController',
            controllerAs: 'home'

        })

        .when('/login', {

            templateUrl: 'views/pages/login.html',
            controller: 'authController',
            controllerAs: 'login'

        })

        .when('/contact', {

            templateUrl: 'views/pages/contact.html',
            controller: 'contactController',
            controllerAs: 'contact'

        })

        .when('/about', {

            templateUrl: 'views/pages/about.html',
            controller: 'aboutController',
            controllerAs: 'about'

        });

    $locationProvider.html5Mode(true);

});