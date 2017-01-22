(function () {
    'use strict';

    angular.module('app', [
            // Common (everybody has access to these)
            'app.core',

            // Features (listed alphabetically)
            'app.approot',
            'app.dashboard',
            'app.login',
            'app.topnav'
        ])
        .run(['$location', '$rootScope','primeService',
            function ($location, $rootScope, primeService) {


                $location.path('/dashboard');



                }
                ]);


            })();
