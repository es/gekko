'use strict';

describe('Controller: HighchartsCtrl', function () {

  // load the controller's module
  beforeEach(module('geckoApp'));

  var HighchartsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HighchartsCtrl = $controller('HighchartsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
