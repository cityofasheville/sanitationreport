
function renderChart(file,htmlid,label,value,mapid) {


  //var htmlid = htmlid;
  //var label = label;
  //var value = value;
  var mapid = mapid

  d3.text(file,function(error, _data){


            var w = $( "#"+htmlid ).width();
            var h = 250; //$( "#"+htmlid ).height(); //250;
        
            var data = d3.csv.parse(_data);
            var dataset = d3.csv.parse(_data);

            var xScale = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05); 

            var max = d3.max(dataset, function(dataset) {return dataset[value];})

            var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) {return (d[value]);})])
                    .range([0, h]);
                    

            var key = function(d) {
              return d[label];
            };

            //Create SVG element
            var svg = d3.select("#"+htmlid)
                  .append("svg")
                  .attr("width", w)
                  //.attr("height", function(d) { return h - yScale(d.value); });
                  .attr("height",h);
                  //.attr("height", function(h) {return yScale(h);});

                  //.attr('viewBox','0 0 '+Math.min(w,h) +' '+Math.min(w,h) )
                  //.attr('preserveAspectRatio','xMinYMin')
                  //.append("g")
                  //.attr("transform", "translate(" + Math.min(w,h) / 2 + "," + Math.min(w,h) / 2 + ")");

            //Create bars
            svg.selectAll("rect")
               .data(dataset)
               .enter()
               .append("rect")
               .attr("id",  function(d) { return "id_"+d[label]})
               .attr("x", function(d, i) {return xScale(i);})
               .attr("width", xScale.rangeBand())
               .attr("y", function(d) {return  h-yScale(d[value]);})
               .attr("height", function(d) {return  yScale(d[value]);})
               .attr("fill", function(d) {
                 return d[label] == 'MONDAY' ? '#e41a1c' :
                       d[label] == 'TUESDAY' ? '#377eb8' :
                       d[label] == 'WEDNESDAY' ? '#4daf4a' :
                       d[label] == 'THURSDAY'  ? '#a65628' :
                       d[label] == 'TRUCK 1' ? '#e41a1c' :
                       d[label] == 'TRUCK 2' ? '#377eb8' :
                       d[label] == 'TRUCK 3'  ? '#4daf4a' :
                       d[label] == 'TRUCK 4'  ? '#ff7f00' :
                       d[label] == 'TRUCK 5'  ? '#984ea3' :
                       d[label] == 'TRUCK 6'  ? '#a65628' :
                       d[label] == 'April 2014' ? '#e41a1c' :
                       d[label] == 'February 2014' ? '#377eb8' :
                       d[label] == 'December 2013'  ? '#4daf4a' :
                       d[label] == 'November 2013'  ? '#ff7f00' :
                       d[label] == 'October 2013'  ? '#984ea3' :
                       d[label] == 'June 2013'  ? '#a65628' :
                                  '#377eb8';
                })


            //Create labels
            svg.selectAll("text.value")
               .data(dataset, key)
               .enter()
               .append("text")
               .text(function(d) {
                return d[value];
               })
               .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
               })
               .attr("y", function(d) {
                return h - yScale(d[value]) + 14;
               })
               .attr("font-family", "sans-serif") 
               .attr("font-size", "11px")
               .attr("fill", "white");

            //Create labels
            svg.selectAll("text.title")
               .data(dataset, key)
               .enter()
               .append("text")
               .text(function(d) {
                return d[label];
               })
               .attr("text-anchor", "middle")
               .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
               })
               .attr("y", function(d) {
                return (h+12) - yScale(d[value]) + 14;
               })
               .attr("font-family", "sans-serif") 
               .attr("font-size", "11px")
               .attr("fill", "white");

          });
}