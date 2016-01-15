Template.Issue.events({
  'click li.status-update': function(event, template){
    var newValue = $(event.target).parent()[0].id
    var id = Session.get('issue_id');

    Issues.update(id, {$set: {status: newValue}});
  }
});