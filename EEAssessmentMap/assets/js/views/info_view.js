// info_view

var InfoView = Backbone.View.extend({
	el: $('#info-box'),

	initialize: function () {
		this.render();
		this.model.on('change:hoverSchool', this.updateHeader, this);
		this.model.on('change:hoverDistrict', this.updateDistrict, this);
		this.model.on('change:totalStudents', this.updateStudentTotal, this);
		this.model.on('change:percentFRL', this.updateFRL, this);
		// this.model.on('change:percentPOC', this.updatePOC, this);
		// this.model.on('change:totalEE', this.updateTotalEE, this);
	},

	updateHeader: function () {
		var self = this;
		if (self.model.get("hoverSchool") != '') {
			$('#info-header').html('<h2>' + self.model.get("hoverSchool") + '</h2>')
				.removeClass('unselected')
				.addClass('selected');
		} else {
			$('#info-header').html('<h2>Hover over school for more information...</h2>')
				.removeClass('selected')
				.addClass('unselected');
		}
	},

	updateDistrict: function () {
		var self = this;
		if (self.model.get("hoverDistrict") != '') {
			$('#district-name').html('<h4>' + self.model.get("hoverDistrict") + '<h4>');
		} else {
			$('#district-name').html('');
		}
	},

	updateStudentTotal: function () {
		var self = this;
		if (self.model.get("hoverSchool") != '') {
			$('#total-students').html('<b>Total Students:</b> ' + self.model.get("totalStudents"))
				.addClass('info-selected');
		} else {
			$('#total-students').html('')
				.removeClass('info-selected');
		}
	},

	updateFRL: function () {
		var self = this;
		if (self.model.get("hoverSchool") != '') {
			$('#per-free-reduced').html('<b>Percent FRL:</b> ' + Math.round(self.model.get("percentFRL") * 100) + '%')
				.addClass('info-selected');
		} else {
			$('#per-free-reduced').html('')
				.removeClass('info-selected');
		}
	},

	render: function () {
		var self = this;

		$('#info-header').html('<h2>Hover over school for more information...</h2>');
		$('#info-header').addClass('unselected')
		
		// console.dir($(self.el));
	}
})