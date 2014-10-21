var dataModel;

var changeTheme = function (id) {

}

function indexOfObject(array, name, value) {
    for (q=0; q<array.length; q++) {
        if (array[q][name] == value) {
            return q;
        }
    }
}

var filterData = function (model) {
	
	// Create new crossfilter object
	var dataCross = crossfilter(model.get("rawData"));
	
	// Get top 4 organizations for selected school
	var orgDimension = dataCross.dimension(function (d) {return d.organization});
	var orgsInSchool = orgDimension.filter(model.get("schoolSelected")).group(function (organization) {return organization;});
	var topOrgs = orgsInSchool.reduceSum(function (d) {return d.totalhours * d.studentsvisited;}).top(4);
	
	var topOrgList = [];
	for (i in topOrgs) {
		topOrgList.push(topOrgs[i].key);
	}
	model.set("topOrgs", topOrgList);

	// Filter data for charting

	var secondFilterValue = model.get("secondFilter");

	var chartCross = crossfilter(model.get("rawData"))
		.dimension(function (d) {return d[model.get("firstFilter")]})
		.filter(model.get("schoolSelected"))
		.group(function (secondFilterValue) {return secondFilterValue});

	console.dir(chartCross.all());

	
}

var mainApp = function(rawData) {

	var schoolsSorted = rawData.schools.sort(function (a, b) {
	  if (a.label > b.label) {
	    return 1;
	  }
	  if (a.label < b.label) {
	    return -1;
	  }
	  // a must be equal to b
	  return 0;
	});

	dataModel = new DataModel({
		rawData: rawData.data,
		schools: schoolsSorted,
		firstFilterList: [{label: 'Grade', val: 'grade'}, {label: 'Organization', val: 'organization'}, {label: 'Program Length', val: 'totalhours'}]
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