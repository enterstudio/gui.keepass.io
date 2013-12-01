﻿angular.module("keepass.io").controller("DatabaseViewerCtrl", function ($scope, $rootScope) {
	$rootScope.cssScope = "kp-viewer";

	$rootScope.title = $scope.database.name;
	$rootScope.description = $scope.database.description;

	$scope.groups = $scope.database.groups;
	processGroups($scope.groups);

	function processGroups(groups, parent) {
		if (groups) {
			groups.forEach(function (group) {
				group.parent = parent;

				group.entries.forEach(function (entry) {
					entry.parent = group;
					entry.isEntry = true;
				});

				processGroups(group.groups, group);
			});
		}
	}

	$scope.select = function (item) {
		$scope.selectedItem = item;
	};

	$scope.isSelected = function (item) {
		if ($scope.selectedItem === item) {
			return true;
		}

		if ($scope.selectedItem) {
			var currentItem = $scope.selectedItem.parent;
			while (currentItem) {
				if (currentItem === item) {
					return true;
				}
				currentItem = currentItem.parent;
			}
		}

		return false;
	};
});