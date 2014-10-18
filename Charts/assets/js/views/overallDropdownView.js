var SchoolDropdown = Backbone.View.extend({
	el: $('#school-dropdown'),

	events: {
		'change': 'updateSchool'
	},

	initialize: function () {
		this.render();
	},

	updateSchool: function () {
		var self = this;

		var theValue = $(self.el)[0].value;
		var schoolIndex = indexOfObject(self.model.get("schools"), 'val', theValue);
		self.model.set("schoolSelectedName", self.model.get("schools")[schoolIndex].label);
		self.model.set("schoolSelected", theValue);

	},

	render: function () {
		var self = this;

		// $(this.el).selectmenu({style: 'dropdown'}, { position: { my : "left bottom", at: "left top"}});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("schools"));
		$(self.el).html(html);
		$(self.el).val(self.model.get("schools")[0].val);
		// $(self.el).selectmenu("refresh");
		self.model.set("schoolSelected", $(self.el).val());
		self.model.set("schoolSelectedName", self.model.get("schools")[0].label);
	}
});

var FirstDropdown = Backbone.View.extend({
	el: $('#first-group-dropdown'),

	events: {
		'change': 'changeFirstFilter'
	},

	initialize: function () {
		this.render();
	},

	changeFirstFilter: function () {
		var self = this;

		self.model.set("firstFilter", $(self.el).value);
		console.dir($(self.el).value)
	},

	render: function () {
		var self = this;

		// $(this.el).selectmenu({style: 'dropdown'}, { position: { my : "left bottom", at: "left top"}});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("filterList"));
		$(self.el).html(html);
		$(self.el).val(self.model.get("filterList")[0].val);
		// $(self.el).selectmenu("refresh");

		self.model.set("firstFilter", $(self.el).val());
	}
});

var SecondDropdown = Backbone.View.extend({
	el: $('#second-group-dropdown'),

	events: {
		'change': 'changeSecondFilter'
	},

	initialize: function () {
		this.render();
	},

	changeSecondFilter: function () {
		var self = this;

		self.model.set("secondFilter", $(self.el).value);
	},

	render: function () {
		var self = this;

		//Remove first filter value from second filter list
		var firstFilterIndex;

		for (i in self.model.get("filterList")) {
			if (self.model.get("filterList")[i].value == self.model.get("firstFilter")) {
				firstFilterIndex = i;
			}
		}

		var secondFilterList = self.model.get("filterList");
		secondFilterList.splice(firstFilterIndex, 1);


		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(secondFilterList);
		$(self.el).html(html);
		$(self.el).val(secondFilterList[0].val);
		// $(self.el).selectmenu("refresh");
		self.model.set("secondFilter", $(self.el).val());
	}
});