Template.dashboard.onRendered(function() {
  GoogleMaps.load();
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

    return Issues.find(filter, {sort: {createdAt: 1}});
  },
  init: function () {
      Meteor.defer(function(){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Time', 'New', 'Pending'],
                ['10:10h',  2,      	0],
                ['10:14h',  1,        2],
                ['10:15h',  3,        1],
                ['10:16h',  1,        3],
                ['10:18h',  1,        3]
            ]);
            var options = {
                title: 'Complaints per time',
                curveType: 'function',
                legend: { position: 'below' }
            };
            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
            chart.draw(data, options);

            var data2 = google.visualization.arrayToDataTable([
                ["Month", "New", "Solved", { role: "style" } ],
                ["January", 8.94,8.94, "#b87333"],
                ["February", 10.49,8.94, "silver"],
                ["March", 19.30,8.94, "gold"],
                ["April", 21.45,8.94, "color: #e5e4e2"],
                ["May", 21.45,8.94, "color: #e5e4e2"],
                ["June", 21.45,8.94, "color: #e5e4e2"],
                ["July", 21.45,8.94, "color: #e5e4e2"],
                ["August", 21.45,8.94, "color: #e5e4e2"],
                ["September", 21.45,8.94, "color: #e5e4e2"],
                ["October", 21.45,8.94, "color: #e5e4e2"],
                ["November", 21.45,8.94, "color: #e5e4e2"],
                ["December", 21.45,8.94, "color: #e5e4e2"]
            ]);
            var view2 = new google.visualization.DataView(data2);
            view2.setColumns([0, 1,
                            { calc: "stringify",
                                sourceColumn: 1,
                                type: "string",
                                role: "annotation" },
                            2]);
            var options2 = {
            title: "Complaints per month",
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