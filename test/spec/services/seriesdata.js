'use strict';

describe('Service: Seriesdata', function () {

  // load the service's module
  beforeEach(module('geckoApp'));

  // instantiate service
  var Seriesdata;
  beforeEach(inject(function (_Seriesdata_) {
    Seriesdata = _Seriesdata_;
  }));

  it('should do something', function () {
    expect(!!Seriesdata).toBe(true);
  });

});
