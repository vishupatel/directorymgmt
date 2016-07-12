angular.module('show.controller',[])
	.controller('ShowController', function($scope, showDetail){
		$scope.showDetail = showDetail;
		
	});