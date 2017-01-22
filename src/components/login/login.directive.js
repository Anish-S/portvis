(function () {

    'use strict';

    angular.module('app.login')
        .directive('primeLogin', directiveFunction)
        .controller('LoginController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/login/login.html',
            scope: {},
            controller: 'LoginController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', '$state'];

    /* @ngInject */
    function ControllerFunction($scope, $state) {

        activate();

        function activate() {

        }

        $scope.click = function (user) {


            console.log("user details", user);

             $state.go('dashboard', {});


        }


    }

})();
