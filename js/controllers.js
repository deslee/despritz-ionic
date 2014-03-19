angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('ChooseFileCtrl', function($scope, $location, DespritzService) {
	$scope.buttonDialog = 'Choose a file (or drag and drop)'
	$scope.fileData = function(text) {
		DespritzService.text = text;
		$location.url('/run');
    $scope.$apply();
	}
})

.controller('DespritzController', function($scope, $location, DespritzService) {
	if (!DespritzService.text) {
		$location.url('/');
    return;
	}
  DespritzService.session = DespritzService.init_session()


  $scope.$watch('', function() {
    console.log('aah');
    var word = document.getElementById('word');
    var reticle = document.getElementById('reticle');
    var seeker = document.getElementById('seeker');
    var wpmslider = document.getElementById('wpm');

    $scope.wpm = 200;
    if (word && reticle && seeker) {
      console.log('loading despritz');
      console.log(word);
      w = word;

      var session = DespritzService.session;
      session.elements.box = word;

      seeker.onchange = function(e) {
        session.set_index(e.target.value);
      };

      wpmslider.onchange = function(e) {
        session.wpm = e.target.value;
      }

      session.override('set_word', function(args, old) {
        var session = this;
        old.call(session, args);

        var pivot_text = session.get_pivot_letter();

        session.elements.box.style.left =
          reticle.offsetLeft - pivot_text.offsetLeft - pivot_text.offsetWidth/2 + 'px'

        seeker.value = session.index;
      });

      session.override('set_text', function(args, old) {
        var session = this;
        old.call(session, args);

        seeker.max = session.words.length;;
      })

      session.set_text(DespritzService.text);
      seeker.max = session.words.length;
      seeker.value = 0;
      session.update();
    }
  })

  $scope.start = function() {
    DespritzService.session.start();    
  }

  $scope.pause = function() {
    DespritzService.session.running = false;
  }

});