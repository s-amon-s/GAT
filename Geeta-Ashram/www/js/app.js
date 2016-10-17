// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngSanitize','starter.controllers','starter.services','starter.filters','highcharts-ng','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: "/dashboard",
    views: {
      'tab-dashboard': {
        templateUrl: "templates/dashboard.html",
      }
    }
  })

  .state('app.mission', {
    url: "/mission",
    views: {
      'tab-mission': {
        templateUrl: "templates/mission.html"
      }
    }
  })

  .state('app.gurudev', {
    url: "/gurudev",
    views: {
      'tab-gurudev': {
        templateUrl: "templates/gurudev.html",
      }
    }
  })

  .state('app.devotees', {
    url: "/devotees",
    views: {
      'tab-devotees': {
        templateUrl: "templates/devotees.html"
      }
    }
  })
  
  .state('app.events', {
    url: "/events",
    views: {
      'tab-events': {
        templateUrl: "templates/events.html",
      }
    }
  })
  
  /// details view

    
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
