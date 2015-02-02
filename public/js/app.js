angular.module('angModule1', ['appRoutes', 'ngAnimate', 'userService', 'authService', 'authController'])

// application configuration to integrate token into requests
.config(function($httpProvider) {

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');

})

.controller('homeController', function($rootScope, $location, Auth, User){

        var vm = this;

        vm.loggedIn = Auth.isLoggedIn();

        if (!vm.loggedIn) {
            $location.path('/login');
        }
        else {
            // get user info on page load
            Auth.getUser()

                .success(function(data) {
                    vm.user = data;
                });
        }


        vm.message = "this is a message";

        // info that comes from the form
        vm.formData = {};

        vm.addToExampleList = function() {

            vm.exampleList.push ({
                name: vm.formData.name,
                content: vm.formData.content
            });

            // clear form
            vm.formData = {};

        };

        User.all()

            .success(function(data){

                vm.users = data;

            })

        vm.exampleList = [
            { name: 'list1', content: 'content1' },
            { name: 'list2', content: 'content2' },
            { name: 'list3', content: 'content3' }
        ];

})

.controller('contactController', function(){

    var vm = this;

    vm.title = "contact page";

    vm.message = "";

    // info that comes from the form
    vm.formData = {};

    vm.submitContactInfo = function() {

        vm.message = "contact info submitted. thank you " + vm.formData.name + ".";

        vm.formData = {};

    };

})

.controller('aboutController', function(){

    var vm = this;

    vm.title = "about page";

    vm.message = "this is the about page.";


});