angular.module('directives.comment.new', [])

	.directive('newComment', function () {
		return {
			restrict: 'E',
			replace: true,
			template:
			'<div>' +
			'  <textarea ng-model="comment" style="width: 400px" rows="4" cols="50" />' +
			'  <button type="button" class="btn btn-primary" ng-click="addComment(comment)">Post Comment</button>' +
			'</div>'
		};
	});