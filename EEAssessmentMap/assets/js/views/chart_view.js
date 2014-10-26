var ChartView = Backbone.View.extend({
	el: $('#hours-chart'),


	initialize: function () {
		this.model.on('change:infoData', this.render, this);
	},

	render: function() {
		var self = this;

		$('#hours-chart').highcharts({
			chart: {
				type: 'column'
			},
			colors: ['#006d2c'],
			credits: {
				enabled: false
			},
			legend: {
				enabled: false
			},
			series: [{
				data: self.model.get("infoData").chartValues
			}],
			title: {
				text: 'EE Hours by Grade'
			},
			tooltip: {
				formatter: function () {
					switch(this.x ) {
						case 'P': 
							return '<b>Preschool:</b> ' + this.y + ' hrs.';
							break;
						case 'K': 
							return '<b>Kindergarten:</b> ' + this.y + ' hrs.';
							break;
						case '1': 
							return '<b>1<sup>st</sup> Grade:</b> ' + this.y + ' hrs.';
							break;
						case '2': 
							return '<b>2<sup>nd</sup> Grade:</b> ' + this.y + ' hrs.';
							break;
						case '3': 
							return '<b>3<sup>rd</sup> Grade:</b> ' + this.y + ' hrs.';
							break;
						default:
							return '<b>' + this.x + '<sup>th</sup> Grade:</b> ' + this.y + ' hrs.';
					}
				}
			},
			xAxis: [{
				type: 'category',
				categories: self.model.get("infoData").chartCategories
			}],
			yAxis: [{
				title: {
					text: null
				}
			}]
		});
	}
})