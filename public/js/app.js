angular.module('angModule1', ['angularRoutes', 'ngAnimate', 'userService'])

.controller('homeController', function(Users){

        var vm = this;

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

        Users.all()

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