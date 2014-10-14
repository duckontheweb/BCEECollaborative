window.onload = function() {
        	L.map('map', {
            layers: MQ.mapLayer(),
            center: [ 40.075, -105.2 ],
            zoom: 11});
            
            //need to create link to jQuery library & deal with potential permission issues, see stack overflow "Get a JSON file from URL and display"
            var elementarygrades = $.getJSON("http://www.duckontheweb.com/BCEECollaborative/elementary.json", function(data){
				alert(data);});
            
            
            elementarylayer = new L.geoJson(elementarygrades, {
				style: {"color": "#000000"}
//    			style: function (feature) {
//	   				var totEEHrs = feature.properties.eehrs_k + feature.properties.eehrs_1 + feature.properties.eehrs_2 + feature.properties.eehrs_3 + feature.properties.eehrs_4 + feature.properties.eehrs_5;
//        			return {color: getColor(totEEHRS)};
//    			},
    			
			}).addTo(map);
    	};
    	
function getColor(d) {
    return d > 128 ? '#006837' :
           d > 96  ? '#31a354' :
           d > 64  ? '#78c679' :
           d > 32  ? '#c2e699' :
           			 '#ffffcc' ;
}