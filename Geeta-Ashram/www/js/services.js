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

.factory('$events', ['$http','$q','$rootScope', function($http,$q,$rootScope) {
    return {
        fetch: function(params) {
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
        update: function(mId,year){
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

.factory('$satsangs', ['$http','$q','$rootScope','$cordovaFile', function($http,$q,$rootScope,$cordovaFile,$cordovaSQLite) {
    return {
        download: function(params) {
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
        dailyWrite: function(verse,day,month,year){
          var deferred = $q.defer(); //create promise to handle async data
          var db = $cordovaSQLite.openDB({ name: "dailyShloka.db", location: 'default', bgType: 1 });
          $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS store (id integer primary key AUTOINCREMENT, date integer, month integer,year integer ,verse integer )"); 
          var data = db.executeSql('INSERT INTO store (date,month,year,verse) VALUES ("' +day+'","' +month+'","' +year+'","' +verse+'")');
          deferred.resolve(data); // resolve promise with data
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        dailyRead: function(){
          var deferred = $q.defer(); //create promise to handle async data
          var data = [
                        {
                            "date": 17,
                            "month": 9,
                            "year": 2016,
                            "shloka":52
                        }
                    ];
          deferred.resolve(data);
           // resolve promise with data
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        determineShloka: function(verse,day,month,year){
          var deferred = $q.defer(); //create promise to handle async data
          console.log(day);
          console.log(month);
          console.log(year);
          console.log(verse);
          var first = new Date(year, month, day).getTime();
          console.log(first);
          var today = new Date();
          var second = today.getTime();
          console.log(second);
          var dayDiff =  Math.floor((second-first)/(1000*60*60*24));
          var todayShloka = {'verse':verse,'needWriting':false};
          console.log('daydiff :'+dayDiff );
          if(dayDiff>0){
              todayShloka.verse = (verse + dayDiff)%700;
              todayShloka.needWriting = true;
          }
          deferred.resolve(todayShloka); // resolve promise with data
          return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        }
    }
}])
.factory('$connection', ['$http','$q','$rootScope','$ionicPopup', '$ionicLoading', '$timeout', function($http,$q,$rootScope,$ionicPopup, $ionicLoading, $timeout,$cordovaNetwork) {
    return {
        connectionPrompt: function(templateText) {
            var deferred = $q.defer(); //create promise to handle async data
            
            if(navigator.network.connection.type == Connection.NONE){
               var confirmPopup = $ionicPopup.confirm({
                 title: 'You are not online!',
                 template: templateText
               });

               confirmPopup.then(function(res) {
                 if(res) {
                  deferred.resolve(res);
                   // $scope.openSetting('wireless');
                 } else {
                   deferred.reject(false);
                 }
               });
            }else{
                deferred.resolve(12);
            }

            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
        openSetting: function(settingType){
          var deferred = $q.defer(); //create promise to handle async data
            if(typeof cordova.plugins.settings.openSetting != undefined){
                cordova.plugins.settings.openSetting(settingType, function(){
                deferred.resolve(true);
              },
              function(){
                alert("failed to open "+ settingType);
                cordova.plugins.settings.open(function(){
                  deferred.resolve(true);
                }, function(){
                    deferred.reject(false);
                });
              });
            }
            else{
              cordova.plugins.settings.open(function(){
                  deferred.resolve(true);
                }, function(){
                    deferred.reject(false);
                    alert("Can't open settings");
                });  
            }
            return deferred.promise; // return promise to requesting controller to wait for asyn response from this service
        },
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
    }
}]);

