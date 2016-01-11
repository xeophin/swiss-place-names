(function(){
'use strict';

/**
 * @ngdoc service
 * @name swissnamesApp.suffixes
 * @description
 * # suffixes
 * Service in the swissnamesApp.
 */
angular.module('swissnamesApp')
  .service('suffixes', suffixes);

  function suffixes($http){
    return {getSuffixes: getSuffixes};

    function getSuffixes() {
      return $http.get('data/suffixes.json')
        .then(getSuffixesSuccess)
        .catch(getSuffixesError);

      function getSuffixesSuccess(response) {
        return response.data;
      }

      function getSuffixesError(error) {
        console.error(error);
      }
    }
  }

})();
