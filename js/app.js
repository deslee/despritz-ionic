// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('despritz', {
      url: "/",
      abstract: true,
      templateUrl: "templates/main.html"
    })

    .state('despritz.choose-file', {
      url: '',
      views: {
        'despritz': {
          templateUrl: 'templates/choose-file.html',
          controller: 'ChooseFileCtrl'

        }
      }
    })

    .state('despritz.run', {
      url: 'run',
      views: {
        'despritz': {
          templateUrl: 'templates/despritz.html',
        }
      }
    })

    .state('despritz.about', {
      url: 'about',
      views: {
        'about': {
          templateUrl: 'templates/about.html',
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

})

;

