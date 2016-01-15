Template.dashboard.helpers({
  issues: function (){
    // Show newest tasks at the top
    return Issues.find({}, {sort: {createdAt: 1}})
  }
});