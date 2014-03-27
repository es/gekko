'use strict';

angular.module('geckoApp').controller('HighchartsCtrl', ['$scope', '$modalInstance', 'sector', 'subsector', 'SeriesData', '$compile', '$rootScope', 'dateParseService', '$interval', '$timeout', function ($scope, $modalInstance, sector, subsector, SeriesData, $compile, $rootScope, dateParseService, $interval, $timeout) {
    $scope.sector = sector;
    var seriesOptions = [];
    $scope.select2Options = {
        'multiple': true
    };
    
    $scope.months = [];
    for (var year in $rootScope.data.validDates) {
        for (var month in $rootScope.data.validDates[year]) {
            $scope.months.push(dateParseService.miniParse(month, year));
        }    
    }

    // to keep name space clean
    (function () {
        var arr = [];
        for (var sector in $rootScope.data.sector2subSector) {
            arr.push({
                name: sector,
                data: angular.copy($rootScope.data.sector2subSector[sector])
            });
        }
        $scope.sectors = arr;
    })();

    SeriesData.get(sector, function (err, data) {
        if (err) console.error('err:', err);
        seriesOptions = data;
        $scope.select2 = [];
        for (var i = data.length - 1; i >= 0; i--) {
            $scope.select2.push(data[i].name);
        }
        $scope.chartConfig = {
            useHighStocks: true,
            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? '+' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },
            options: {
                rangeSelector: {
                    buttonTheme: {
                        style: {
                            display: 'none'
                        }
                    },
                    inputEnabled: true,
                    selected: 4
                },
                navigator: {
                    enabled : true,
                    series: {
                        id: 'nav'
                    },
                    adaptToUpdatedData: true
                },
                plotOptions: {
                    series: {
                        compare: 'value'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 2
                }
            },
            xAxis: {},
            series: seriesOptions
        };

        var highchart = angular.element(document.createElement('highchart'))
                               .attr('id', 'chart')
                               .attr('config', 'chartConfig');

        var el = $compile( highchart )( $scope );
          
        //where do you want to place the new element?
        angular.element('#chart-container').append(highchart);  
        $scope.insertHere = el;
        // console.log('$scope.insertHere:', $scope.insertHere);

        // $scope.getMinMax();
    });

    var oldMin = void 0, oldMax = void 0, oldLength = 0;
    $interval(function () {
        if (Math.round($rootScope.data.chart.xAxis[0].min) !== oldMin || Math.round($rootScope.data.chart.xAxis[0].max) !== oldMax) {
            oldMin = Math.round($rootScope.data.chart.xAxis[0].min);
            oldMax = Math.round($rootScope.data.chart.xAxis[0].max);
            updateMinMax();
        }
    }, 750);

    var updateMinMax = function () {
        // Try to optimize later?
        var simpleIndexOf = function (searchElement, arr, larger) {
            if (!angular.isDefined(searchElement)) return -1;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i][0] <= searchElement && i + 1 < len && arr[i + 1][0] >= searchElement)
                    return larger ? ++i : i;
            }
            return -1;
        };

        try {
            var arr = [];
            for (var i = 0, len = $scope.chartConfig.series.length; i < len; i++) {
                var minI = simpleIndexOf(Math.round($rootScope.data.chart.xAxis[0].min), angular.copy($scope.chartConfig.series[i].data, []), false),
                    maxI = simpleIndexOf(Math.round($rootScope.data.chart.xAxis[0].max), angular.copy($scope.chartConfig.series[i].data, []), true);
                if (!angular.isNumber(minI) || minI === -1) minI = 0;
                if (!angular.isNumber(maxI) || maxI === -1) maxI = $scope.chartConfig.series[i].data.length - 1;
                var tempArr = $scope.chartConfig.series[i].data.slice(minI, maxI).sort(function (a, b) {
                    if (a[1] === b[1])
                        return 0;
                    else if (a[1] > b[1])
                        return 1;
                    else
                        return -1;
                });
                arr.push({
                    subsector:  angular.copy($scope.chartConfig.series[i].name),
                    max: tempArr[tempArr.length - 1][1],
                    min: tempArr[0][1]
                })
            }
            $scope.minMaxArr = arr;
        }
        catch (e) {
            console.error(e);
        }
    };
    
    $scope.minMaxArr = [];
    $scope.selectedMonth = 'noMonth';
    $scope.changeRange = function (dateObj) {
        var lastDay;
        if (dateObj.getMonth() === 1)
            lastDay = 28;
        else if ([0, 2, 4, 6, 7, 9, 11].indexOf(dateObj.getMonth()) !== -1)
            lastDay = 31;
        else
            lastDay = 30;
        var minDate = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), 1),
            lastDate = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), lastDay);
        $scope.chartConfig.xAxis.min = minDate; 
        $scope.chartConfig.xAxis.max = lastDate;
    };

    $scope.update = function (currentSubsectors) {
        SeriesData.update(currentSubsectors, function (err, data) {
            $scope.chartConfig.series = data;
            updateMinMax();

            /*$timeout(function() {
                var nav = $rootScope.data.chart.get('nav');
                console.log('nav:', nav);
                nav.setData(data[0].data);
                    // nav.series.redraw(true);
            }, 100);*/

        });
    };

    $scope.ok = function () {
        $modalInstance.close('close');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
