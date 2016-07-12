angular.module('home.controller', [])
	.directive('showResult', function(){
		return {
			restrict: 'EA',
			scope: {
				showlist: '=',
				searchvalue: '=' 
			},
			templateUrl: '../views/search-result.html'
		}
	}).controller('HomeController', function ($scope, $sce, homeResource) {

		$scope.getSearchResult = function () {
			homeResource.query({
				keyword: $scope.keyword
			}, function (response) {
				$scope.shows = response;
			});	
		};
		$scope.renderHtml = function(html_code)
		{
		    return $sce.trustAsHtml(html_code);
		};		
});
