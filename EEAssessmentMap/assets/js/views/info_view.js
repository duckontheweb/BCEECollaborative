// info_view

var InfoView = Backbone.View.extend({
	el: $('#info-box'),

	initialize: function () {
		this.render();
		this.model.on('change:infoData', this.updateFields, this);
	},

	updateFields: function () {
		var self = this;
		var info = self.model.get("infoData");
		$('#info-header').html('<h4 id="school-name">' + info.school + '</h4> <h5 id="district-name">' + info.district + '</h5>')
		$('#info-header').removeClass('unselected');
		$('#info-header').addClass('selected');

		$('#total-students-value').html(info.totalStudents);
		$('#per-free-reduced-value').html(Math.round(info.percentFRL*100) + '%');
		$('#per-people-color-value').html(Math.round(info.percentPOC*100) + '%');
		$('#total-ee-value').html(Math.round(info.totalEEHours));
	},

	render: function () {
		var self = this;

		$('#info-header').html('<div id="default-text">Click on school for more information...</div>');
		$('#info-header').addClass('unselected')
		
	}
})