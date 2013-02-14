var map;

$(document).ready(function() {
	var resize = function () {
		var $map = $('#map');
		
		$map.height($(window).height() - $('div.navbar').outerHeight());
		
		if (map) {
			map.invalidateSize();
		}
	};
	
	$(window).on('resize', function () {
		resize();
	});
	
	resize();
	
	map = L.map('map').setView([0.0, 0.0], 2);
	
	// add a CloudMade tile layer with style #997
	L.tileLayer('http://{s}.tile.cloudmade.com/82e1a1bab27244f0ab6a3dd1770f7d11/997/256/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery � <a href="http://cloudmade.com">CloudMade</a>'
	}).addTo(map);
	
	var marker;
	var layer;
	
	var getCenterLatLng = function () {
		return new L.LatLng(Math.random() * 179 - 89,Math.random() * 359 - 179);
	};
	
	var triangle = new L.TriangleMarker(new L.LatLng(0,0), {
		radius: 20,
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9,
		color: '#000000',
		fillColor: 'hsl(0, 100%, 50%)'
	});
	
	var square = new L.SquareMarker(new L.LatLng(0,5), {
		radius: 20,
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9,
		color: '#000000',
		fillColor: 'hsl(30, 100%, 50%)'
	});
	
	var pentagon = new L.RegularPolygonMarker(new L.LatLng(0,10), {
		radius: 20,
		numberOfSides: 5,
		rotation: -18,
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9,
		color: '#000000',
		fillColor: 'hsl(60, 100%, 50%)'
	});
	
	var hexagon = new L.RegularPolygonMarker(new L.LatLng(0,15), {
		radius: 20,
		numberOfSides: 6,
		rotation: 0,
		weight: 1,
		opacity: 1,
		fillOpacity: 0.9,
		color: '#000000',
		fillColor: 'hsl(90, 100%, 50%)'
	});
	
	map.addLayer(triangle);
	map.addLayer(square);
	map.addLayer(pentagon);
	map.addLayer(hexagon);
	
	for (var index = 0;index < 20;++index) {
		var centerLatLng = getCenterLatLng();
		var numberOfSides = Math.floor((Math.random() * 5) + 3);
		var radiusX = Math.floor(Math.random() * 20) + 5;
		var radiusY = radiusX; //Math.floor(Math.random() * 20);
		var colorValue = index * 3.6;
		
		var options = {
			color: '#000',
			weight: 1,
			fillColor: 'hsl(' + colorValue + ',100%,50%)',
			radiusX: radiusX,
			radiusY: radiusY,
			fillOpacity: 0.7,
			//numberOfSides: numberOfSides,
			rotation: 0.0,
			//barThickness: 6,
			position: {
				x: 0,
				y: 0
			},
			offset: 0
		};
		
		var meterMarkerOptions = {
			data: {
				'Speed': 200
			},
			chartOptions: {
				'Speed': {
					displayName: 'Speed',
					displayText: function (value) {
						return value.toFixed(1);
					},
					color: 'hsl(240,100%,55%)',
					fillColor: 'hsl(240,80%,55%)',
					maxValue: 200,
					minValue: 0
				}
			},
			displayOptions: {
				'Speed': {
					color: new L.HSLHueFunction(new L.Point(0,120), new L.Point(200,0), {outputSaturation: '100%', outputLuminosity: '25%'}),
					fillColor: new L.HSLHueFunction(new L.Point(0,120), new L.Point(200,0), {outputSaturation: '100%', outputLuminosity: '50%'})
				}
			},
			fillOpacity: 0.8,
			opacity: 1,
			weight: 0.5,
			radius: 30,
			barThickness: 15,
			maxDegrees: 360,
			rotation: 0,
			numSegments: 10
		};
		
		meterMarkerOptions.data['Speed'] = Math.random() * 200;
		
		var testMeter = new L.RadialMeterMarker(centerLatLng, meterMarkerOptions);
		
		map.addLayer(testMeter);
		
		options.innerRadius = radiusX - 8;
		options.rotation = 55;
		
		centerLatLng = getCenterLatLng();
		
		marker = new L.StarMarker(centerLatLng,options);
		map.addLayer(marker);
		
		options.numberOfSides = Math.floor((Math.random() * 5) + 3);
		
		centerLatLng = getCenterLatLng();

		options.rotation = Math.random() * 360;
		
		marker = new L.RegularPolygonMarker(centerLatLng,options);

		map.addLayer(marker);
		
		options.numberOfSides = 50;
		options.width = 10;
		
		options.rotation = 0;
		options.data = {
			'dataPoint1': Math.random() * 20,
			'dataPoint2': Math.random() * 20,
			'dataPoint3': Math.random() * 20,
			'dataPoint4': Math.random() * 20
		};
		
		options.chartOptions = {
			'dataPoint1': {
				fillColor: '#FEE5D9',
				minValue: 0,
				maxValue: 20,
				maxHeight: 20,
				displayText: function (value) {
					return value.toFixed(2);
				}
			},
			'dataPoint2': {
				fillColor: '#FCAE91',
				minValue: 0,
				maxValue: 20,
				maxHeight: 20,
				displayText: function (value) {
					return value.toFixed(2);
				}
			},
			'dataPoint3': {
				fillColor: '#FB6A4A',
				minValue: 0,
				maxValue: 20,
				maxHeight: 20,
				displayText: function (value) {
					return value.toFixed(2);
				}
			},
			'dataPoint4': {
				fillColor: '#CB181D',
				minValue: 0,
				maxValue: 20,
				maxHeight: 20,
				displayText: function (value) {
					return value.toFixed(2);
				}
			}
		};
		
		//options.maxDegrees = 180.0;
		
		centerLatLng = getCenterLatLng();
		
		marker = new L.RadialBarChartMarker(centerLatLng,options);
		
		map.addLayer(marker);
		
		centerLatLng = getCenterLatLng();
		
		options.chartOptions['dataPoint1'].fillColor = '#EDF8FB';
		options.chartOptions['dataPoint2'].fillColor = '#B2E2E2';
		options.chartOptions['dataPoint3'].fillColor = '#66C2A4';
		options.chartOptions['dataPoint4'].fillColor = '#238B45';
		
		marker = new L.CoxcombChartMarker(centerLatLng,options);
		
		map.addLayer(marker);
		
		centerLatLng = getCenterLatLng();
		
		options.barThickness = 6;

		options.chartOptions['dataPoint1'].fillColor = '#F1EEF6';
		options.chartOptions['dataPoint2'].fillColor = '#BDC9E1';
		options.chartOptions['dataPoint3'].fillColor = '#74A9CF';
		options.chartOptions['dataPoint4'].fillColor = '#0570B0';
		
		marker = new L.PieChartMarker(centerLatLng,options);
		
		map.addLayer(marker);
		
		centerLatLng = getCenterLatLng();
		
		options.width = 8;
		options.weight = 1;
		
		options.chartOptions['dataPoint1'].fillColor = '#F2F0F7';
		options.chartOptions['dataPoint2'].fillColor = '#CBC9E2';
		options.chartOptions['dataPoint3'].fillColor = '#9E9AC8';
		options.chartOptions['dataPoint4'].fillColor = '#6A51A3';
		
		marker = new L.BarChartMarker(centerLatLng, options);
		
		map.addLayer(marker);
		
	}
});