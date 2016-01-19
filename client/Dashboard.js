Template.dashboard.onRendered(function() {
  GoogleMaps.load();
});

Template.dashboard.onCreated(function() {
    GoogleMaps.ready('issueMap', function(map) {
      // Add a marker to the map once it's ready

      // Show newest tasks at the top
      var filter = {};

      if(Session.equals('status_filter', 'all') || Session.equals('status_filter', undefined)){
        filter = {};
      } else {
        filter = {status: Session.get('status_filter')};
      }

      var issues = Issues.find(filter, {sort: {createdAt: 1}});
      globalMap = map;
      addMarkers(issues.fetch());
    });
});

Template.dashboard.helpers({
  issues: function (){
    // Show newest tasks at the top
    var filter = {};

    if(Session.equals('status_filter', 'all') || Session.equals('status_filter', undefined)){
      filter = {};
    } else {
      filter = {status: Session.get('status_filter')};
    }

    var issues = Issues.find(filter, {sort: {createdAt: 1}});
    addMarkers(issues.fetch());
    return issues;
  },
  init: function () {
      Meteor.defer(function(){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var one_hour = (1000*60*60);
            var now = new Date();
            var one_hour_ago = new Date(new Date().getTime() - one_hour);
            var two_hour_ago = new Date(new Date().getTime() - 2*one_hour);
            var three_hour_ago = new Date(new Date().getTime() - 3*one_hour);
            var four_hour_ago = new Date(new Date().getTime() - 4*one_hour);

            var one_month = (1000*60*60*24*30);
            var now = new Date();
            var one_month_ago = new Date(new Date().getTime() - one_month);
            var two_month_ago = new Date(new Date().getTime() - 2*one_month);
            var three_month_ago = new Date(new Date().getTime() - 3*one_month);
            var four_month_ago = new Date(new Date().getTime() - 4*one_month);

            var data = google.visualization.arrayToDataTable([
              [
                'Time',
                'Pending',
                'Solved'
              ],
              [
                'Four months ago',
                Issues.find({status: "pending",lastModified:{$gte:four_month_ago, $lt:three_month_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:four_month_ago, $lt:three_month_ago}}).count()
              ],
              [
                'Three months ago',
                Issues.find({status: "pending",lastModified:{$gte:three_month_ago, $lt:two_month_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:three_month_ago, $lt:two_month_ago}}).count()
              ],
              [
                'Two months ago',
                Issues.find({status: "pending",lastModified:{$gte:two_month_ago, $lt:one_month_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:two_month_ago, $lt:one_month_ago}}).count()
              ],
              [
                'One month ago',
                Issues.find({status: "pending",lastModified:{$gte:one_month_ago, $lt:now}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:one_month_ago, $lt:now}}).count()
              ]
            ]);
            var options = {
                title: 'Resolution Time',
                curveType: 'function',
                legend: { position: 'below' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);

            var data2 = google.visualization.arrayToDataTable([
                [
                'Time',
                'Open',
                'Pending',
                'Solved',
                'Rejected'
              ],
              [
                'Four hours ago',
                Issues.find({status: "open",lastModified:{$gte:four_hour_ago, $lt:three_hour_ago}}).count(),
                Issues.find({status: "pending",lastModified:{$gte:four_hour_ago, $lt:three_hour_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:four_hour_ago, $lt:three_hour_ago}}).count(),
                Issues.find({status: "rejected",lastModified:{$gte:four_hour_ago, $lt:three_hour_ago}}).count()
              ],
              [
                'Three hours ago',
                Issues.find({status: "open",lastModified:{$gte:three_hour_ago, $lt:two_hour_ago}}).count(),
                Issues.find({status: "pending",lastModified:{$gte:three_hour_ago, $lt:two_hour_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:three_hour_ago, $lt:two_hour_ago}}).count(),
                Issues.find({status: "rejected",lastModified:{$gte:three_hour_ago, $lt:two_hour_ago}}).count()
              ],
              [
                'Two hours ago',
                Issues.find({status: "open",lastModified:{$gte:two_hour_ago, $lt:one_hour_ago}}).count(),
                Issues.find({status: "pending",lastModified:{$gte:two_hour_ago, $lt:one_hour_ago}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:two_hour_ago, $lt:one_hour_ago}}).count(),
                Issues.find({status: "rejected",lastModified:{$gte:two_hour_ago, $lt:one_hour_ago}}).count()
              ],
              [
                'One hour ago',
                Issues.find({status: "open",lastModified:{$gte:one_hour_ago, $lt:now}}).count(),
                Issues.find({status: "pending",lastModified:{$gte:one_hour_ago, $lt:now}}).count(),
                Issues.find({status: "solved",lastModified:{$gte:one_hour_ago, $lt:now}}).count(),
                Issues.find({status: "rejected",lastModified:{$gte:one_hour_ago, $lt:now}}).count()
              ]
            ]);
            var view2 = new google.visualization.DataView(data2);

            var options2 = {
            title: "Status track",
            bar: {groupWidth: "95%"},
            legend: { position: "below" },
            };
            var chart2 = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
            chart2.draw(view2, options2);
        }
    });
  },
  issueMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-23.5333333, -46.616667),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
    }
  }
});

Template.dashboard.events({
  'click a.status-filter': function(event, template){

    var newValue = event.target.id;
    Session.set('status_filter', newValue);
  }
});

var globalMap = null;
var markers = [];

function addMarkers(items) {
    if (globalMap) {
        // clear markers
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
        items.forEach(function(item){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.lat, item.lng),
                map: globalMap.instance
            });
            markers.push(marker);
        })
    }
}