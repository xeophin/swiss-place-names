'use strict';

/**
 * @ngdoc filter
 * @name swissnamesApp.filter:shorten
 * @function
 * @description
 * # shorten
 * Assumes the niceNames property in suffixes.json and returns the first
 * element of the comma separated list, without the preceding "-".
 */
angular.module('swissnamesApp')
  .filter('shorten', function () {
    return function (input) {
      return input.split(',')[0];
    };
  });
