'use strict';

describe('Service: Highchartsmodal', function () {

  // load the service's module
  beforeEach(module('geckoApp'));

  // instantiate service
  var Highchartsmodal;
  beforeEach(inject(function (_Highchartsmodal_) {
    Highchartsmodal = _Highchartsmodal_;
  }));

  it('should do something', function () {
    expect(!!Highchartsmodal).toBe(true);
  });

});
