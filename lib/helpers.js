Handlebars.registerHelper('label_mapper', function(status) {
  var dict = {};
  //Updates labels for submitted issues
  dict["open"] = "-warning";
  dict["rejected"] = "-danger";
  dict["solved"] = "-success";
  dict["pending"] = "-info"
  return dict[status]
});

Handlebars.registerHelper('status_list', function(removable = "") {
  var list = ["open", "rejected", "solved", "pending"];
  var i = list.indexOf(removable);
  if(i != -1){
    list.splice(i, 1);
  }

  return list;
});

Handlebars.registerHelper('count_by_status', function(status) {
  return Issues.find({status: status}).count();
});

Handlebars.registerHelper('count_issues', function() {
  return Issues.find({}).count();
});

Handlebars.registerHelper('prettify_date', function(timestamp) {
  var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
  ];

  var date = new Date(timestamp);
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
});
