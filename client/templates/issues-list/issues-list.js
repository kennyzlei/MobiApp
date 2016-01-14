Template.IssuesList.helpers({
  title: function(){
    return "Status of Submitted"
  },
  issues: function () {
      // Show newest tasks at the top
      return Issues.find({'userID': this.userId}, {sort: {createdAt: 1}})
    }
});