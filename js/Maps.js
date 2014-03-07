function renderMap(file,htmlid){

      var url = file;

      var map = L.mapbox.map(htmlid, 'examples.map-9ijuk24y')
            .setView([35.55,-82.5495], 10);

       $.ajax({
          headers: {
            'Accept': 'application/vnd.github.v3.raw'
          },
          dataType: 'json',
          url: url,
          success: function(geojson) {
              // On success add fetched data to the map.
              L.mapbox.featureLayer(geojson).addTo(map);
          }
        });      
      

        map.featureLayer.on('mouseover', function(e) {
            e.layer.openPopup();
        });
        map.featureLayer.on('mouseout', function(e) {
            e.layer.closePopup();
        });


	};