//dropdownView.js

var DropdownView = Backbone.View.extend({
	el: $('#valVar'),

	events: {
		'selectmenuchange': 'changeGrade'
	},

	initialize: function () {
		this.render();
	},

	changeGrade: function (event, ui) {
		var self = this;
		self.model.set("gradeCurrent", ui.item.label);
	},

	render: function () {
		var self = this;
		$(this.el).selectmenu({style: 'dropdown'});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(this.model.get("gradesList"));
		$(this.el).html(html);
		$(this.el).val(self.model.get("gradeCurrent"));
		$(this.el).selectmenu('refresh', true);
	}
});
