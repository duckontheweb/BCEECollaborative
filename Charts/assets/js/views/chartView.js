//chartView.js

var app = app || {};

var app.chartView = Backbone.View.extend({

	el: $('#chart'),

	initialize: function () {
		this.prepdata();
		this.model.on('change:grade', this.update, this);
	},

	update: function () {

	},

	render: function () {



	}
 });
