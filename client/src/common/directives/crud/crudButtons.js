angular.module('directives.crud.buttons', [])

	.directive('crudButtons', function () {
		return {
			restrict: 'E',
			replace: true,
			require: '^crudEdit',
			template:
			'<div>' +
			'	<button type="button" class="btn btn-primary save" ng-disabled="!canSave()" ng-click="save()">Save</button>' +
			'	<button type="button" class="btn btn-danger remove" ng-click="remove()" ng-show="canRemove()">Remove</button>' +
			'	<history-select></history-select>' +
			'</div>'
			
		};
	});