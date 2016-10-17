angular.module('starter.services', [])

.factory('$omdbservice', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
        searchOMDB: function(params) {
            var deferred = $q.defer(); //create promise to handle async data
            console.log("PARAMS: ",params);
          
            var searchtype = params.id ? "i" : "s"; /// What type of search is this, ID or TITLE?
            var search = params.id ? params.id : params.title; /// Which param to use ID or STRING?

            $http.get("http://www.omdbapi.com/?"+searchtype+"="+search+"&y="+params.year+"&plot="+$rootScope.userSettings.plot+"&tomatoes=true&r="+$rootScope.userSettings.feedType)
            .success(function(data) {
                console.log(data)
                deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
                deferred.reject(msg); // reject promise with message
            });

            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        searchOMDBbyId: function(mId,year){
          var deferred = $q.defer(); //create promise to handle async data
          var searchtype = "i";
          var search = mId;
          $http.get("http://www.omdbapi.com/?"+searchtype+"="+search+"&y="+year+"&plot="+$rootScope.userSettings.plot+"&tomatoes=true&r="+$rootScope.userSettings.feedType)
            .success(function(data) {
                console.log(data)
                deferred.resolve(data); // resolve promise with data
            })
            .error(function(msg, code) {
                deferred.reject(msg); // reject promise with message
            });

            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        }
    }
}])

.factory('$geeta', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
      getChapterRelatedSholkas: function(id,starting,ending){
          var deferred = $q.defer(); //create promise to handle async data
          var chapterSelected = [];
          var allShlokas = {};
          
          $http.get('js/data/shlokas_tbl.json').success(function(all){
            allShlokas = all;
            for (var i = starting; i < ending ; i++){
              if(allShlokas[i].chapter == id){
                chapterSelected.push(allShlokas[i]);
              }
            }
          });
          
          deferred.resolve(chapterSelected);
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        getVerse: function(verseNo){
          var deferred = $q.defer(); //create promise to handle async data

          $http.get('js/data/shlokas_tbl.json').success(function(all){
            deferred.resolve(all[verseNo-1]);
          });
         
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        find: function(searchTerm){

          var deferred = $q.defer(); //create promise to handle async data
          var found = 0;
          var chapterSelected = [];
          var searchTermN = searchTerm.toLowerCase();

          $http.get('js/data/shlokas_tbl.json').success(function(all){
            for (var i = 0; i < all.length ; i++){
              var engline1 = all[i].ShlokaEngLine1.toLowerCase();
              var engline2 = all[i].ShlokaEngLine2.toLowerCase();
              var engline3 = all[i].ShlokaEngLine3.toLowerCase();
              var engline4 = all[i].ShlokaEngLine4.toLowerCase();
              var engDescription =  all[i].Description.toLowerCase();
              var quotedBy = all[i].Quoted_by.toLowerCase();
              if(engline1.search(searchTermN) !== -1 || engline2.search(searchTermN) !== -1 || engline3.search(searchTermN) !== -1 || engline4.search(searchTermN) !== -1 || all[i].ShlokaSanLine1.search(searchTerm) !== -1 ||all[i].ShlokaSanLine2.search(searchTerm) !== -1 ||all[i].ShlokaSanLine3.search(searchTerm) !== -1 ||all[i].ShlokaSanLine4.search(searchTerm) !== -1 || engDescription.search(searchTermN) !== -1 || all[i].DescriptionSan.search(searchTerm) !== -1 || quotedBy.search(searchTermN) !== -1 || all[i].Quoted_by_san.search(searchTerm) !== -1){
                chapterSelected.push(all[i]);
                found = found +1;
              }
            }
            deferred.resolve(chapterSelected);
          })
                   
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        }
  }
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
