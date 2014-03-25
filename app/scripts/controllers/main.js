'use strict';

angular.module('geckoApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$interval', 'dateParseService', function ($scope, $rootScope, $interval, dateParseService) {
    if(!$rootScope.data) $rootScope.data = {};
    $scope.$watch(function () {
        return $rootScope.data.datesArr;
    }, function (oldVal, newVal) {
        if (oldVal !== newVal) {
            $scope.dates = $rootScope.data.datesArr;
            $scope.dateSelected = dateParseService.parse($rootScope.data.datesArr[0]);
            $scope.datesPresent = true;
            $scope.currentData = $rootScope.data.currentDate;
            $scope.minDate = $rootScope.data.datesArr[0];
            $scope.maxDate = dateParseService.parse($rootScope.data.datesArr[$rootScope.data.datesArr.length - 1]);
            $scope.sectors = $rootScope.data.sector2subSector;
        }
    });
    $scope.clicked = function () {
        $scope.dateSelected = $scope.dateSelected;
        dateIndex = $rootScope.data.datesArr.indexOf($scope.dateSelected.toISOString().substring(0, 10));
    };

    $scope.sectorColor = function (sector) {
        return {
            "background": $rootScope.data.colors[sector],
            "vertical-align": "middle" 
        };
    };


    $scope.dateInvalid = function (date, mode) {
        if (!$rootScope.data.datesArr) return true;
        try {
            if (mode === 'day') {
                return !$rootScope.data.validDates[date.getFullYear()][date.getMonth() + 1][date.getDate()];
            }
            else if (mode === 'year') {
                return !$rootScope.data.validDates[date.getFullYear()];
            }
            else {
                return !$rootScope.data.validDates[date.getFullYear()][date.getMonth() + 1];
            }
        }
        catch (e) {
            if (!$rootScope.data.validDates) 
                return false;
            else
                return true;
        }
    };

    $scope.isActive = function (btn) {
        return btn === $scope.dateControlPanel ? 'active' : '';
    };

    $scope.dateControlPanel = 'pause';
    var dateChangeInterval, changeSpeed = 1, direction = 1, dateIndex = 0; // direction: 1 --> forwards, -1 --> backwards
    $scope.dateControl = function (action) {
        var startInterval = function () {
            var datScope = $scope;
            dateChangeInterval = $interval(function () {
                if (dateIndex === 0 && direction === -1 || direction === 1 && dateIndex === $rootScope.data.datesArr.length - 1) {
                    $interval.cancel(dateChangeInterval);
                    dateChangeInterval = void 0;
                    $scope.dateControlPanel = 'pause';
                }
                else {
                    dateIndex += direction;
                    $scope.dateSelected = dateParseService.parse($rootScope.data.datesArr[dateIndex]);
                }
            }, 1500/changeSpeed, 0, true);
        };
        $interval.cancel(dateChangeInterval); // cancel interval
        dateChangeInterval = void 0;
        switch (action) {
            case 'fast-backward':
                $scope.dateControlPanel = 'fast-backward';
                console.log('fast-backward');
                $scope.dateSelected = dateParseService.parse($rootScope.data.datesArr[0]);
                dateIndex = 0;
                $scope.dateControlPanel = 'pause';
                break;
            case 'backward':
                $scope.dateControlPanel = 'backward';
                console.log('backward');
                direction = -1; // set direction backwards
                changeSpeed = 1; // set speed 1
                startInterval(); // start interval
                break;
            case 'pause':
                $scope.dateControlPanel = 'pause';
                console.log('pause');
                break;
            case 'play':
                $scope.dateControlPanel = 'play';
                console.log('play');
                direction = 1; // set direction forward
                changeSpeed = 1; // set speed 1
                startInterval(); // start interval
                break;
            case 'forward':
                $scope.dateControlPanel = 'forward';
                console.log('forward');
                direction = 1; // set direction forward
                changeSpeed = 3; // set speed 3
                startInterval(); // start interval
                break;
            case 'fast-forward':
                $scope.dateControlPanel = 'fast-forward';
                console.log('fast-forward');
                $scope.dateSelected = dateParseService.parse($rootScope.data.datesArr[$rootScope.data.datesArr.length - 1]);
                dateIndex = $rootScope.data.datesArr.length - 1;
                $scope.dateControlPanel = 'pause';
                break;
            default:
                console.log('do nothing!');
                break;
        }
    };

  }]);
