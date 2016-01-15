Geolocation.latLng()

Template.newIssue.events({
  'submit form': function(){
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    var imageURL = Session.get('imageURL');
    console.log(title, description);
    if (title && description && Geolocation.latLng()) {
        Issues.insert({
            title: title,
            description: description,
            status: 'open',
            lat: Geolocation.latLng().lat,
            lng: Geolocation.latLng().lng,
            userID: Meteor.userId(),
            imageURL: imageURL,
            createdAt: new Date(),
            lastModified: new Date()
        });
        Router.go('/issues-list');
    } else {
        console.log("form not valid");
    }
  }
});

Template.IssuesList.helpers({
  title: function(){
    return "Status of Submitted"
  },
  issues: function (){
      // Show newest tasks at the top
      return Issues.find({'userID': this.userId}, {sort: {createdAt: 1}})
  }
});

Template.task.helpers({
  label_mapper: function(par){
    var dict = {};
    //Updates labels for submitted issues
    dict["open"] = "-warning";
    dict["rejected"] = "-danger";
    dict["solved"] = "-success";
    dict["pending"] = "-info"
    return dict[par]
  }
});