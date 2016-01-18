Meteor.startup(function () {
  // code to run on server at startup  
  //Removing insecure
  Meteor.methods({
    addIssueGps: function (title, description, lat, lng, address, user_id, imageURL, updateStatus) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        
        Issues.insert({
                title: title,
                description: description,
                status: 'pending',
                lat: lat,
                lng: lng,
                address: address,
                userID: user_id,
                imageURL: imageURL,
                createdAt: new Date(),
                lastModified: new Date(),
                updates: updateStatus

        });
    },
    addIssueLocation: function (title, description, user_id, imageURL, updateStatus, location) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
        }
        Issues.insert({
                title: title,
                description: description + " Location Details: " + location,
                status: 'pending',
                lat: false,
                lng: false,
                userID: user_id,
                imageURL: imageURL,
                createdAt: new Date(),
                lastModified: new Date(),
                updates: updateStatus

        });
    }
    /*
    deleteTask: function (taskId) {
        Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
        Tasks.update(taskId, { $set: { checked: setChecked} });
    }*/
    });
});