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
        $('.ui.modal.methodology').modal();

        element.bind('click', function(){
          $('.ui.modal.methodology').modal('show');
        })
      }
    };
  });
