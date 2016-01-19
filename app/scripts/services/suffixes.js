(function(angular){
'use strict';

/**
 * @ngdoc service
 * @name swissnamesApp.suffixes
 * @description
 * # suffixes
 * Service in the swissnamesApp.
 */
angular.module('swissnamesApp')
  .service('suffixService', suffixes);

  function suffixes($http, $q){
    var service = {
      getSuffixes: getSuffixes,
      list: list
    };

    return service;

    ////////////////////////////////////

    var list;

    function getSuffixes() {
      if (angular.isDefined(list)) {
        return $q.when(list);
      }

      return $http.get('data/suffixes.json', {cache: true})
        .then(getSuffixesSuccess)
        .catch(getSuffixesError);

      function getSuffixesSuccess(response) {
        list = angular.fromJson(response.data);
        return list;
      }

      function getSuffixesError(error) {
        console.error(error);
      }
    }
  }

})(angular);
