


function renderMap(file,htmlid,dataid){

      var url = file;

      var map = L.mapbox.map(htmlid, 'daveism.map-swo7he4y')
            .setView([35.55,-82.5495], 10);
      var polyindex = 0;

      function mapToTreeIds(feature){
        return feature.properties.htmlid;
      }

      $.ajax({
          headers: {
            'Accept': 'application/vnd.github.v3.raw'
          },
          dataType: 'json',
          url: url,
          success: function(geojson) {

             feat = L.geoJson(geojson, {style: style, onEachFeature: onEachFeature }).addTo(map);
             map.fitBounds(feat.getBounds());
             for (each in feat._layers) {
               //var name = feat._layers[each].feature.properties.theday;
               //var swLat = feat._layers[each].getBounds()._southWest.lat;
               //var swLng = feat._layers[each].getBounds()._southWest.lng;
               //var neLat = feat._layers[each].getBounds()._northEast.lat;
               //var neLng = feat._layers[each].getBounds()._northEast.lng;
               //var bbox = name+"-"+swLat + "," + swLng + "," + neLat + "," + neLng+"\n";

              //$("#highlight"+dataid).append(bbox.toString())
              //feat.className = "id_"+feat._layers[each].feature.properties.theday+"_"+htmlid
             }

              // On success add fetched data to the map.
              //var featureLayer = L.mapbox.featureLayer(geojson,{on:  function() { alert('Clicked on a group!'); }}).addTo(map);


            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                    //hover: highLightChart
                });
            }


            //function highLightChart(e){
            //    alert('here')
            //    $( "#id_MONDAY" ).trigger( "mouseenter" );
            //}

            function highlightFeature(e) {
                var layer = e.target;
                displayValues(layer);
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });

               // var c= $( "rect#id_MONDAY" );
               //c.stroke('#666');

                //$( "rect#id_MONDAY" ).trigger( "click",function(d){ alert(d3.select(this).attr('id') ) } );
                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            }
            function h(layer){
                displayValues(layer);
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });

                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }              
            }

            function resetHighlight(e) {
                var layer = e.target;
                restValues(layer);
                layer.setStyle({
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                });

            }   

            function displayValues(layer){
              
              $("#tt"+dataid).html( ((layer.feature.properties.prediction/60)/60).toFixed(2).toString() );
              $("#c"+dataid).html( layer.feature.properties.cans );
              $("#ttt"+dataid).html( (((layer.feature.properties.prediction/60)/60)/6).toFixed(2).toString() );   
               
            }

            function restValues(layer){
              
              $("#tt"+dataid).html('' );
              $("#c"+dataid).html( '' );
              $("#ttt"+dataid).html( '' );   
            }


            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
                displayValues( e.target);
            }



          }
        });      
      


	};




	function renderSubMap(file,htmlid,dataid){

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
             feat = L.geoJson(geojson, {style: styletruck, onEachFeature: onEachFeature}).addTo(map);
             map.fitBounds(feat.getBounds());

         function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }


            function highlightFeature(e) {
                var layer = e.target;
                displayValues(layer);
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });

                if (!L.Browser.ie && !L.Browser.opera) {
                    layer.bringToFront();
                }
            }

            function resetHighlight(e) {
                var layer = e.target;
                restValues(layer);
                layer.setStyle({
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                });

            }   


            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
                var layer = e.target;
                displayValues( e.target);
            }

            function displayValues(layer){
              
              $("#tt"+dataid).html( ((layer.feature.properties.prediction/60)/60).toFixed(2).toString() );
              $("#c"+dataid).html( layer.feature.properties.cans );
              
            }

            function restValues(layer){
              
              $("#tt"+dataid).html('' );
              $("#c"+dataid).html( '' );
              $("#ttt"+dataid).html( '' );   
            }


          }

        });      
      

	};



  function getColor(d) {
    return d == 'MONDAY' ? '#e41a1c' :
           d == 'TUESDAY' ? '#377eb8' :
           d == 'WEDNESDAY'  ? '#4daf4a' :
           d == 'THURSDAY'  ? '#a65628' :
           d == 'TRUCK 1' ? '#e41a1c' :
           d == 'TRUCK 2' ? '#377eb8' :
           d == 'TRUCK 3'  ? '#4daf4a' :
           d == 'TRUCK 4'  ? '#ff7f00' :
           d == 'TRUCK 5'  ? '#984ea3' :
           d == 'TRUCK 6'  ? '#a65628' :
                      '#FFEDA0';
}



function style(feature,htmlid) {
    
    return {
        fillColor: getColor(feature.properties.theday),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
        id: "id_"+feature.properties.theday 
    };

}

    function styletruck(feature) {
    
    return {
        fillColor: getColor(feature.properties.thetruck),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
  }