'use strict';

describe('Directive: visual', function () {

  // load the directive's module
  beforeEach(module('swissnamesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<visual></visual>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the visual directive');
  }));
});
