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

.factory('dashDisplay', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
      display : 'home'
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
