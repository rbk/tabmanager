var app = angular.module('tabManager', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){


	$scope.active = '';
	$scope.project_title = 'Tab Workspace Manager';

	$scope.current_tabs = [];
	// $.when(getMyTabs()).then(function(results){
	// 	console.log(results);
	// 	$scope.current_tabs = results;
	// 	$scope.$apply();
	// });

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

	$scope.dataStuff = function( ){
		chrome.storage.local.set({'value': 'myValue'}, function() {});
		chrome.storage.local.get('value', function(result) {});

	}

	$scope.addFolder = function( ){
		$scope.active = true;
		$scope.folders.push({"name": "test", "tabs": []});
	}
	$scope.removeFolder = function(index){
		// var conf = confirm('Are you sure you want to delete this folder and all of its tabs?');
		
		// if( !conf )
			// return;

		$scope.folders.splice(index, 1)

	}
		var queryInfo = {
		currentWindow: true
	};
	chrome.tabs.query(queryInfo, function(tabs){
		$scope.current_tabs = tabs;
		$scope.$apply();
	});



}]);
function getAllTabs( ){
	var queryInfo = {
		currentWindow: true
	};
	var allTabs = new Array();
	chrome.tabs.query(queryInfo, function(tabs){
		// $scope.current_tabs = tabs;
		for( var i=0; i<tabs.length; i++ ){
			console.log( tabs[i] );
			allTabs.push(tabs[i])
		}
	});
}
	function getMyTabs(){
		var deferred = $.Deferred();
		var queryInfo = {
			currentWindow: true
		};
		var allTabs = new Array();
		chrome.tabs.query(queryInfo, function(tabs){
			for( var i=0; i<tabs.length; i++ ){
				console.log( tabs[i] );
				allTabs.push(tabs[i])
			}
			deferred.resolve(allTabs)
		});
		return deferred.promise();
	}

$(function(){



  // chrome.tabs.query(queryInfo, function(tabs) {
  //   // chrome.tabs.query invokes the callback with a list of tabs that match the
  //   // query. When the popup is opened, there is certainly a window and at least
  //   // one tab, so we can safely assume that |tabs| is a non-empty array.
  //   // A window can only have one active tab at a time, so the array consists of
  //   // exactly one tab.
  //   var tab = tabs[0];

  //   // A tab is a plain object that provides information about the tab.
  //   // See https://developer.chrome.com/extensions/tabs#type-Tab
  //   var url = tab.url;

  //   // tab.url is only available if the "activeTab" permission is declared.
  //   // If you want to see the URL of other tabs (e.g. after removing active:true
  //   // from |queryInfo|), then the "tabs" permission is required to see their
  //   // "url" properties.
  //   console.assert(typeof url == 'string', 'tab.url should be a string');

  // });


});