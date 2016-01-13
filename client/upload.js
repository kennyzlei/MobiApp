Session.setDefault('imageURL', 'No File Yet');

Template.newIssue.helpers({
  imageURL: function () {
  return Session.get('imageURL');
  }
});

Template.newIssue.events({
  "change .myFileInput": function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
        } else {
          Session.set('imageURL', '/cfs/files/images/' + fileObj._id);
        }
      });
    });
  }
});