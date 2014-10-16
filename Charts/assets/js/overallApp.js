

var mainApp = function(rawData) {
	var newCross = crossfilter(rawData.data);
	var schoolDimension = newCross.dimension(function(d) {return d.school});
	var uniHillFilter = schoolDimension.filter("University Hill Elementary School")
	var schoolGroup = schoolDimension.group();
	schoolGroup.reduceSum(function(d) {return (d.totalhours * d.studentsvisited)});
	console.dir(schoolGroup);
}

$(document).ready(function () {
	var basePath = 'http://localhost:8888/BCEECollaborative/Charts/'
	$.getJSON(basePath + 'assets/data/overallData.json', function(json) {
		mainApp(json);
	})
})