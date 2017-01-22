//Service file to get data
(function(){

    'use strict';

    angular.module('app').factory('primeService', serviceFunction);

    serviceFunction.$inject = ['$http', '$q'];

    /* @ngInject */
    function serviceFunction($http, $q) {

        var service = {
            getUserPackages: getUserPackages
        };

        return service;

        /* -----------------  Service methods  ------------------------- */

        function getUserPackages() {

            var deferred = $q.defer();

            $http({
                url: 'http://ec2-54-235-229-245.compute-1.amazonaws.com:8080/user/kasper',
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(function (response) {
                var cards = response.data;


                deferred.resolve(cards);
            });
            return deferred.promise;

        }
    }

})();

