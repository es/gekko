'use strict';

angular.module('geckoApp').service('HighChartsModal',['$modal', function ($modal) {
    var modelVar;
    var open = function (d) {
        modelVar = $modal.open({
            templateUrl: 'views/highcharts-dialog.html',
            controller: 'HighchartsCtrl',
            resolve: {
                sector: function () {
                    return d.parent.name;
                },
                subsector: function () {
                    return d.name;
                }
            }
        });
        console.log('opening!:', d);
    };

    return {
        open: open
    };
}]);