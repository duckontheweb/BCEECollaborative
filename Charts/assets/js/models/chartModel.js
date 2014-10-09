//chartModel.js


var ChartModel = Backbone.Model.extend({
	defaults: {
		gradeCurrent: null,
		chartValues: [],
		chartCategories: [],
		yAxisMax: null,
		gradesList: [],
		allData: {}
	}
});