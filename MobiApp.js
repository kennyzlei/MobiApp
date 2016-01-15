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

// navigate to About
Router.route('/about', function () {
  this.layout('ApplicationLayout');
  this.render('About');
  this.render('Footer', {to: 'footer'});  
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
  this.render('Home');
});