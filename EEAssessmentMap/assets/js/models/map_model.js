//model_template.js


var MapModel = Backbone.Model.extend({
	defaults: {
		data: {},
		infoData: {
			school: '',
			district: '',
			totalStudents: null,
			percentFRL: null,
			percentPOC: null,
			totalEEHours: null,
			chartCategories: [],
			chartValues: []
		}
	}
});