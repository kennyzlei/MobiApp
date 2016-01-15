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