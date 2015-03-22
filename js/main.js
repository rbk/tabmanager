var app = angular.module('tabManager', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

	$scope.newTitle = false;
	$scope.showFolderList = false;
	$scope.addTabs = false;
	$scope.current_folder = null;

	$scope.active = '';
	$scope.project_title = 'Tab Workspace Manager';
	$scope.current_tabs = [];

	$scope.folders = [
		// {
		// 	"name": "Folder1",
		// 	"tabs": [
		// 		{
		// 			"name": "GitHub",
		// 			"url": "http://richardkeller.net"
		// 		},
		// 		{
		// 			"name": "GitHub2",
		// 			"url": "http://richardkeller.net"
		// 		}
		// 	]
		// },
		// {
		// 	"name": "folder2",
		// 	"tabs": [
		// 		{
		// 			"name": "Blah",
		// 			"url": "http://richardkeller.net"
		// 		},
		// 		{
		// 			"name": "Blah2",
		// 			"url": "http://richardkeller.net"
		// 		}
		// 	]
		// }
	];
	chrome.storage.local.get('tabManager', function(result) {
		$scope.folders = result.tabManager;
		$scope.$apply();
		if( $scope.folders.length > 1 ){
			$scope.showFolderList = true;
		}
		// console.log( result )
	});

	$scope.syncFolders = function( ){
		chrome.storage.local.set({'tabManager': $scope.folders }, function() {
		});
	}

	$scope.addFolder = function( ){
		$scope.newTitle = true;
		// $scope.folders.push({"name": "test", "tabs": []});
	}

	$scope.saveNewFolder = function( ){
		
		$scope.newTitle = false;
		$scope.showFolderList = true;
		var fname = $('#newFolderName').val();

		$scope.folders.push({"name": fname, "tabs": []});
		$('#newFolderName').val('');

		chrome.storage.local.set({'tabManager': $scope.folders }, function() {
			console.log( 'saved folder' );
		});
	}

	$scope.removeFolder = function(index){
		// var conf = confirm('Are you sure you want to delete this folder and all of its tabs?'); if( !conf ) { return };
		$scope.folders.splice(index, 1);
		$scope.syncFolders();
	}

	$scope.addTabUi = function( index ){
		$scope.current_folder = index;
		$scope.addTabs = true;
	}
	$scope.addToCurrentFolder = function( tab ){
		// console.log( tabUrl )
		$scope.folders[$scope.current_folder].tabs.push(tab)
	}
	$scope.saveSelectedTabs = function(  ){
		// save folder to chrome storage
		// hide tab ui
	}
	
	// Get all tabs currently open
	var queryInfo = {
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs){
		$scope.current_tabs = tabs;
		$scope.$apply();
	});



}]);