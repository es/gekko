'use strict';

describe('Service: Dateparseservice', function () {

  // load the service's module
  beforeEach(module('geckoApp'));

  // instantiate service
  var Dateparseservice;
  beforeEach(inject(function (_Dateparseservice_) {
    Dateparseservice = _Dateparseservice_;
  }));

  it('should do something', function () {
    expect(!!Dateparseservice).toBe(true);
  });

});
