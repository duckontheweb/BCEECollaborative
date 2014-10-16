var SchoolDropdown = Backbone.View.extend({
	el: $('#school-dropdown'),

	initialize: function () {
		this.render();
	},

	render: function () {
		var self = this;
		$(self.el).selectmenu();
	}
})