'use strict';

describe('Service: suffixes', function () {

  // load the service's module
  beforeEach(module('swissnamesApp'));

  // instantiate service
  var suffixes;
  beforeEach(inject(function (_suffixes_) {
    suffixes = _suffixes_;
  }));

  it('should do something', function () {
    expect(!!suffixes).toBe(true);
  });

});
