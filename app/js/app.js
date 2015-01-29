angular.module('angModule1', [])

.controller('mainController', function(){

        var vm = this;

        vm.message = "this is a message";

        vm.exampleList = [
            { name: 'list1', content: 'content1' },
            { name: 'list2', content: 'content2' },
            { name: 'list3', content: 'content3' }
        ];

});