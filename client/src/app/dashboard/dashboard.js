angular
	.module('dashboard', ['resources.projects', 'resources.tasks', 'security.service'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/dashboard', {
			templateUrl: 'dashboard/dashboard.tpl.html',
			controller: 'DashboardCtrl',
			resolve: {
				properties: ['security', 'Projects', 'Tasks', '$q', function (service, Projects, Tasks, $q) {
					return service.requestCurrentUser().then(function (response) {
						var user = response;
						return $q.all([Tasks.forUser(user.id), Projects.forUser(user.id), Tasks.watchedBy(user.id)]).then(function (response) {
							return {
								user: user,
								tasks: response[0],
								projects: response[1],
								watching: response[2]
							}
						});

					});
				}]
			}
		});
	}])

	.controller('DashboardCtrl', ['$scope', '$location', 'properties', function ($scope, $location, properties) {

		$scope.projects = properties.projects;
		$scope.tasks = properties.tasks;
		$scope.user = properties.user;
		$scope.watching = properties.watching;

		$scope.manageBacklog = function (projectId) {
			$location.path('/projects/' + projectId + '/productbacklog');
		};

		$scope.manageSprints = function (projectId) {
			$location.path('/projects/' + projectId + '/sprints');
		};
	}]);