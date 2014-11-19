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
						fillColor: getColor(feature.properties.eehrs_total),
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
		var southWest = L.latLng(39.7631584037253, -105.68984985351562),
			northEast = L.latLng(40.27847797779299, -104.7491455078125);

		var theBounds = L.latLngBounds(southWest, northEast);

		map = L.map('map', 
			{
	            center: [ 40.02130468739707, -105.21949768066406 ],
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

		//Adds legend
		var legend = L.control({position: 'bottomleft'});

		legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
				levels = [0, 40, 80, 120, 160]
			div.innerHTML += '<h3 id="legend-title">Schools</h3>'
			div.innerHTML += '<h5 id="legend-description">(total hours of EE)</h5>'
			$.each(levels, function(i, value) {
				div.innerHTML +=
					'<i style="background:' + getColor(value + 1) + '"></i>' + value + 
					(levels[i + 1] ? ' &ndash; ' + levels[i + 1] + ' hours<br/>' : '+ hours');
			})

			return div;
		};

		legend.addTo(map);
}
});
