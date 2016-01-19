Geolocation.latLng()

Template.newIssue.onRendered(function()
{
  console.log(i18n('helloWorld'));
  var localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
  var locale = 'br';
  if (localeFromBrowser.match(/br/)) {
    locale = 'br';
  }
  else if (localeFromBrowser.match(/en/)) {
    locale = 'en';
  }
  i18n.setLanguage(locale);
})

Template.newIssue.events({
  'submit form': function(){
    event.preventDefault();
    var title = event.target.title.value;
    var description = event.target.description.value;
    var location = event.target.location.value;
    var imageURL = Session.get('imageURL');
    var updateStatus = event.target.updcheck.checked;
    Session.set("flag_t", "");
    Session.set("flag_d", "");
    Session.set("flag_l", "");
    console.log(title, description, location);
    
    if (title && description && Geolocation.latLng()) {
        /*Issues.insert({
            title: title,
            description: description,
            status: 'pending',
            lat: Geolocation.latLng().lat,
            lng: Geolocation.latLng().lng,
            userID: Meteor.userId(),
            imageURL: imageURL,
            createdAt: new Date(),
            lastModified: new Date(),
            updates: updateStatus

        });*/
        // Insert a task into the collection
        //(title, description, lat, lon, user_id, imageURL, updateStatus)
        var lat = Geolocation.latLng().lat;
        var lng = Geolocation.latLng().lng;
        reverseGeocode.getLocation(lat, lng, function(location){
            var addressString = reverseGeocode.getAddrStr();
            Meteor.call("addIssueGps", title, description, lat, lng, addressString, Meteor.userId(), imageURL, updateStatus);
            console.log(Geolocation.latLng());
            Router.go('/issues-list');
        });
    } 
    else if (title && description && location){
            /*Issues.insert({
                title: title,
                description: description + " Location: " + location,
                status: 'pending',
                lat: false,
                lng: false,
                userID: Meteor.userId(),
                imageURL: imageURL,
                createdAt: new Date(),
                lastModified: new Date(),
                updates: updateStatus

            });*/
//(title, description, user_id, imageURL, updateStatus, location)
            Meteor.call("addIssueLocation", title, description, Meteor.userId(), imageURL, updateStatus, location);
            Router.go('/issues-list');      
    }
    if (!title) {
        Session.set("flag_t", "has-error");
        console.log("invalid form: No title");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if (!description){
        Session.set("flag_d", "has-error");
        console.log("invalid form: No description");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    if (!location){
      Session.set("flag_l", "has-error");
      console.log("invalid form: No location description");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
});


Template.LocationForm.helpers({
  flagLocation: function(){
    var title = "";
    if ( Session.get('flag_l') ) title = Session.get('flag_l');
    return title;
  } 
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
  },
  flagTitle: function(){
    var title = "";
    if ( Session.get('flag_t') ) title = Session.get('flag_t');
    return title;
  },
  flagDescription: function(){
    var title = "";
    if ( Session.get('flag_d') ) title = Session.get('flag_d');
    return title;
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
