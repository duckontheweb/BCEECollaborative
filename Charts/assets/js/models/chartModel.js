//chartModel.js

var app = app || {};

var app.chartModel = Backbone.Model.extend({
	defaults: {
		gradeCurrent: null,
		chartValues: [],
		chartCategories: []
	}
});