(function ($, d3, angular) {
  'use strict';

  /**
   * @ngdoc directive
   * @name swissnamesApp.directive:topten
   * @description
   * # topten
   */
  angular.module('swissnamesApp')
    .directive('topten', topten);

  function topten(suffixes) {
    return {
      templateUrl: 'views/topten.template.html',
      restrict: 'E',
      replace: true,
      link: link
    };

    function link(scope, element, attrs) {
      scope.suffixList = [];

      activate();

      /*------------------------------------
                 FUNCTIONS
       ------------------------------------*/

      function activate(){
        suffixes.getSuffixes().then(onSuffixesLoaded);
      }

      function onSuffixesLoaded(data){
        scope.suffixList = angular.fromJson(data);
      }
    }
  }
})(jQuery, d3, angular);
