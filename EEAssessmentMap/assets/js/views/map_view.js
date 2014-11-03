//view_template.js


var MapView = Backbone.View.extend({

	el: $('map'),

	initialize: function () {
		this.render();

	},

	clickEvent: function (e) {
		var self = this;
		var infoSettings = _.clone(self.model.get("infoData"));
		infoSettings.school = e.layer.feature.properties.school;
		infoSettings.district = e.layer.feature.properties.district;
		infoSettings.totalStudents = e.layer.feature.properties.students_total;
		infoSettings.percentFRL = e.layer.feature.properties.percent_frl;
		infoSettings.percentPOC = e.layer.feature.properties.percent_poc;
		infoSettings.totalEEHours = e.layer.feature.properties.eehrs_total;

		//Get data for all non-null grades
		var tempCategories = [];
		var tempValues = [];
		var schoolObject;
		$.each(self.model.get("data"), function (i, object) {
			if (object.properties.school == e.layer.feature.properties.school & object.properties.district == e.layer.feature.properties.district) {
				$.each(object.properties, function (key, value) {
					if (key.indexOf('eehrs_') != -1 & key != 'eehrs_total' & value != null) {
						var grade = key.replace('eehrs_', '').toUpperCase();
						tempCategories.push(grade);
						tempValues.push(value);
					}
				})
				
				return false;
			}
		})
		infoSettings.chartCategories = tempCategories;
		infoSettings.chartValues = tempValues;

		//set model object
		self.model.set("infoData", infoSettings);
	},

	activatePopup: function (e) {
		
		schoolPopup.setLatLng(e.latlng)
			.setContent('<h4>' + e.layer.feature.properties.school + '</h4>')
			.openOn(map);
		
	},

	unhoverEvent: function () {
		map.closePopup();
	},

	render: function () {
		var self = this;

		var schoolJSON = self.model.get("data");

		schoolPopup = L.popup({
			offset: L.point(0, -5),
			closeButton: false
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
		schoollayer.on('mouseout', self.unhoverEvent);
		schoollayer.on('click', self.clickEvent, self);

		//instantiates map object with initial zoom, max zoom, min zoom, and center properties
		
		// Set max bounds
		var southWest = L.latLng(39.80748108746673, -105.6719970703125),
			northEast = L.latLng(40.332936381163876, -104.5733642578125);

		var theBounds = L.latLngBounds(southWest, northEast);

		map = L.map('map', 
			{
	            center: [ 40.08857859823707, -105.2225875854492 ],
	            zoom: 10,
	            maxZoom: 15,
	            minZoom: 10,
	            maxBounds: theBounds,
	            // bounceAtZoomLimits: false
	    });

		//adds tile layer from Mapbox
		var baseTiles = L.tileLayer('https://a.tiles.mapbox.com/v3/jonathancduckworth.il6o28fp/{z}/{x}/{y}.png',
			{attribution: 'Basemap tiles &copy; <a href = "www.mapbox.com">Mapbox</a><br />Env. Education Data from BCEE Assessment 2013'});

		baseTiles.addTo(map);
		schoollayer.addTo(map);
}
});
