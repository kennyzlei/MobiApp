Handlebars.registerHelper('label_mapper', function(status) {
  var dict = {};
  //Updates labels for submitted issues
  dict["open"] = "-warning";
  dict["rejected"] = "-danger";
  dict["solved"] = "-success";
  dict["pending"] = "-info"
  return dict[status]
});