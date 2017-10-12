angular.module('resources.tasks', ['mongolabResource']);
angular.module('resources.tasks').factory('Tasks', ['mongolabResource', function (mongolabResource) {

	var Tasks = mongolabResource('tasks');

	Tasks.statesEnum = ['TODO', 'IN_DEV', 'BLOCKED', 'IN_TEST', 'DONE'];

	Tasks.forProductBacklogItem = function (productBacklogItem) {
		return Tasks.query({ productBacklogItem: productBacklogItem });
	};

	Tasks.forSprint = function (sprintId) {
		return Tasks.query({ sprintId: sprintId });
	};

	Tasks.forUser = function (userId) {
		return Tasks.query({ assignedUserId: userId });
	};

	Tasks.forProject = function (projectId) {
		return Tasks.query({ projectId: projectId });
	};

	Tasks.watchedBy = function (userId) {
		return Tasks.all().then(function (result) {
			return result.filter(function (x) {
				return x.isWatchedBy(userId);
			});
		});
	};

	Tasks.prototype.isWatchedBy = function (userId) {
		if (this.usersWatching) {
			return this.usersWatching.map(function (x) { return x.userId; }).indexOf(userId) >= 0;
		}
		return;
	};

	return Tasks;
}]);