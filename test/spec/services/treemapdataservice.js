'use strict';

describe('Service: Treemapdataservice', function () {

  // load the service's module
  beforeEach(module('geckoApp'));

  // instantiate service
  var Treemapdataservice;
  beforeEach(inject(function (_Treemapdataservice_) {
    Treemapdataservice = _Treemapdataservice_;
  }));

  it('should do something', function () {
    expect(!!Treemapdataservice).toBe(true);
  });

});
