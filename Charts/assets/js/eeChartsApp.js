//eeChartsApp.js

var dataObject = {};
gradesList = []


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
			if (key1 == "categories") {
				dataObject.categories = value1;
			} else {
				gradesList.push({'grade': key1});
				dataObject[key1] = {'data': []};
				
				//for each organization
				$.each(value1, function(key2, value2) {
					if (value2['name'] == 'Thorne Nature Experience: Thorne BVSD 4th grade Field Trip') {
						value2['name'] = 'Thorne 4th Gr. Field Trips';
					}
					if (key2 == 'max') {
						dataObject[key1]['max'] = value2;
					} else if (key2 == 'total') {
						dataObject[key1]['total'] = value2;
					} else {
						var nonZero = false;
						//console.dir(value2);
						for (i in value2['data']) {
							if (value2['data'][i] != 0) {
								nonZero = true;
							}
						}
						if (nonZero) {
							dataObject[key1]['data'].push(value2);
						}
						var nonZero = false;
					}
				})
			}		
		})
		//console.dir(dataObject);

		var chartModel = new ChartModel({
			gradeCurrent: '4',
			chartCategories: dataObject.categories,
			gradesList: gradesList,
			allData: dataObject
		});

		var chartView = new ChartView({
			model: chartModel
		})

		var selectView = new DropdownView({
			model: chartModel
		})

		//console.dir(dataObject);
		//console.dir(gradesList);
		console.dir(chartModel.get("allData"))
		
	});
});