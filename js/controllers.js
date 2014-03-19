angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('ChooseFileCtrl', function($scope, $location, PetService) {
	$scope.buttonDialog = 'Choose a file (or drag and drop)'
	$scope.chooseFile = function() {
		$location.url('/run');
	}
})

;
