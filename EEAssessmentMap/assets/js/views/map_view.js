//view_template.js


var MapView = Backbone.View.extend({

	el: $('map'),

	initialize: function () {
		this.render();

	},

	render: function () {
		var self = this;

		var schoolJSON = self.model.get("data");

		//Create JSON layer from elementaryJSON data and add to map
		var schoollayer = L.geoJson(schoolJSON, 
			{
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, {
						color: '#006d2c',
						weight: 1,
						opacity: 1,
						fillColor: getColor(feature),
						fillOpacity: 0.8,
						// radius: getRadius(feature)
						radius: 6
					});
				},

				onEachFeature: function (feature, layer) {
	         		layer.bindPopup('<h4>' + feature.properties.school + '</h4><p class="tooltip-info">Total EE Hrs.: ' + feature.properties.eehrs_total + '<br /> Total Students: ' + feature.properties.students_total + 
	         			'<br /> Percent Free or Reduced Lunch: ' + (feature.properties.percent_frl*100).toFixed(0) + '%' + '<br /> Percent People of Color: ' + (feature.properties.percent_poc*100).toFixed(0) + '%' +'</p>'
	         		);
	         	}
			});

		//Create hover event
		schoollayer.on('mouseover', hoverEvent);
		schoollayer.on('mouseout', unhoverEvent);

		//instantiates map object with initial zoom, max zoom, min zoom, and center properties
		 var map = L.map('map', 
				{
	            center: [ 40.075, -105.2 ],
	            zoom: 11,
	            maxZoom: 15,
	            minZoom: 10
	        });

		//adds tile layer from Mapbox
		var baseTiles = L.tileLayer('https://a.tiles.mapbox.com/v3/jonathancduckworth.il6o28fp/{z}/{x}/{y}.png',
			{attribution: 'Basemap tiles &copy; <a href = "www.mapbox.com">Mapbox</a><br />Env. Education Data from BCEE Assessment 2013'});

		baseTiles.addTo(map);
		schoollayer.addTo(map);
}
});
