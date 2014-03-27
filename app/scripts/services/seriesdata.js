'use strict';

angular.module('geckoApp').service('SeriesData', ['$rootScope', '$http', function ($rootScope, $http) {
    $rootScope.data.series = {};

    var update = function (subsectorsArr, cb) {
        var sectorsLeft = subsectorsArr.length,
            arr = [];

        for (var i = subsectorsArr.length - 1; i >= 0; i--) {
            $http.get('http://gekko.stolarsky.com/series/' + angular.copy(subsectorsArr[i]).replace(' ', '%20').replace('&', '%26')).success(function(data, status, headers, config) {
                var subSector = config.url.substring(34).replace('%20', ' ').replace('%26', '&');
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
        if (false && angular.isDefined($rootScope.data.series[sector])) {
            var arr = [];
            for (var subSector in $rootScope.data.series[sector]) {
                arr.push(angular.copy($rootScope.data.series[sector][subSector], {}));
            }
            cb(null, arr);
        }
        else {
            var arr = [];

            $rootScope.data.series[sector] = {};
            var sectorsLeft = $rootScope.data.sector2subSector[sector].length;
            for (var i = $rootScope.data.sector2subSector[sector].length - 1; i >= 0; i--) {
                $http.get('http://gekko.stolarsky.com/series/' + angular.copy($rootScope.data.sector2subSector[sector][i]).replace(' ', '%20').replace('&', '%26')).success(function(data, status, headers, config) {
                    var subSector = config.url.substring(34).replace('%20', ' ').replace('%26', '&');
                    
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
