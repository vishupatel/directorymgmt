 angular.module('home.service', [])
	.factory('homeResource', function ($resource) {
		return $resource('/api/search');
	});