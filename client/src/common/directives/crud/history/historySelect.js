angular.module('directives.history.select', [])

	// Apply this directive to an element at or below a form that will manage CRUD operations on a resource.
	// - The resource must expose the following instance methods: $saveOrUpdate(), $id() and $remove()
	.directive('historySelect', function () {
		return {
			// We ask this directive to create a new child scope so that when we add helper methods to the scope
			// it doesn't make a mess of the parent scope.
			// - Be aware that if you write to the scope from within the form then you must remember that there is a child scope at the point
			scope: true,
			require: '^crudEdit',
			restrict: 'E',
			link: function (scope, element, attrs, crudEdit) {
				console.log(crudEdit);
				
			
				crudEdit.revertToId();
			}
		};
	});