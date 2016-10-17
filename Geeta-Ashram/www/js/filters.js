angular.module('starter.filters', [])

.filter('highlight', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return function(text) {
      console.log(text);
      var selectedWord = $('#seachKeyWord').val();
      console.log('inside filter: '+ selectedWord);
      if(selectedWord!='') {
      	console.log('inside Filter'+text)
        var pattern = new RegExp(selectedWord, "gi");
        return text.replace(pattern, '[[' + selectedWord + ']]');
      }
      else {
        return text;
      }

    };

}]);
// <span class="highlighted">