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
          movePopup: true,
          position: 'bottom center',
          onShow: createCloseButton
        });

        function createCloseButton ($module, $context) {
          console.log($module);
          console.log($context);
          element.find('button.close').bind('click', function () {
            element.find('button').popup('hide');
          });
        }
      }
    };
  });
