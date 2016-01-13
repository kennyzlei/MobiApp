Issues = new Mongo.Collection('issues');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.newIssue.helpers({
    'issue': function(){
      return "Some other text"
    },
    'other': function(){
      return "Try"
    }
  });

  Template.newIssue.events({
    'submit form': function(){
      var title = event.target.title.value;
      var description = event.target.description.value;
      console.log(title, description)
      Issues.insert({
        title: title,
        description: description,
        status: 'open'
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
