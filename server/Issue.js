Meteor.startup(function () {
  // code to run on server at startup
  Meteor.methods({
    updateIssueStatus: function(id, status){
      if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

      Issues.update(id, {$set: {status: status, lastModified: new Date()}});
    }
  });
});