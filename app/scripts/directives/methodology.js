'use strict';

/**
 * @ngdoc directive
 * @name swissnamesApp.directive:methodology
 * @description
 * # methodology
 */
angular.module('swissnamesApp')
  .directive('methodology', function () {
    return {
      templateUrl: 'views/methodology.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.find('button').popup({
          inline: false,
          on: 'click',
          lastResort: 'bottom center',
          movePopup: false,
        });
      }
    };
  });
