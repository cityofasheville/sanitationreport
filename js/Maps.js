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
              // On success add fetched data to the map.
              var featureLayer = L.mapbox.featureLayer(geojson).addTo(map);
          }
        });      
      

        map.featureLayer.on('mouseover', function(e) {
            e.layer.openPopup();
        });
        map.featureLayer.on('mouseout', function(e) {
            e.layer.closePopup();
        });


	};


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
              var feat = L.mapbox.featureLayer(geojson).addTo(map);
              map.fitBounds(feat.getBounds());
              
          }
        });      
      

	};