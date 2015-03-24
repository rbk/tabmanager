var app = angular.module('tabManager', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

	$scope.newTitle = false;
	$scope.showFolderList = false;
	$scope.current_folder = null;
	$scope.addingTabs = false;
	$scope.boxWidth = "400px";

	$scope.active = '';
	$scope.project_title = 'Tab Workspace Manager';
	$scope.current_tabs = [];
	$scope.folders = [];

	// Storage
	chrome.storage.local.get('tabManager', function(result) {
		
		if( !result.tabManager.length ){
			chrome.storage.local.set({'tabManager': $scope.folders }, function() {
		});
		} else {
			
		
			$scope.folders = result.tabManager;
			$scope.$apply();
			if( $scope.folders.length > 0 ){
				$scope.showFolderList = true;
			}
		}
		// console.log( result )
	});

	$scope.syncFolders = function( ){
		chrome.storage.local.set({'tabManager': $scope.folders }, function() {
		});
	}

	$scope.addFolder = function( ){
		$scope.newTitle = true;
		$scope.showFolderList = false;
		// $scope.folders.push({"name": "test", "tabs": []});
	}
	$scope.cancelNewFolder = function( ){
		$scope.newTitle = false;
		$scope.showFolderList = true;

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
		var conf = confirm('Are you sure you want to delete this folder and all of its tabs?'); if( !conf ) { return };
		$scope.folders.splice(index, 1);
		$scope.syncFolders();
	}

	$scope.addTabUi = function( index ){
		$scope.current_folder = index;
		$scope.addingTabs = true;
		$scope.boxWidth = '800px;'
	}
	$scope.addToCurrentFolder = function( tab ){
		// console.log( tabUrl )
		$scope.folders[$scope.current_folder].tabs.push(tab);
		$scope.syncFolders();
	}
	$scope.toggleTab = function( newtab ){
		var allTabsInFolder = $scope.folders[$scope.current_folder].tabs;
		
		var found = false;

		for( var i=0; i<allTabsInFolder.length; i++){
			if( allTabsInFolder[i].url.match(newtab.url) ){
				$scope.folders[$scope.current_folder].tabs.splice(i,1);
				found = true;
			}
		}
		if( found == false ){
			$scope.folders[$scope.current_folder].tabs.push(newtab);
		}
		$scope.syncFolders();

	}
	$scope.saveSelectedTabs = function(  ){
		// save folder to chrome storage
		// hide tab ui
	}
	$scope.activateTabs = function( index ){
		var tabsInFolder = $scope.folders[index].tabs;
		for( var i=0; i < tabsInFolder.length; i++ ){
			chrome.tabs.create({ url: tabsInFolder[i].url }, function(){ return });
		}
	}
	$scope.deactiveTabs = function( index ){
		var tabsInFolder = $scope.folders[index].tabs;
		var tabsToRemove = [];
		for( var c = 0; c < $scope.current_tabs.length; c++ ){
			for( var i=0; i < tabsInFolder.length; i++ ){
			// console.log( 'Scope:' + $scope.current_tabs[i].url );
			// console.log( 'tabManager:' + tabsInFolder[i].url );
				if( $scope.current_tabs[c].url == tabsInFolder[i].url ){
					tabsToRemove.push( $scope.current_tabs[c].id );
				}				
			}
		}
		chrome.tabs.remove( tabsToRemove, function(){ return });
	}
	$scope.removeTabFromFolder = function( index ){
		$scope.folders[$scope.current_folder].tabs.splice(index, 1);
		$scope.syncFolders();
	}
	$scope.showTabsInFolder = function( index ){
		$scope.current_folder = index;
	}
	$scope.turnOffTabAdding = function( ){
		$scope.addingTabs = false;
		$scope.boxWidth = "400px";
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
