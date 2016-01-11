'use strict';

describe('Service: placeNames', function () {

  // load the service's module
  beforeEach(module('swissnamesApp'));

  // instantiate service
  var placeNames;
  beforeEach(inject(function (_placeNames_) {
    placeNames = _placeNames_;
  }));

  it('should do something', function () {
    expect(!!placeNames).toBe(true);
  });

});
