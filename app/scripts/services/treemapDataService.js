'use strict';

angular.module('geckoApp').service('TreemapDataService', ['$http', '$rootScope', function ($http, $rootScope) {
    var currentDate,
        onloadCbArr = [],
        currentTreemapData = {
            name: 'Treemap',
            children: []
        };
    
    $rootScope.data = {};
    $rootScope.data.datesArr = [];
    $rootScope.data.weightsDB = {};
    $rootScope.data.sector2subSector = {}
    $rootScope.data.subSector2sector = {}
    
    var onload = function (cb) {
        onloadCbArr.push(cb);
    };

    $http.get('http://gekko.stolarsky.com/map/').success(function(data, status, headers, config) {
        for (var i = 0, len = data.length; i < len; i++) {
            if (!$rootScope.data.sector2subSector[ data[i].sector ]) {
                currentTreemapData.children.push({
                    name: data[i].sector,
                    children: []
                });
            }
                
            if($rootScope.data.sector2subSector[ data[i].sector ]) $rootScope.data.sector2subSector[ data[i].sector ].push(data[i].sub_sector);
            else $rootScope.data.sector2subSector[ data[i].sector ] = [data[i].sub_sector];
            $rootScope.data.subSector2sector[ data[i].sub_sector ] = data[i].sector;
        }
    });

    var parse = function (dateStr) {
        return {
            year: Number(dateStr.substring(0, 4)),
            month: Number(dateStr.substring(5, 7)),
            day: Number(dateStr.substring(8))
        };
    };

    $http.get('http://gekko.stolarsky.com/dates').success(function(dates, status, headers, config) {
        $rootScope.data.datesArr = dates;
        $rootScope.data.validDates = {};
        $rootScope.data.currentDate = currentDate = $rootScope.data.datesArr[0];
        $http.get('http://gekko.stolarsky.com/weights/' + currentDate).success(function(data, status2, headers2, config2) {
            //process data
            $rootScope.data.weightsDB[currentDate] = data;
            process(data);
            for (var cb in onloadCbArr) {
                onloadCbArr[cb](null, currentTreemapData);    
            }
        });
        
        var temp;
        for (var i = $rootScope.data.datesArr.length - 1; i >= 0; i--) {
            temp = parse($rootScope.data.datesArr[i]);
            if (!$rootScope.data.validDates[temp.year]) 
                $rootScope.data.validDates[temp.year] = {};
            if (!$rootScope.data.validDates[temp.year][temp.month]) 
                $rootScope.data.validDates[temp.year][temp.month] = {};
            if (!$rootScope.data.validDates[temp.year][temp.month][temp.day]) 
                $rootScope.data.validDates[temp.year][temp.month][temp.day] = true;
        }
    });

    var process = function (data) {
        var tempHashTable = {};    
        for (var i = 0, len = data.length; i < len; i++) {
            data[i].name = data[i].sub_sector;
            if(tempHashTable[$rootScope.data.subSector2sector[data[i].sub_sector]])
                tempHashTable[$rootScope.data.subSector2sector[data[i].sub_sector]].push(angular.copy(data[i], {}));
            else
                tempHashTable[$rootScope.data.subSector2sector[data[i].sub_sector]] = [angular.copy(data[i], {})];
        }

        for (var i = 0, len = currentTreemapData.children.length; i < len; i++) {
            currentTreemapData.children[i].children = tempHashTable[currentTreemapData.children[i].name];
        }
    };

    var update = function (data) {
        var tempHashTable = {};    
        for (var i = 0, len = data.length; i < len; i++) {
            data[i].name = data[i].sub_sector;
            tempHashTable[data[i].sub_sector] = data[i];
        }

        for (var i = 0, len = currentTreemapData.children.length; i < len; i++) {
            for (var a = 0, len2 = currentTreemapData.children[i].children.length; a < len2; a++) {
                if (tempHashTable[currentTreemapData.children[i].children[a].name])
                    currentTreemapData.children[i].children[a].weight = tempHashTable[currentTreemapData.children[i].children[a].name].weight;
            }
        }
    };

    var setDate = function (date, cb) {
        if ($rootScope.data.datesArr.indexOf(date) === -1) return;
        currentDate = date;
        if ($rootScope.data.weightsDB[currentDate]) {
            update($rootScope.data.weightsDB[currentDate]);
            cb(null, currentTreemapData);
        }
        else {
            $http.get('http://gekko.stolarsky.com/weights/' + currentDate).success(function(data, status, headers, config) {
                $rootScope.data.weightsDB[currentDate] = data;
                update(data);
                cb(null, currentTreemapData);
            });
        }
    };

    return {
    	data: currentTreemapData,
        setDate: setDate,
        onload: onload
    };
}]);
