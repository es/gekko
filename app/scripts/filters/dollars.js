'use strict';

angular.module('geckoApp')
  .filter('dollars', function () {
    return function (input) {
      return '$' + parseInt(parseFloat(input)*100)/100;
    };
  });
