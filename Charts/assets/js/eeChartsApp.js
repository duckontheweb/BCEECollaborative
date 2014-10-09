//eeChartsApp.js

var dataObject = {};


$(document).ready(function() {

	//root web path
	// var basepath = 'http://www.duckontheweb.com/BCEECollaborative/Charts/';
	var basepath = 'http://localhost:8888/BCEECollaborative/Charts/'

	//relative json path
	pathJSON = 'assets/data/programLength.json';
	
	//read json file
	$.getJSON(basepath + pathJSON, function(data) {
		
		//for each element (grade or categories)
		$.each(data, function(key1, value1) {
			if (key1 != "categories") {
				dataObject[key1] = [];
				
				//for each organization
				$.each(value1, function(key2, value2) {
					if (value2['name'] == 'Thorne Nature Experience: Thorne BVSD 4th grade Field Trip') {
						value2['name'] = 'Thorne 4th Gr. Field Trips'
					}
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

		console.dir(data);

		
	});
});