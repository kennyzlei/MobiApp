Template.Issue.onRendered(function() {
  GoogleMaps.load();
});

Template.Issue.onCreated(function() {
    GoogleMaps.ready('issueMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
    });
});

Template.Issue.helpers({
    issueMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      var lat = Session.get('lat');
      var lng = Session.get('lng');
      console.log("lat:" + lat);
      return {
        center: new google.maps.LatLng(lat, lng),//Session.get('lat'), Session.get('lng')),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }
  }
});

Template.Issue.events({
  'click li.status-update': function(event, template){
    var newValue = $(event.target).parent()[0].id
    var id = Session.get('issue_id');

    Meteor.call("updateIssueStatus", id, status);
    // Issues.update(id, {$set: {status: newValue, lastModified: new Date()}});
  }
});