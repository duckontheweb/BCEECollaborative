var SchoolDropdown = Backbone.View.extend({
	el: $('#school-dropdown'),

	initialize: function () {
		this.render();
	},

	render: function () {
		var self = this;

		// $(this.el).selectmenu({style: 'dropdown'}, { position: { my : "left bottom", at: "left top"}});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("schools"));
		$(this.el).html(html);
		// $(this.el).val(self.model.get("schools"));
		// $(this.el).selectmenu('refresh', true);
	}
});

var FirstDropdown = Backbone.View.extend({
	el: $('#first-group-dropdown'),

	initialize: function () {
		this.render();
		this.on('selectmenuchange', this.changeFirstFilter(), this);

	},

	changeFirstFilter: function () {
		var self = this;

		// self.model.set("firstFilter", )
	},

	render: function () {
		var self = this;
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("filterList"));
		$(this.el).html(html);
		// $(this.el).val(self.model.get("schools"));

		self.model.set("firstFilter", $(self.el).val());
		console.log(self.model.get("firstFilter"));
	}
});