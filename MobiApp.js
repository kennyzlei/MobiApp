//Global Variables
Issues = new Mongo.Collection('issues');

// Routing
Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

Router.route('/', function() {
  this.render('Home');
});

Router.route('/new-issue', function () {
  // render the Home template with newIssue submission
  this.layout('ApplicationLayout');
  this.render('newIssue');
  this.render('Footer', {to: 'footer'});
});

Router.route('/issue/:_id', function() {
  var issue = Issues.find({_id: this.params._id});
  this.render('Issue',{data: {current_issue: issue.fetch()[0]}});
  this.render('Footer', {to: 'footer'});
  Session.set('issue_id', this.params._id)
});

// navigate to About
Router.route('/about', function () {
  this.layout('ApplicationLayout');
  this.render('About');
});

//navigate to submited issues
Router.route('/issues-list', function () {
  this.layout('ApplicationLayout');
  this.render('IssuesList');
  this.render('Footer', {to: 'footer'});
});

//navigate to submited issues
Router.route('/dashboard', function () {
  this.render('dashboard');
});

Router.route('/logout', function() {
  AccountsTemplates.logout();
  Router.go('/');
});


//Removing insecure
Meteor.methods({
  addIssueGps: function (title, description, lat, lon, user_id, imageURL, updateStatus) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Issues.insert({
            title: title,
            description: description,
            status: 'pending',
            lat: lat,
            lng: lon,
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