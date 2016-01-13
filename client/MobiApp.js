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
      imageURL: Session.get('imageURL')
    });
  }
});