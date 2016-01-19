'use strict';

/**
 * @ngdoc filter
 * @name swissnamesApp.filter:classify
 * @function
 * @description
 * # classify
 * Assumes the "niceName" property from the Suffixes.json file and returns
 * only the first element of the comma separated list..
 */
angular.module('swissnamesApp')
  .filter('classify', function () {
    return function (input) {
      return input.split(',')[0].slice(1);
    };
  });
