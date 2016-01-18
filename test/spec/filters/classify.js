'use strict';

describe('Filter: classify', function () {

  // load the filter's module
  beforeEach(module('swissnamesApp'));

  // initialize a new instance of the filter before each test
  var classify;
  beforeEach(inject(function ($filter) {
    classify = $filter('classify');
  }));

  it('should return the input prefixed with "classify filter:"', function () {
    var text = 'angularjs';
    expect(classify(text)).toBe('classify filter: ' + text);
  });

});
