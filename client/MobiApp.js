Geolocation.latLng()

Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyCF_82_4WnRrrTXUP6Aq9HIPweoOaTroEc',
    libraries: 'places'  // also accepts an array if you need more than one
  });
  console.log("GoogleMaps are set up");
});

Template.newIssue.events({
  'submit form': function(){
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    var imageURL = Session.get('imageURL');
    var updateStatus = event.target.updcheck.checked;
    console.log(title, description);
    if (title) {
        Issues.insert({
            title: title,
            description: description,
            status: 'pending',
            //lat: Geolocation.latLng().lat,
            //lng: Geolocation.latLng().lng,
            userID: Meteor.userId(),
            imageURL: imageURL,
            createdAt: new Date(),
            lastModified: new Date(),
            updates: updateStatus

        });
        Router.go('/issues-list');
    } else {
        console.log("form not valid");
    }
  },
  
});

Template.newIssue.onRendered(function () {
    this.autorun(() => {
      // Wait for API to be loaded
      if (GoogleMaps.loaded()) {
        $('#location-description')
        .geocomplete({
          map: $("#map"),
          mapOptions: {
            zoom: 13
          },
          markerOptions: {
            draggable: true
            //Bounds that need to be implemented
        //-23.798107,-46.886902
        //-23.366408,-46.299133
          },
          location:[-23.5500, -46.6333]
        })

        .bind("geocode:result", function(event, result){
          console.log(result);
          var markLat = result.geometry.location.lat;
          var markLon = result.geometry.location.lon;
        })
        .bind("geocode:error", function (event, status) {
          console.log(status);
        })
        .bind("geocode:multiple", function (event, results) {
          console.log("Multiple: " + results.length + " results found");
        });
      }
    });

  });

Template.newIssue.helpers({
  showMap: function(){
    //here check if GPS data is available
    //add html to show good map
    if (Geolocation.latLng()){
      return true;
    }
    else{
      return false;
    }
  }
});

Template.IssuesList.helpers({
  title: function(){
    return "Status of Submitted"
  },
  issues: function (){
    // Show newest tasks at the top
    return Issues.find({'userID': Meteor.userId()}, {sort: {createdAt: 1}})
  }
});
