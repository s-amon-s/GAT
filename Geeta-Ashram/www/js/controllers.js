angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$omdbservice,$geeta,$connection,$events,$satsangs,$state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout,$ionicModal,$http,$sce,$cordovaMedia,$cordovaFile,$ionicPlatform){

// Use this script
// http://www.webspeaks.in/2015/03/html5-offline-mobile-app-using-ionic-pouchdb.html

  $scope.mySearch = {}; // create empty object for search params
  $scope.engLish = true;  
  $scope.hindDesc = true; 
  $scope.engDesc = true;
  $scope.shlokaSearchTerm = '';
  $rootScope.userSettings = {}; // store global user settings
  

  $scope.chapters = [ {id:1,name:"Chapter 1",starting:0,ending:46},
                      {id:2,name:"Chapter 2",starting:47,ending:118},
                      {id:3,name:"Chapter 3",starting:119,ending:161},
                      {id:4,name:"Chapter 4",starting:162,ending:203},
                      {id:5,name:"Chapter 5",starting:204,ending:232},
                      {id:6,name:"Chapter 6",starting:233,ending:279},
                      {id:7,name:"Chapter 7",starting:280,ending:309},
                      {id:8,name:"Chapter 8",starting:310,ending:337},
                      {id:9,name:"Chapter 9",starting:338,ending:371},
                      {id:10,name:"Chapter 10",starting:372,ending:413},
                      {id:11,name:"Chapter 11",starting:414,ending:468},
                      {id:12,name:"Chapter 12",starting:469,ending:488},  
                      {id:13,name:"Chapter 13",starting:489,ending:522},
                      {id:14,name:"Chapter 14",starting:523,ending:549},  
                      {id:15,name:"Chapter 15",starting:550,ending:569},
                      {id:16,name:"Chapter 16",starting:570,ending:593},  
                      {id:17,name:"Chapter 17",starting:594,ending:621},
                      {id:18,name:"Chapter 18",starting:622,ending:699}  
                  ];

  $scope.chapterEngNames = [
                            {id:1,name:"Yoga of despodency of Arjun"},
                            { id:2,name: "The yoga of knowledge"},
                            { id:3,name: "Yoga of action"},
                            { id:4,name: "Yoga of renunciation of action with knowledge"},
                            { id:5,name: "Yoga of renunciation of action"},
                            { id:6,name: "Yoga of self discipline"},
                            { id:7,name: "Yoga of wisdom and knowledge"},
                            { id:8,name: "Yoga of imperishable bhrahman"},
                            { id:9,name: "Yoga of sovereign knowledge and sovereign mystery"},
                            { id:10,name: "Yoga of devine manifestation"},
                            { id:11,name: "Yoga of vision of the cosmic form"},
                            { id:12,name: "Yoga of devotion"},
                            { id:13,name: "Yoga of the field and knower of the field"},
                            { id:14,name: "Yoga of division of the three Gunas"},
                            { id:15,name: "Yoga of the supreme person"},
                            { id:16,name: "Yoga of the division between the divine and demonaic endowments"},
                            { id:17,name: " The yoga of the threefold division of earth"},
                            { id:18,name: "The yoga of liberation by renunciation"}
                          ];

  $scope.chapterHindNames = [
                            { id:1,name:"अर्जुनविषादयाेग/ArjunVishadyog"},
                            { id:2,name:"सांख्ययाेग/Samkhyayog"},
                            { id:3,name:"कर्ययाेग/Karmayog"},
                            { id:4,name:"ज्ञानकर्यसंन्यासयाेग/Gyankarmsamnyasyog"},
                            { id:5,name:"कर्मसंन्यासयोग/Karmsamnyasyog"},
                            { id:6,name:"अात्मसंयमयोग/Aatmasamyamyog"},
                            { id:7,name:"ज्ञानविज्ञानयोग/Gyanvigyanyog"},
                            { id:8,name:"क्षरब्रह्मयोग/Aksharbhramayog"},
                            { id:9,name: "राजविघाराजगुहृायोग/Rajavidhyarajaguhyog"},
                            { id:10,name:"विभूतियोज/Vibhutiyog"},
                            { id:11,name:"विश्वरूपदर्शनयोग/Vishvrupdarshanyog"},
                            { id:12,name:"भत्कियोज/Bhagtiyog"},
                            { id:13,name:"क्षेत्रक्षेत्रज्ञविभागयोग/Shetrashetragyavibhagyog"},
                            { id:14,name:"गुणत्रयविभागयोग/Gurnshatravibhagyog"},
                            { id:15,name:"पुरूषोत्तमयोग/Purushutamyog"},
                            { id:16,name:"दैवासुरसंपव्दिभागयोग/Daivasursampadvibhagyog"},
                            { id:17,name: "क्षध्दात्रयविभागयोग/Shraddhatrayavibhagyog"},
                            { id:18,name:"मोक्षसंन्यासयोग/Mokshsamnyasyog"}
                        ];                      
  
  $scope.musics = [         { id:1,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/1.mp3")},
                            { id:2,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/2.mp3")},
                            { id:3,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/3.mp3")},
                            { id:4,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/4.mp3")},
                            { id:5,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/5.mp3")},
                            { id:6,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/6.mp3")},
                            { id:7,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/7.mp3")},
                            { id:8,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/8.mp3")},
                            { id:9,url: $sce.trustAsResourceUrl( "http://geetaashramthailand.org/Sounds/9.mp3")},
                            { id:10,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/10.mp3")},
                            { id:11,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/11.mp3")},
                            { id:12,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/12.mp3")},
                            { id:13,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/13.mp3")},
                            { id:14,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/14.mp3")},
                            { id:15,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/15.mp3")},
                            { id:16,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/16.mp3")},
                            { id:17,url: $sce.trustAsResourceUrl( "http://geetaashramthailand.org/Sounds/17.mp3")},
                            { id:18,url: $sce.trustAsResourceUrl("http://geetaashramthailand.org/Sounds/18.mp3")}
                        ];

$ionicPlatform.ready(function() {
    onDeviceReady();
})

$scope.doRefresh = function(page) {
  $state.go("app."+page); //'/new-items'
    // $http.get(page).success(function(){}).finally(function() {});
};

 $timeout(function() { 
    $scope.toggleLeft();
    $timeout(function() {
      $scope.toggleLeft();

    $satsangs.dailyRead().then(function(date){
        $scope.previousDate = date[0].date;
        $scope.previousMonth = date[0].month;
        $scope.previousYear = date[0].year;
        $scope.previousShloka = date[0].shloka;
        $satsangs.determineShloka($scope.previousShloka,$scope.previousDate,$scope.previousMonth,$scope.previousYear).then(function(res){
            $geeta.getVerse(res.verse).then(function(res){      
                $scope.todayPath = res;
                $scope.todayMusic = $scope.musics[(res.chapter)-1].url;
                // $scope.doRefresh('devotees');
              });
        });
    });
      $connection.connectionPrompt('You must be online to listen to audio traks and use some features.<br><b>Connect Now<b>').then(function(res){
        if(res!=12 &&res){
          $connection.openSetting('wifi').then(function(res){
          })  
       }else{
        
       }
  });
    }, 1800);
  }, 500);

$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      
})

    // listen for Offline event
$rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
  
      $connection.connectionPrompt('You must be online to listen to audio traks and use some features.<br><b>Connect Now<b>').then(function(res){
        if(res!=12 &&res){
          $connection.openSetting('wifi').then(function(res){
          })  
       }
  });
})
// device APIs are available
//
function onDeviceReady() {
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    // Add similar listeners for other events
}
function onPause() {
    // Handle the pause event
}

function onResume() {
    // Handle the resume event
}

function onMenuKeyDown() {
    // Handle the menubutton event
}

  /// Core Search Function
  $scope.doSearch = function(mySearch){
    // check if search is by imdbID or Title
    $connection.connectionPrompt('You must connect to internet.<br><b>Connect Now<b>').then(function(res){
      if(res == 12){ 
        $ionicLoading.show({
            template: "Loading data..."
        })
        $omdbservice.searchOMDB(mySearch).then(function(res){ //retrieve data from OMDB
          $ionicLoading.hide();
          if(res.Response == "True"){ /// check for valid return
            $scope.OMDB_RESULTS = res.Search; /// assign response to $scope
            $ionicModal.fromTemplateUrl('movieQueryResultList.html',{
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
           });
          // $state.go("app.movieQueryResultList",mySearch) /// 
          }else{
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
              template: 'It doesn\'t look like that search worked. Try again'
            });
            $state.go("app.dashboard")
            $ionicSideMenuDelegate.toggleLeft()
          }
        })
      }else{
          if(res){
          $connection.openSetting('wifi').then(function(res){});
        }
            
      }
  })
    $ionicSideMenuDelegate.isOpen() ? $ionicSideMenuDelegate.toggleLeft() : null; /// close side menu
  }

  /// clear list view or results and delete from scope
  $scope.clearSearch = function(){
    delete $scope.OMDB_RESULTS;    /// dump search result list
    // $dashDisplay.display = 'home';
    $scope.clearForm();
  }

  /// clear side menu search form
  $scope.clearForm = function(){
    $scope.mySearch = {};
    $scope.clearInputs();
  }

  $scope.toggleLeft = function() {   /// menu toggle: waiting for timer
    $ionicSideMenuDelegate.toggleLeft();
  }
  
  $scope.closeModal = function() {
     $scope.modal.remove();
  };
  $scope.closeModal2 = function() {
     $scope.modal2.remove();
  };
  
  $scope.closeModal3 = function() {
      $scope.modal3.remove();
  };
  $scope.closeModal4 = function() {
      $scope.modal4.remove();
  };
  $scope.closeModal5 = function() {
      $scope.modal5.remove();
  };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {

   });
  
   // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    if($ionicSideMenuDelegate.isOpen()){
      $timeout(function() {
        $scope.toggleLeft();
        console.log('closing slide bar');
      }, 500);
    }
  });
  
  // Execute action on remove modal
  $scope.$on('modal.shown', function() {
    console.log('modal is shown now: '+ $scope.shlokaSearchTerm);

  });

  $scope.$on('modal.removed', function() {
      $scope.clearInputs();
      console.log('modal is removed: '+ $scope.shlokaSearchTerm);
  });

   $scope.movieDetail = function(mId,year){
    if(navigator.network.connection.type == Connection.NONE){ 
       var alertPopup = $ionicPopup.alert({
          title: 'No Connection!',
            template: 'Seems you got offline. Connect to internet and Try again'
          });
          $scope.closeModal();
          $state.go("app.dashboard");
    }else{
      $ionicLoading.show({
      template: "Loading data..."
      })
      $omdbservice.searchOMDBbyId(mId,year).then(function(res){
          $ionicLoading.hide()
          console.log(res);
          if(res.Response == "True"){ /// check for valid return
            $scope.data = res; /// single record detail data
              $scope.imdbStatConfig = {  /// chart configuration
                options: {
                    chart: {
                        type: 'column'
                    }
                },
                xAxis: {
                  title: '',
                  labels: {
                    enabled: false
                  },
                },
                yAxis: {
                  title: ''
                },
                series: [{
                  name: 'IMDB',
                  data: [parseFloat($scope.data.imdbRating)]  /// compare two source ratings
                },
                {
                  name: 'Rotten Tomatoes',
                  data: [parseFloat($scope.data.tomatoUserRating)]  /// compare two source ratings
                }],
                title: {
                    text: ''
                },
                loading: false
            }

          $ionicModal.fromTemplateUrl('movieDetail.html',{
          scope: $scope,
          animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modal2 = modal;
              $scope.modal2.show();
         });

          }else{
            var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: 'It doesn\'t look like that search worked. Try again'
            });
            // $state.go("app.movieQueryResultList")
            $ionicSideMenuDelegate.toggleLeft()
          }
          
      });
    }
   };


  $scope.toggleEnglish = function(){
    $scope.engLish = $scope.engLish == false ? true : false;
  };
  $scope.togglehindDesc = function(){
    $scope.hindDesc = $scope.hindDesc == false ? true : false;
  };
  $scope.toggleengDesc = function(){
    $scope.engDesc = $scope.engDesc == false ? true : false;
  };

  $scope.contactUs = function(){
    $ionicModal.fromTemplateUrl('contactUs.html',{
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal3 = modal;
            $scope.modal3.show();
    });
  };

  $scope.committee = function(){
    $ionicModal.fromTemplateUrl('committee.html',{
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal4 = modal;
            $scope.modal4.show();
    });
  };  



// Social Network and Contact Us controllers
  $scope.openFb = function(){
    $ionicLoading.show({
          template: "Looking for app...",
          duration: 1500
    });  
  
    var scheme;
    var fbProfileId = "443666382357922";
    var fbURL;
    // Don't forget to add the org.apache.cordova.device plugin! 
    if(device.platform === 'iOS') {
      scheme  = 'fb://';
    }
    else if(device.platform === 'Android') {
      scheme = 'com.facebook.katana';
    }

    appAvailability.check(
      scheme,       // URI Scheme or Package Name 
      function() {  // Success callback 
        fbURL = 'fb://group/'+ fbProfileId;
        window.open(fbURL, "_system", 'location=yes');
      },
      function() {  // Error callback 
        fbURL = 'https://www.facebook.com/groups/geetaashramthailand/';
        window.open(fbURL, "_blank", 'location=yes');
      }
    );
    return false;
  };
  
  $scope.openMap = function(){
    var locationUrl = "13.7058995,100.5963182";
    var latitude = 13.7058995, longitude = 100.5963182;
    launchnavigator.navigate([latitude, longitude]);
    return false;
  };

  $scope.mailIt = function(){
    $ionicLoading.show({
          template: "Looking for app...",
          duration: 1500
    });  
    var mail = "info@geetaashramthailand.org?subject=feedback";
    window.open('mailto:'+mail, "_system", 'location=yes');
    return false;
  };
  
  $scope.callUs = function(){
    var number = "+66922828604";
    window.open('tel:'+number, "_system", 'location=yes');
    return false;
  };


  $scope.searchCh = function(ch){

      $scope.chapterSelected = [];
     
      $geeta.getChapterRelatedSholkas(ch.id,ch.starting,ch.ending).then(function(res){

        $scope.chapterSelected = res;
        $scope.chapterSelectedEngName = $scope.chapterEngNames[ch.id-1].name;
        $scope.chapterSelectedHindName = $scope.chapterHindNames[ch.id-1].name;
        $scope.engAbled = $scope.engLish;
        $scope.hindDescAbled = $scope.hindDesc;
        $scope.engDescAbled = $scope.engDesc;
        $scope.music = $scope.musics[ch.id-1].url;
        console.log($scope.music);
        $ionicModal.fromTemplateUrl('geetaChapters.html',{
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal5 = modal;
            console.log($scope.engAbled);
            $scope.modal5.show();
       });
    });
  };
  
  $scope.searchverseNumber = function(verseNo){
    $ionicLoading.show({
        template: "Loading Your Match...",
    });

    $scope.chapterSelected = [];
    var searchTerm = parseInt(verseNo);
    $geeta.getVerse(searchTerm).then(function(res){      
      $scope.chapterSelected.push(res);
      if (searchTerm > 0 && searchTerm <= 700){
        $scope.chapterSelectedEngName = ' Verse Number : '+ searchTerm;  
      }else{
        $scope.chapterSelectedEngName = 'No Result Found';
      }
      $scope.chapterSelectedHindName = '';
      $scope.engAbled = $scope.engLish;
      $scope.hindDescAbled = $scope.hindDesc;
      $scope.engDescAbled = $scope.engDesc;
      $ionicLoading.hide();
      $ionicModal.fromTemplateUrl('geetaChapters.html',{
      scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal5 = modal;
          $scope.modal5.show();
     });

          
    });
  }
  $scope.searchAllShlokas = function(searchTerm){
      $ionicLoading.show({
          template: "Loading Your Match..."
      });
    $scope.chapterSelected = [];

    $geeta.find(searchTerm).then(function(res){
      $scope.chapterSelected = res;
      $scope.chapterSelectedEngName = res.length == 0 ? 'No Result Found': '('+res.length+') Results for: '+ searchTerm;
      $scope.chapterSelectedHindName = '';
      $scope.engAbled = $scope.engLish;
      $scope.hindDescAbled = $scope.hindDesc;
      $scope.engDescAbled = $scope.engDesc;
      $ionicLoading.hide();

      $ionicModal.fromTemplateUrl('geetaChapters.html',{
      scope: $scope,
      animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal5 = modal;
          $scope.modal5.show();
     });
    })      
  }

  $scope.clearInputs = function(){
    document.getElementById("cS").selectedIndex = -1;
    console.log('inside clearInputs');
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text") {
        elements[ii].value = "";
      }
    }  
  };

  $scope.play = function(src) {
      var media = new Media(src, null, null, mediaStatusCallback);
      $cordovaMedia.play(media);
  }
 
  var mediaStatusCallback = function(status) {
      if(status == 1) {
          $ionicLoading.show({template: 'Loading...'});
      } else {
          $ionicLoading.hide();
      }
  };    

})


.controller('eventFeedsCtrl',function ($scope,$state,$connection, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout,$ionicModal,$http){

  $scope.events = [ {id:1,title:"Geeta Jayanti", description: "18 days celebration of Geeta Maa", img: "img/krishna_arjun.jpg"},
                    {id:2,title:"Event 2", description: "description 2", img: "img/splash.png"},
                  ];

  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true

  $scope.share = function(item){
    alert(item.id);
  };

  $scope.checkFeed = function(){
          $connection.connectionPrompt('You must connect to internet.<br><b>Connect Now<b>').then(function(res){
            if (res!=12 && res){
               $connection.openSetting('wifi').then(function(res){
              })
            }else{
              alert('No Updates!');
            }
          })
  };  

})

