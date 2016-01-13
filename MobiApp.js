//Global Variables
Issues = new Mongo.Collection('issues');

// Routing

Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('newIssue');
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/upload');

// when you navigate to "/login" automatically render the template named "Login".
Router.route('/newIssue');

