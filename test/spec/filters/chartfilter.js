'use strict';

describe('Filter: chartFilter', function () {

  // load the filter's module
  beforeEach(module('geckoApp'));

  // initialize a new instance of the filter before each test
  var chartFilter;
  beforeEach(inject(function ($filter) {
    chartFilter = $filter('chartFilter');
  }));

  it('should return the input prefixed with "chartFilter filter:"', function () {
    var text = 'angularjs';
    expect(chartFilter(text)).toBe('chartFilter filter: ' + text);
  });

});
