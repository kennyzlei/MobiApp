//Global Variables
Issues = new Mongo.Collection('issues');

// Routing

Router.route('/', function () {
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


//-----------------------------------------TO BE DELETED: WAITS FOR REVISION ------------------------------------------
// when you navigate to "/one" automatically render the template named "One".
Router.route('/upload');

// when you navigate to "/login" automatically render the template named "Login".
Router.route('/newIssue');
//----------------------------------------------------------------------------------------------------------------------