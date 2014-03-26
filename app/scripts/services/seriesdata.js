'use strict';

angular.module('geckoApp').service('SeriesData', ['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.data.series = {};

    var update = function (subsectorsArr, cb) {
        var sectorsLeft = subsectorsArr.length,
            arr = [];

        for (var i = subsectorsArr.length - 1; i >= 0; i--) {
            $http.get('http://localhost:3000/series/' + angular.copy(subsectorsArr[i]).replace(' ', '%20').replace('&', '%26')).success(function(data, status, headers, config) {
                /*DONT FORGET TO CHANGE THIS*/
                var subSector = config.url.substring(29).replace('%20', ' ').replace('%26', '&');
                
                // $rootScope.data.series[sector][subSector] = {
                //     name: subSector,
                //     data: data
                // };
                arr.push({
                    name: subSector,
                    data: data
                });
                sectorsLeft--;
                if (sectorsLeft === 0)
                    cb(null, arr);
            });
        }
    };

    var get = function (sector, cb) {
        console.log('$rootScope.data.series[sector]:', $rootScope.data.series[sector]);
        if (false && angular.isDefined($rootScope.data.series[sector])) {
            var arr = [];
            console.log('$rootScope.data.series[sector]:', $rootScope.data.series[sector]);
            for (var subSector in $rootScope.data.series[sector]) {
                console.log('subSector:', subSector);
                console.log('$rootScope.data.series[sector][subSector]:', $rootScope.data.series[sector][subSector]);
                arr.push(angular.copy($rootScope.data.series[sector][subSector], {}));
            }
            cb(null, arr);
        }
        else {
            var arr = [];

            $rootScope.data.series[sector] = {};
            var sectorsLeft = $rootScope.data.sector2subSector[sector].length;
            for (var i = $rootScope.data.sector2subSector[sector].length - 1; i >= 0; i--) {
                console.log("angular.copy($rootScope.data.sector2subSector[sector][i]).replace(' ', '%20').replace('&', '%26'):", angular.copy($rootScope.data.sector2subSector[sector][i]).replace(' ', '%20').replace('&', '%26'));
                $http.get('http://localhost:3000/series/' + angular.copy($rootScope.data.sector2subSector[sector][i]).replace(' ', '%20').replace('&', '%26')).success(function(data, status, headers, config) {
                    /*DONT FORGET TO CHANGE THIS*/
                    var subSector = config.url.substring(29).replace('%20', ' ').replace('%26', '&');
                    
                    $rootScope.data.series[sector][subSector] = {
                        name: subSector,
                        data: data
                    };
                    arr.push({
                        name: subSector,
                        data: data
                    });
                    sectorsLeft--;
                    if (sectorsLeft === 0)
                        cb(null, arr);
                });
            }
            
        }
    };

    return {
        get: get,
        update: update
    }
 }]);
