//eeChartsApp.js

var dataObject = {};


$(document).ready(function() {

	//root web path
	var basepath = 'http://www.duckontheweb.com/BCEECollaborative/Charts/';

	//relative json path
	pathJSON = 'assets/data/programLength.json';
	
	//read json file
	$.getJSON(basepath + pathJSON, function(data) {
		
		$.each(data, function(key1, value1) {
			if (key1 != "categories") {
				dataObject[key1] = [];
				$.each(value1, function(key2, value2) {
					dataObject[key1].push(value2);
				})
			} 			
		})

		var chartModel = new ChartModel({
			gradeCurrent: '4',
			chartCategories: data.categories
		});

		var chartView = new ChartView({
			model: chartModel
		})

		console.dir(data.categories[0]);

		
	});
});