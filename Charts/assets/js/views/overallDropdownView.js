var SchoolDropdown = Backbone.View.extend({
	el: $('#school-dropdown'),

	events: {
		'selectmenuchange': 'updateSchool'
	},

	initialize: function () {
		this.render();
	},

	updateSchool: function (event, ui) {
		var self = this;

		var theValue = ui.item.value;
		var schoolIndex = indexOfObject(self.model.get("schools"), 'val', theValue);
		self.model.set("schoolSelectedName", self.model.get("schools")[schoolIndex].label);
		self.model.set("schoolSelected", theValue);
	},

	render: function () {
		var self = this;

		$(this.el).selectmenu({style: 'dropdown'});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("schools"));
		$(self.el).html(html);
		$(self.el).val(self.model.get("schools")[0].val);
		$(self.el).selectmenu("refresh");
		self.model.set("schoolSelected", $(self.el).val());
		self.model.set("schoolSelectedName", self.model.get("schools")[0].label);
	}
});

var FirstDropdown = Backbone.View.extend({
	el: $('#first-group-dropdown'),

	events: {
		'selectmenuchange': 'updateFirstFilter'
	},

	initialize: function () {
		this.render();
	},

	updateFirstFilter: function (event, ui) {
		var self = this;

		self.model.set("firstFilter", ui.item.value);
	},

	render: function () {
		var self = this;

		$(this.el).selectmenu({style: 'dropdown'});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("firstFilterList"));
		$(self.el).html(html);
		$(self.el).val(self.model.get("firstFilterList")[0].val);
		$(self.el).selectmenu("refresh");
		self.model.set("firstFilter", $(self.el).val());
	}
});

var SecondDropdown = Backbone.View.extend({
	el: $('#second-group-dropdown'),

	events: {
		'selectmenuchange': 'changeSecondFilter'
	},

	initialize: function () {
		this.setOptions();
		this.model.on('change:firstFilter', this.setOptions, this);
		this.model.on('change:secondFilterList', this.render, this);
		this.render();
	},

	changeSecondFilter: function () {
		var self = this;

		// self.model.set("secondFilter", $(self.el).value);
	},

	setOptions: function() {
		var self = this;
		var firstFilterIndex;

		for (i in self.model.get("firstFilterList")) {
			if (self.model.get("firstFilterList")[i].val == self.model.get("firstFilter")) {
				firstFilterIndex = i;
			}
		}

		var secondFilterList = _(self.model.get("firstFilterList")).clone();

		secondFilterList.splice(firstFilterIndex, 1);
		self.model.set("secondFilterList", secondFilterList);
	},

	render: function () {
		var self = this;

		$(this.el).selectmenu({style: 'dropdown'});
		var source = $('#dropdown-template').html();
		var template = Handlebars.compile(source);
		var html = template(self.model.get("secondFilterList"));
		$(self.el).html(html);
		$(self.el).val(self.model.get("secondFilterList")[0].val);
		$(self.el).selectmenu("refresh");
		self.model.set("secondFilter", $(self.el).val());
	}
});