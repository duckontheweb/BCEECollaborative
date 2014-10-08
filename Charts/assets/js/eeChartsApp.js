//eeChartsApp.js

var app = app || {};

$(document).ready(function() {

	//root web path
	var basepath = 'http://localhost:8080/BCEECollaborative/Charts/';

	//relative json path
	pathJSON = 'assets/data/programLength.json';
	
	//read json file
	$.getJSON(basepath + pathJSON, function(data) {
		$.each(data) 

		
	});
});