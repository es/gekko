'use strict';

angular.module('geckoApp')
  .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    if(!$rootScope.data) $rootScope.data = {};
    
    $scope.$watch(function () {
    	return $rootScope.data.datesArr;
    }, function (oldVal, newVal) {
    	if (oldVal !== newVal) {
    	    $scope.dates = $rootScope.data.datesArr;
    	    $scope.dateSelected = $rootScope.data.datesArr[0];
    	    $scope.datesPresent = true;
    	}
    });

    // $scope.$watch('dateSelected', function () {
    // 	$rootScope.data.dateSelected = $scope.dateSelected;
    // });
  	
  }]);
