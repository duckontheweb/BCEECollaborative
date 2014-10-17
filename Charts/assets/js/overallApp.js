var newCross, schoolDimension, schoolGroup;

var changeTheme = function (id) {

}

var filterData = function (model) {
	
	// Create new crossfilter object
	var dataCross = crossfilter(model.get("rawData"));
	// Get top 4 organizations for selected school
	var orgDimension = dataCross.dimension(function (d) {return d.organization});
	var orgsInSchool = orgDimension.filter(model.get("schoolSelected"));
	// console.dir(dataCross);
	// console.dir(orgDimension);
	// console.dir(orgsInSchool);
}

var mainApp = function(rawData) {

	var dataModel = new DataModel({
		rawData: rawData.data,
		schools: rawData.schools.sort(function (a, b) {
			  if (a.label > b.label) {
			    return 1;
			  }
			  if (a.label < b.label) {
			    return -1;
			  }
			  // a must be equal to b
			  return 0;
			}),
		filterList: [{label: 'Grade', val: 'grade'}, {label: 'Organization', val: 'organization'}, {label: 'Program Length', val: 'totalhours'}]
	});

	var schoolDropdown = new SchoolDropdown({
		model: dataModel
	});

	var firstDropdown = new FirstDropdown({
		model: dataModel
	});

	var secondDropdown = new SecondDropdown({
		model: dataModel
	})

	filterData(dataModel);

}

$(document).ready(function () {
	var basePath = 'http://localhost:8888/BCEECollaborative/Charts/'
	$.getJSON(basePath + 'assets/data/overallData.json', function(json) {
		mainApp(json);
	})
})