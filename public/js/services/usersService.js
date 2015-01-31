angular.module('usersService', [])

.factory('Users', function($http){

        var usersFactory = {};

        usersFactory.all = function(){

            // temporarily using a token for testing
            return $http.get('/api/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiYmlsbCIsInVzZXJuYW1lIjoiYmlsbCIsImlhdCI6MTQyMjc0ODU0NSwiZXhwIjoxNDIyODM0OTQ1fQ.hR6TJ7K2FryyarX_LH5yicBpdtuzbw0Ri-5Njmq5czY')

        };

        return usersFactory;

    });