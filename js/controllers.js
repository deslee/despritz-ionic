angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('ChooseFileCtrl', function($scope, $location, PetService) {
	$scope.buttonDialog = 'Choose a file (or drag and drop)'
	$scope.fileData = function(text) {
		$location.url('/run');
	}
})

.directive('chooseFileButton', ['$location', function($location, $compile, DespritzService) {
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
	      scope.$apply(function() {
	      	scope.fileData(text);
	      })
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
}])

;
