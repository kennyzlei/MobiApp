var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
 stores: [imageStore]
});

Images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
    }
});

Images.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});


if (Meteor.isClient) {
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
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}