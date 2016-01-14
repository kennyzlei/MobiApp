Router.route('/', {
  name: 'home',
  layoutTemplate: 'publicLayout'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});

Router.route('/new-issue', function () {
  // render the Home template with newIssue submission
  layoutTemplate: 'publicLayout'
  this.render('newIssue');
  this.render('Footer', {to: 'footer'});

});

// navigate to About
Router.route('/about', function () {
 layoutTemplate: 'publicLayout'
  this.render('About');
  this.render('Footer', {to: 'footer'});
});

//navigate to submited issues
Router.route('/issues-list', function () {
  layoutTemplate: 'publicLayout'
  this.render('IssuesList');
  this.render('Footer', {to: 'footer'});
});