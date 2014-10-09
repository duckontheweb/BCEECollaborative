//chartView.js


var ChartView = Backbone.View.extend({

	el: $('#chart'),

	initialize: function () {
		this.prepdata();
		this.model.on('change:grade', this.update, this);
		this.render()
	},

	prepdata: function () {
		var self = this;

		self.model.set("chartValues", dataObject[self.model.get("gradeCurrent")])
	},

	update: function () {

	},

	render: function () {
		var self = this;

		console.log("categories")
		console.dir(self.model.get("chartCategories"));
		console.log("values")
		console.dir(self.model.get("chartValues"));

		var chart = $(self.el).highcharts({
			chart: {
				type: 'column'
			},

			title: {
				text: 'Grade: ' + self.model.get("gradeCurrent")
			},

			xAxis: {
				categories: self.model.get("chartCategories"),
				title: {
					text: 'Program Length'
				},
				type: 'category',
				labels: {
					enabled: true
				}
			},

			yAxis: {
				title: {
					text: 'Number of Hours Delivered'
				},
				stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            },
	            max: self.model.get("yAxisMax")
			},

			plotOptions: {
				column: {
					stacking: 'normal'
				}
			},

			series: self.model.get("chartValues"),

			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + ':</b> ' + this.y + ' hrs.' + ' (<em>' + 
						((this.y/this.total)*100).toFixed(1) + '%</em>)<br/><b>Total Hrs.:</b> ' + this.total;
				}
			}
		})

	}
 });
