Issues = new Mongo.Collection('issues');

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('newIssue');
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/upload');

// when you navigate to "/login" automatically render the template named "Login".
Router.route('/newIssue');

if (Meteor.isClient) {
  Template.newIssue.events({
    'submit form': function(){
      var title = event.target.title.value;
      var description = event.target.description.value;
      console.log(title, description)
      Issues.insert({
        title: title,
        description: description,
        status: 'open',
        lat: Geolocation.latLng().lat,
        lng: Geolocation.latLng().lng,
        userID: Meteor.userId()
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
