'use strict';

describe('Directive: topten', function () {

  // load the directive's module
  beforeEach(module('swissnamesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<topten></topten>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the topten directive');
  }));
});
