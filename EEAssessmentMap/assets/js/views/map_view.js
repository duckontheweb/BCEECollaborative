//view_template.js


var MapView = Backbone.View.extend({

	el: $('map'),

	initialize: function () {
		this.render();

	},

	activatePopup: function (e) {
		
		schoolPopup.setLatLng(e.latlng)
			.setContent('<h4>' + e.layer.feature.properties.school + '</h4>')
			.openOn(map);
		
	},

	render: function () {
		var self = this;

		var schoolJSON = self.model.get("data");

		schoolPopup = L.popup({
			offset: L.point(0, -5)
		})

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

			});

		//Create hover event
		schoollayer.on('mouseover', self.activatePopup);
		schoollayer.on('mouseout', unhoverEvent);

		//instantiates map object with initial zoom, max zoom, min zoom, and center properties
		 map = L.map('map', 
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
