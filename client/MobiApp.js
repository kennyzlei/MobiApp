Geolocation.latLng()

Template.newIssue.events({
  'submit form': function(){
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    var imageURL = Session.get('imageURL');
    var updateStatus = event.target.updcheck.checked;
    console.log(title, description);
    if (title && description) {
        Issues.insert({
            title: title,
            description: description,
            status: 'pending',
            lat: Geolocation.latLng().lat,
            lng: Geolocation.latLng().lng,
            userID: Meteor.userId(),
            imageURL: imageURL,
            createdAt: new Date(),
            lastModified: new Date(),
            updates: updateStatus

        });
        Router.go('/issues-list');
    } else {
        console.log("form not valid");
    }
  }
});

Template.newIssue.helpers({
  showMap: function(){
    //here check if GPS data is available
    //add html to show good map
    if (Geolocation.latLng()){
      return true;
    }
    else{
      return false;
    }
  }
});

Template.IssuesList.helpers({
  title: function(){
    return "Status of Submitted"
  },
  issues: function (){
    // Show newest tasks at the top
    return Issues.find({'userID': Meteor.userId()}, {sort: {createdAt: 1}})
  }
});
