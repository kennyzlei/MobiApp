Template.newIssue.events({
  'submit form': function(){
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    console.log(title, description)
    Issues.insert({
      title: title,
      description: description,
      status: 'open',
      lat: Geolocation.latLng().lat,
      lng: Geolocation.latLng().lng,
      userID: Meteor.userId(),
      imageURL: Session.get('imageURL'),
      createdAt: new Date(),
      lastModified: new Date()
    });
  }
});

Template.IssuesList.helpers({
  title: function(){
    return "Status of Submitted"
  },
  issues: function () {
      // Show newest tasks at the top
      return Issues.find({'userID': this.userId}, {sort: {createdAt: 1}})
    }
});