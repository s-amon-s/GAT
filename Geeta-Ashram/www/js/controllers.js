angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$omdbservice,$state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout,$ionicModal,$http,$sce){

  $scope.mySearch = {}; // create empty object for search params
  $scope.engLish = false;  
  $scope.hindDesc = false; 
  $scope.engDesc = false; 
  $scope.shlokaSearchTerm = '';
  $rootScope.userSettings = {}; // store global user settings

  $scope.chapters = [ {id:1,name:"Chapter 1"},
                      {id:2,name:"Chapter 2"},
                      {id:3,name:"Chapter 3"},
                      {id:4,name:"Chapter 4"},
                      {id:5,name:"Chapter 5"},
                      {id:6,name:"Chapter 6"},
                      {id:7,name:"Chapter 7"},
                      {id:8,name:"Chapter 8"},
                      {id:9,name:"Chapter 9"},
                      {id:10,name:"Chapter 10"},
                      {id:11,name:"Chapter 11"},
                      {id:12,name:"Chapter 12"},  
                      {id:13,name:"Chapter 13"},
                      {id:14,name:"Chapter 14"},  
                      {id:15,name:"Chapter 15"},
                      {id:16,name:"Chapter 16"},  
                      {id:17,name:"Chapter 17"},
                      {id:18,name:"Chapter 18"}  
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
  
  $scope.musics = [         { id:1,url:"http://geetaashramthailand.org/Sounds/1.mp3"},
                            { id:2,url:"http://geetaashramthailand.org/Sounds/2.mp3"},
                            { id:3,url:"http://geetaashramthailand.org/Sounds/3.mp3"},
                            { id:4,url:"http://geetaashramthailand.org/Sounds/4.mp3"},
                            { id:5,url:"http://geetaashramthailand.org/Sounds/5.mp3"},
                            { id:6,url:"http://geetaashramthailand.org/Sounds/6.mp3"},
                            { id:7,url:"http://geetaashramthailand.org/Sounds/7.mp3"},
                            { id:8,url:"http://geetaashramthailand.org/Sounds/8.mp3"},
                            { id:9,url: "http://geetaashramthailand.org/Sounds/9.mp3"},
                            { id:10,url:"http://geetaashramthailand.org/Sounds/10.mp3"},
                            { id:11,url:"http://geetaashramthailand.org/Sounds/11.mp3"},
                            { id:12,url:"http://geetaashramthailand.org/Sounds/12.mp3"},
                            { id:13,url:"http://geetaashramthailand.org/Sounds/13.mp3"},
                            { id:14,url:"http://geetaashramthailand.org/Sounds/14.mp3"},
                            { id:15,url:"http://geetaashramthailand.org/Sounds/15.mp3"},
                            { id:16,url:"http://geetaashramthailand.org/Sounds/16.mp3"},
                            { id:17,url: "http://geetaashramthailand.org/Sounds/17.mp3"},
                            { id:18,url:"http://geetaashramthailand.org/Sounds/18.mp3"}
                        ];
  
  /// Core Search Function
  $scope.doSearch = function(mySearch){
    if(navigator.network.connection.type == Connection.NONE){ // check if search is by imdbID or Title
      var alertPopup = $ionicPopup.alert({
          title: 'No Connection!',
            template: 'You are not online. Connect to internet and Try again'
          });
          $state.go("app.dashboard");
          $ionicSideMenuDelegate.toggleLeft();
    }else{
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
    }
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
  $timeout(function() { 
    $scope.toggleLeft();
    $timeout(function() {
      $scope.toggleLeft();  
    }, 1800);
  }, 500);

  $scope.closeModal = function() {
     $scope.modal.hide();
  };
  $scope.closeModal2 = function() {
     $scope.modal2.hide();
  };
  
  $scope.closeModal3 = function() {
      $scope.modal3.hide();
  };
  $scope.closeModal4 = function() {
      $scope.modal4.hide();
  };
  $scope.closeModal5 = function() {
      $scope.modal5.hide();
  };
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
      $scope.modal2.remove();
      $scope.modal3.remove();
      $scope.modal4.remove();
      $scope.modal5.remove();
   });
  
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
  
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
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
    console.log('Came In here<br> engLish changed from '+ $scope.engLish + ' to: ');
    $scope.engLish = $scope.engLish == false ? true : false;
    console.log($scope.engLish);
  };
  $scope.togglehindDesc = function(){
    console.log('Came In here<br> hindDesc changed from '+ $scope.hindDesc + ' to: ');
    $scope.hindDesc = $scope.hindDesc == false ? true : false;
    console.log($scope.hindDesc);
  };
  $scope.toggleengDesc = function(){
    console.log('Came In here<br> engDesc changed from '+ $scope.engDesc + ' to: ');
    $scope.engDesc = $scope.engDesc == false ? true : false;
    console.log($scope.engDesc);
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
          template: "Looking for app..."
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
    $timeout(function(){
          $ionicLoading.hide();   
    }, 1500);
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
          template: "Looking for app..."
      });
    var mail = "info@geetaashramthailand.org?subject=feedback";
    window.open('mailto:'+mail, "_system", 'location=yes');
    $timeout(function(){
          $ionicLoading.hide();   
    }, 1500);
    return false;
  };
  
  $scope.callUs = function(){
    var number = "+66922828604";
    window.open('tel:'+number, "_system", 'location=yes');
    return false;
  };


  $scope.searchCh = function(ch){
      
      $ionicLoading.show({
        template: "Loading Your Match..."
      });
      $scope.toggleLeft();  

      
      var url = 'js/data/shlokas_tbl.json';
      $scope.chapterSelected = [];
      
      $http.get(url)
           .success(function(allShlokas){
            for (var i = 0; i < allShlokas.length ; i++){
              if(allShlokas[i].chapter == ch.id){
                  $scope.chapterSelected.push(allShlokas[i]);
              }
            }
            $scope.chapterSelectedEngName = $scope.chapterEngNames[ch.id-1].name;
            $scope.chapterSelectedHindName = $scope.chapterHindNames[ch.id-1].name;
            $scope.engAbled = $scope.engLish;
            $scope.hindDescAbled = $scope.hindDesc;
            $scope.engDescAbled = $scope.engDesc;
            $scope.music = $scope.musics[ch.id-1].url;
            $scope.music = $sce.trustAsResourceUrl($scope.music);
            console.log($scope.music);
            $ionicModal.fromTemplateUrl('geetaChapters.html',{
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal5 = modal;
                $scope.clearInputs();
                console.log($scope.engAbled);
                $ionicLoading.hide();
                $scope.modal5.show();
           });
          });
   };
  
  $scope.searchverseNumber = function(searchTerm){
    $scope.toggleLeft();
      $ionicLoading .show({
        template: "Loading Your Match..."
    });
    $scope.chapterSelected = [];
    var url = 'js/data/shlokas_tbl.json';
    var found = 0;

    $http.get(url)
         .success(function(allShlokas){
          for (var i = 0; i < allShlokas.length ; i++){
            if(allShlokas[i].ShlokaNumber.search(searchTerm) !== -1){
                console.log('Matched: '+allShlokas[i].ShlokaEngLine1);
                $scope.chapterSelected.push(allShlokas[i]);
                found = found +1;
                break;
            }
          }
          $scope.chapterSelectedEngName = found == 0 ? 'No Result Found': '('+found+') Results for: '+ searchTerm;
          $scope.chapterSelectedHindName = '';
          $scope.engAbled = $scope.engLish;
          $scope.hindDescAbled = $scope.hindDesc;
          $scope.engDescAbled = $scope.engDesc;

          $ionicModal.fromTemplateUrl('geetaChapters.html',{
          scope: $scope,
          animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modal5 = modal;
              $scope.clearInputs();
              $ionicLoading.hide();
              $scope.modal5.show();
         });
        });
  }
  $scope.searchAllShlokas = function(searchTerm){
      $scope.toggleLeft();
        $ionicLoading.show({
          template: "Loading Your Match..."
      });
      $scope.chapterSelected = [];
      var url = 'js/data/shlokas_tbl.json';
      var found = 0;

      $http.get(url)
           .success(function(allShlokas){
            var searchTermN = searchTerm.toLowerCase();
            for (var i = 0; i < allShlokas.length ; i++){
                var engline1 = allShlokas[i].ShlokaEngLine1.toLowerCase();
                var engline2 = allShlokas[i].ShlokaEngLine2.toLowerCase();
                var engline3 = allShlokas[i].ShlokaEngLine3.toLowerCase();
                var engline4 = allShlokas[i].ShlokaEngLine4.toLowerCase();
                var engDescription =  allShlokas[i].Description.toLowerCase();
                var quotedBy = allShlokas[i].Quoted_by.toLowerCase();

              if(engline1.search(searchTermN) !== -1 || engline2.search(searchTermN) !== -1 || engline3.search(searchTermN) !== -1 || engline4.search(searchTermN) !== -1 || allShlokas[i].ShlokaSanLine1.search(searchTerm) !== -1 ||allShlokas[i].ShlokaSanLine2.search(searchTerm) !== -1 ||allShlokas[i].ShlokaSanLine3.search(searchTerm) !== -1 ||allShlokas[i].ShlokaSanLine4.search(searchTerm) !== -1 || engDescription.search(searchTermN) !== -1 || allShlokas[i].DescriptionSan.search(searchTerm) !== -1 || quotedBy.search(searchTermN) !== -1 || allShlokas[i].Quoted_by_san.search(searchTerm) !== -1){
                  console.log('Matched: '+allShlokas[i].ShlokaEngLine1);
                if(engline1.search(searchTermN) !== -1){
                    engline1.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  if(engline2.search(searchTermN) !== -1){
                    engline2.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  if(engline3.search(searchTermN) !== -1){
                    engline3.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  if(engline4.search(searchTermN) !== -1){
                    engline4.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  if(allShlokas[i].ShlokaSanLine1.search(searchTerm) !== -1){
                    allShlokas[i].ShlokaSanLine1.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(allShlokas[i].ShlokaSanLine2.search(searchTerm) !== -1){
                    allShlokas[i].ShlokaSanLine2.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(allShlokas[i].ShlokaSanLine3.search(searchTerm) !== -1){
                    allShlokas[i].ShlokaSanLine3.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(allShlokas[i].ShlokaSanLine4.search(searchTerm) !== -1){
                    allShlokas[i].ShlokaSanLine4.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(engDescription.search(searchTermN) !== -1){
                    engDescription.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  if(allShlokas[i].DescriptionSan.search(searchTerm) !== -1){
                    allShlokas[i].DescriptionSan.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(allShlokas[i].Quoted_by_san.search(searchTerm) !== -1){
                    allShlokas[i].Quoted_by_san.replace(searchTerm,"<span class='highlighted'>"+searchTerm+"</span>");
                  }
                  if(quotedBy.search(searchTermN) !== -1){
                    quotedBy.replace(searchTermN,"<span class='highlighted'>"+searchTermN+"</span>");
                  }
                  
                  $scope.chapterSelected.push(allShlokas[i]);
                  found = found +1;
              }
            }
            $scope.chapterSelectedEngName = found == 0 ? 'No Result Found': '('+found+') Results for: '+ searchTerm;
            $scope.chapterSelectedHindName = '';
            $scope.engAbled = $scope.engLish;
            $scope.hindDescAbled = $scope.hindDesc;
            $scope.engDescAbled = $scope.engDesc;

            $ionicModal.fromTemplateUrl('geetaChapters.html',{
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal5 = modal;
                $scope.clearInputs();
                $ionicLoading.hide();
                $scope.modal5.show();
                $('#modalBody').text().highlight('dharm');
           });
          });
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

 
})


.controller('eventFeedsCtrl',function ($scope,$state, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicLoading, $timeout,$ionicModal,$http){

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
    if(navigator.network.connection.type == Connection.NONE){
       $scope.showConfirm = function() {
        alert('Not Connected');
       var confirmPopup = $ionicPopup.confirm({
         title: 'You are not online!',
         template: 'You must connect to internet to refresh.<br><b>Connect Now<b>'
       });

       confirmPopup.then(function(res) {
         if(res) {
           console.log('You are sure');
         } else {
           console.log('You are not sure');
         }
       });
     };
    }else{
        alert('No Update');
    }
  };  
  

})
