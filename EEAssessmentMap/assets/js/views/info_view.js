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

		if ($('#info-box').hasClass('info-inactive')) {
			
			$('#info-box').removeClass('info-inactive');
			$('#info-box').addClass('info-active');

			setTimeout(function () {
				$('#info-header').html('<div id="default-text"></div>');
				$('#hours-chart').before(
				'<div id="basic-stats">' +
				'<div class="school-info-element school-info-odd" id="total-students"> <div class="field-title">Total Students:</div> <div class="field-value" id="total-students-value"></div> </div>' + 
				'<div class="school-info-element school-info-even" id="per-free-reduced"> <div class="field-title">Percent Free/Reduced Lunch:</div> <div class="field-value" id="per-free-reduced-value"></div> </div>' + 
				'<div class="school-info-element school-info-odd" id="per-people-color"> <div class="field-title">Percent People of Color:</div> <div class="field-value" id="per-people-color-value"></div> </div>' + 
				'<div class="school-info-element school-info-even school-info-last" id="total-ee"> <div class="field-title">Total Hours of Env. Education:</div> <div class="field-value" id="total-ee-value"></div> </div>' +
				'</div>'
				)}
				, 600);

		}
		setTimeout(function() {
			$('#info-header').html('<h4 id="school-name">' + info.school + '</h4> <h5 id="district-name">' + info.district + '</h5>')
			$('#info-header').removeClass('unselected');
			$('#info-header').addClass('selected');

			$('#total-students-value').html(info.totalStudents);
			$('#per-free-reduced-value').html(Math.round(info.percentFRL*100) + '%');
			$('#per-people-color-value').html(Math.round(info.percentPOC*100) + '%');
			$('#total-ee-value').html(Math.round(info.totalEEHours));
		}, 600);
	},

	render: function () {
		var self = this;

		
		$('#info-header').addClass('unselected')
		
	}
})