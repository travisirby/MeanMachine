angular.module('authService', [])

    // ======================================
    // auth factor to login and get info
    // ======================================
    .factory('Auth', function($http, $q, AuthToken){


        var authFactory = {};

        // log a user in
        authFactory.login = function(username, password) {

            return $http.post('/api/authenticate', {
                username: username,
                password: password
            })

            .success(function(data){
                AuthToken.setToken(data.token);
                return data;
            });

        };

        // log out user by clearing the token
        authFactory.logout = function() {

            // clear the token
            AuthToken.setToken();

        };

        // check if user is logged in by checking if a token exists
        authFactory.isLoggedIn = function (){

            if (AuthToken.getToken())
                return true;
            else
                return false;

        };

        // get the logged in user
        authFactory.getUser = function (){

            if (AuthToken.getToken())
                return $http.get('/api/me');

            else
                return $q.reject({ message: 'User has no token'});

        };

        return authFactory;

    })

    // ======================================
    // factor for handling tokens
    // ======================================
    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

        // get the token out of local storage
        authTokenFactory.getToken = function() {

            return $window.localStorage.getItem('token');

        };

        // set token if passed. if no token, clear it from local storage
        authTokenFactory.setToken = function(token) {

            if (token)
                $window.localStorage.setItem('token', token);

            else
                $window.localStorage.removeItem('token');

        };

        return authTokenFactory;

    })

    // ======================================
    // application config to integrate token into requests
    // ======================================
    .factory('AuthInterceptor', function($q, AuthToken){

        var interceptorFactory = {};

        // this will happen on all HTTP requests
        interceptorFactory.request = function(config) {

            // grab the token
            var token = AuthToken.getToken();

            // if the token exists, add it to the header as x-access-token
            if (token)
                config.headers['x-access-token'] = token;

            return config;

        };

        // error response
        interceptorFactory.responseError = function (response) {

            if (response.status == 403)
                $location.path('/login');

            // return the errors from the server as a promise
            return $q.reject (response);

        }

        return interceptorFactory;

    });
