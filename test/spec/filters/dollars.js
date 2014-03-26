'use strict';

describe('Filter: dollars', function () {

  // load the filter's module
  beforeEach(module('geckoApp'));

  // initialize a new instance of the filter before each test
  var dollars;
  beforeEach(inject(function ($filter) {
    dollars = $filter('dollars');
  }));

  it('should return the input prefixed with "dollars filter:"', function () {
    var text = 'angularjs';
    expect(dollars(text)).toBe('dollars filter: ' + text);
  });

});
