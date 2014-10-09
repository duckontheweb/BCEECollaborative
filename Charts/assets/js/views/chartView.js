//chartView.js


var ChartView = Backbone.View.extend({

	el: $('#chart'),

	initialize: function () {
		this.prepdata();
		this.model.on('change:gradeCurrent', this.prepdata, this);
		this.model.on('change:chartValues', this.update, this);
		this.render()
	},

	prepdata: function () {
		var self = this;
		var grade = self.model.get("gradeCurrent");
		//self.model.set("yAxisMax", self.model.get("allData")[grade].max);
		self.model.set("chartValues", self.model.get("allData")[grade]['data']);
		console.dir(self.model.get("yAxisMax"));
	},

	update: function () {
		var self = this;

		var chartOptions = $(self.el).highcharts().options
		var seriesUpdate = self.model.get("chartValues");
		var maxUpdate = self.model.get("yAxisMax");
		chartOptions.series = seriesUpdate;
		//chartOptions.yAxis.max = maxUpdate;
		console.dir(chartOptions.yAxis.max);
		

		$(self.el).highcharts().destroy();
		$(self.el).highcharts(chartOptions);
	},

	render: function () {
		var self = this;

		var chart = $(self.el).highcharts({
			chart: {
				type: 'column'
			},

			title: {
				text: null
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
	            max: 450
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
