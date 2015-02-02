angular.module('authController', ['appRoutes', 'userService', 'authService'])

    .controller('authController', function($rootScope, $location, Auth) {

        var vm = this;

        // get info if user is logged in
        vm.loggedIn = Auth.isLoggedIn();

        // check to see if user is logged in on every request
        $rootScope.$on('$routeChangeStart', function() {

            vm.loggedIn = Auth.isLoggedIn();

        });


        // function handle login form
        vm.doLogin = function () {

            Auth.login(vm.loginData.username, vm.loginData.password)

                .success(function(data) {

                    // get user information after logging in
                    Auth.getUser()

                        .then(function(data) {
                            vm.user = data.data;
                        });

                    // if a user successfully logs in, redirect to homepage
                    $location.path('/');

                });
        };

        // function to handle logging out
        vm.doLogout = function() {

            Auth.logout();
            $location.path('/');

        }

    });