(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('tmplDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
            scope: {}
        };


        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['$scope', '$uibModal', '$rootScope', 'primeService'];

    /* @ngInject */
    function ControllerFunction($scope, $uibModal, $rootScope, primeService) {

        $scope.run = function () {
            primeService.getUserPackages().then(function (data) {

                console.log("request done",data);

                $scope.containerList = data;


            });

        };

        $scope.run();




        $scope.trackPackage = function (container) {


            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'src/components/modal/trackPackage.html',
                controller: ['$scope', '$modalInstance', 'container', '$uibModalInstance', function ($scope, $modalInstance, container, $uibModalInstance) {
                    console.log("inside modal selected container", container);


                    $scope.container = container;

                    $scope.locations = [];
                    $scope.locationNames = [];

                    $scope.locations.push($scope.container.por_here,$scope.container.pol_here, $scope.container.pod_here, $scope.container.pdel_here);
                    $scope.locationNames.push($scope.container.por_city,$scope.container.pol_city, $scope.container.pod_city, $scope.container.pdel_city);

                    $scope.locationArray = $scope.locations.map(function (value, index) {

                        return {
                            data: value,
                            value: $scope.locationNames[index]
                        }

                    });


                    console.log("scope.locations 1", $scope.locationArray);



                    if (container.por_here == true) {
                        console.log("por_here");
                    }
                    if (container.pol_here == true) {
                        console.log("pol_here");

                        $scope.locationArray[0].data = true;
                        $scope.locationArray[0].past = true;



                    }
                    if (container.pod_here == true) {

                        $scope.locationArray[0].data = true;
                        $scope.locationArray[1].data = true;
                        $scope.locationArray[0].past = true;
                        $scope.locationArray[1].past = true;

                        console.log("pod_here", this);
                        $scope.cityName = container.pod_city.toLowerCase();
                        console.log("cityName", $scope.cityName);

                    }
                    if (container.pdel_here == true) {
                        console.log("pdel_here");

                    }

                    console.log("scope.locations 2", $scope.locationArray);


                    var geocoder =  new google.maps.Geocoder();
                    geocoder.geocode( { 'address': $scope.cityName +', us'}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            console.log("location : " + $scope.cityName + " " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());

                            $scope.cityLat = results[0].geometry.location.lat();
                            $scope.cityLong = results[0].geometry.location.lng();

                        } else {
                            alert("Something got wrong " + status);
                        }
                    });


                    setTimeout(function () {

                        var chart = Highcharts.mapChart('container', {

                            chart: {
                                backgroundColor: null
                            },

                            title: {
                                text: 'Current Location',
                                style: {
                                    color: '#fff'
                                }
                            },
                            credits: {
                                enabled: false
                            },

                            exporting: {
                                enabled: false
                            },


                            series: [{
                                name: 'Basemap',
                                mapData: Highcharts.maps['custom/world'],
                                borderColor: '#606060',
                                nullColor: 'rgba(200, 200, 200, 0.2)',
                                showInLegend: false
                            }, {
                                name: 'Separators',
                                type: 'mapline',
                                data: Highcharts.geojson(Highcharts.maps['custom/world'], 'mapline'),
                                color: 'blue',
                                enableMouseTracking: false,
                                showInLegend: false
                            }, {
                                type: 'mapbubble',
                                color: 'green',
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.capital}'
                                },
                                name: '',
                                data: [{
                                    name: $scope.cityName,
                                    lat: $scope.cityLat,
                                    lon: $scope.cityLong
                                }],
                                maxSize: '6%'
                            }]
                        });


                    }, 1000);


                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };


                }],
                size: 'lg',
                resolve: {
                    container: function () {
                        return container;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {

            });
        };


    }

})();
