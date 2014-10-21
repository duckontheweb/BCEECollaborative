
var DataModel = Backbone.Model.extend({
	rawData: [],
	schools: [],
	schoolSelected: '',
	schoolSelectedName: '',
	topSchools: [],
	firstFilterList: [],
	secondFilterList: [],
	firstFilter: '',
	secondFilter: '',
	categories: {
		organization: [],
		totalhours: [],
		grades: []
	},
	chartSeries: []
});