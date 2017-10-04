 angular.module('resources.projects', ['mongolabResource']);
angular.module('resources.projects').factory('Projects', ['mongolabResource', function ($mongolabResource) {

  var Projects = $mongolabResource('projects');

  Projects.forUser = function(userId, successcb, errorcb) {
	  return Projects.all().then(function (result) {
		  return result.filter(function (x) {
			  return x.isDevTeamMember(userId) || x.isScrumMaster(userId) || x.isProductOwner(userId);
		  });
	  })
  };

  Projects.prototype.isProductOwner = function (userId) {
    return this.productOwner === userId;
  };
  Projects.prototype.canActAsProductOwner = function (userId) {
    return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
  };
  Projects.prototype.isScrumMaster = function (userId) {
    return this.scrumMaster === userId;
  };
  Projects.prototype.canActAsScrumMaster = function (userId) {
    return !this.isProductOwner(userId);
  };
  Projects.prototype.isDevTeamMember = function (userId) {
    return this.teamMembers.indexOf(userId) >= 0;
  };
  Projects.prototype.canActAsDevTeamMember = function (userId) {
    return !this.isProductOwner(userId);
  };

  Projects.prototype.getRoles = function (userId) {
    var roles = [];
    if (this.isProductOwner(userId)) {
      roles.push('PO');
    } else {
      if (this.isScrumMaster(userId)){
        roles.push('SM');
      }
      if (this.isDevTeamMember(userId)){
        roles.push('DEV');
      }
    }
    return roles;
  };

  return Projects;
}]);