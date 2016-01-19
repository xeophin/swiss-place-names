'use strict';

describe('Filter: shorten', function () {

  // load the filter's module
  beforeEach(module('swissnamesApp'));

  // initialize a new instance of the filter before each test
  var shorten;
  beforeEach(inject(function ($filter) {
    shorten = $filter('shorten');
  }));

  it('should return the input prefixed with "shorten filter:"', function () {
    var text = 'angularjs';
    expect(shorten(text)).toBe('shorten filter: ' + text);
  });

});
