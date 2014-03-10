
function renderMap(file,htmlid){

      var url = file;

      var map = L.mapbox.map(htmlid, 'daveism.map-swo7he4y')
            .setView([35.55,-82.5495], 10);

       $.ajax({
          headers: {
            'Accept': 'application/vnd.github.v3.raw'
          },
          dataType: 'json',
          url: url,
          success: function(geojson) {

             feat = L.geoJson(geojson, {style: style}).addTo(map);
             map.fitBounds(feat.getBounds());

              // On success add fetched data to the map.
              //var featureLayer = L.mapbox.featureLayer(geojson,{on:  function() { alert('Clicked on a group!'); }}).addTo(map);


             feat.eachLayer(function(layer) {

                  //here you call `bindPopup` with a string of HTML you create - the feature
                  //properties declared above are available under `layer.feature.properties`

                 // var content = '<h1>Pickup Day: ' + layer.feature.properties.theday + '<\/h1>' +
                 //     '<h2>Hours: ' + ((layer.feature.properties.prediction/60)/60).toFixed(2).toString() + '<\/h2>' +
                 //     '<h2>Hours for 6 Trucks: ' + (((layer.feature.properties.prediction/60)/60)/6).toFixed(2).toString() + '<\/h2>' +
                 //     '<h2>Number of Cans: ' + layer.feature.properties.cans + '<\/h2>';;
                 // layer.bindPopup(content);
             });


          }
        });      
      


	};

function onEachFeature(feature, layer) {
    layer.on({
        click: zoomToFeature
    });
}



	function renderSubMap(file,htmlid){

      var url = file;

      var map = L.mapbox.map(htmlid, 'daveism.map-swo7he4y')
            .setView([35.55,-82.5495], 11);

       $.ajax({
          headers: {
            'Accept': 'application/vnd.github.v3.raw'
          },
          dataType: 'json',
          url: url,
          success: function(geojson) {
              // On success add fetched data to the map.
             feat = L.geoJson(geojson, {style: styletruck}).addTo(map);
             map.fitBounds(feat.getBounds());
              
          }
        });      
      

	};

function zoomToFeature(e) {
    alert(  e.target.getBounds()  )
    map.fitBounds(e.target.getBounds());
}

  function getColor(d) {
    return d == 'MONDAY' ? '#e41a1c' :
           d == 'TUESDAY' ? '#377eb8' :
           d == 'WEDNESDAY'  ? '#4daf4a' :
           d == 'THRUSDAY'  ? '#a65628' :
           d == 'TRUCK 1' ? '#e41a1c' :
           d == 'TRUCK 2' ? '#377eb8' :
           d == 'TRUCK 3'  ? '#4daf4a' :
           d == 'TRUCK 4'  ? '#ff7f00' :
           d == 'TRUCK 5'  ? '#984ea3' :
           d == 'TRUCK 6'  ? '#a65628' :
                      '#FFEDA0';
}

function style(feature) {
    
    return {
        fillColor: getColor(feature.properties.theday),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };

}

    function styletruck(feature) {
    
    return {
        fillColor: getColor(feature.properties.thetruck),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }