angular.module('starter.filters', [])

.filter('highlight', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return function(text) {
      var selectedWord = $('#seachKeyWord').val();
      if(selectedWord!='' && selectedWord.length>0) {
        var pattern = new RegExp(selectedWord, "gi");
        return text.replace(pattern, '<span class="highlighted">' + selectedWord + '</span>');
      }
      else {
        return text;
      }

    };

}]);
// <span class="highlighted">