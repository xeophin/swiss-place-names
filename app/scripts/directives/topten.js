(function ($) {
  'use strict';

  /**
   * @ngdoc directive
   * @name swissnamesApp.directive:topten
   * @description
   * # topten
   */
  angular.module('swissnamesApp')
    .directive('topten', topten);

  function topten() {
    return {
      templateUrl: 'views/topten.template.html',
      restrict: 'E',
      replace: true,
      scope: true,
      link: link
    };

    function link(scope, element, attrs) {
      scope.limit = attrs.limit;
    }

  }
})(jQuery);
