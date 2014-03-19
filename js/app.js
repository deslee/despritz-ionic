// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var module = angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


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
          controller: 'DespritzController',
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

});

module.directive('chooseFileButton', ['$location', function($location, $compile) {
  var click = function(el) {
    var evt = document.createEvent('Event');
    evt.initEvent('click', true, true);
    el.dispatchEvent(evt);
  }
      
  var endHover = function(el) {
    el.className = el.className.replace('button-light', 'button-dark');
  }

  var startHover = function(el) {
    el.className = el.className.replace('button-dark', 'button-light');
  }

  return {
    template: '{{buttonDialog}}',
    link: function(scope, element, attrs) {
      var killEvents = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }

      var loadFile = function(file) {
        reader = new FileReader();

        var text = reader.readAsText(file);
        reader.onloadend = function(e) {
          var text = e.target.result;
          scope.fileData(text);
        }
      }

      // file input
      element[0].onclick = function(e) {
        click(document.querySelector('#'+attrs.chooseFileButton))
      }
      document.querySelector('#'+'fileInput').onchange = function(e) {
        var file = e.target.files[0];
        loadFile(file);
      }


      // drag drop
      angular.forEach(['draginit','dragstart','dragover','dragleave','dragenter','dragend','drag','drop'], function(e){
        element[0].addEventListener(e, killEvents);
      });
      element[0].addEventListener('dragenter', function(e) {
        startHover(e.target);
      }, false);
      element[0].addEventListener('dragleave', function(e) {
        endHover(e.target);
      }, false);
      element[0].addEventListener('drop', function(e) {
        endHover(e.target);
        var file = e.dataTransfer.files[0];
        loadFile(file);
      }, false);
    },
  };
}]);