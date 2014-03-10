
function renderChart(file,htmlid,label,value,mapid) {


  //var htmlid = htmlid;
  //var label = label;
  //var value = value;

  d3.text(file,function(error, _data){


            var w = $( "#"+htmlid ).width();
            var h = 250;

            var data = d3.csv.parse(_data);
            var dataset = d3.csv.parse(_data);

            var xScale = d3.scale.ordinal()
                    .domain(d3.range(dataset.length))
                    .rangeRoundBands([0, w], 0.05); 

            var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) {return d[value];})])
                    .range([0, h]);

            var key = function(d) {
              return d[label];
            };

            //Create SVG element
            var svg = d3.select("#"+htmlid)
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

            //Create bars
            svg.selectAll("rect")
               .data(dataset, key)
               .enter()
               .append("rect")
               .attr("x", function(d, i) {
                return xScale(i);
               })
               .attr("y", function(d) {
                return h - yScale(d[value]);
               })
               .attr("width", xScale.rangeBand())
               .attr("height", function(d) {
                return yScale(d[value]);
               })
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
                                  '#FFEDA0';
                           })

              //Tooltip
              .on("mouseover", function(d) {
                 //alert(d[label] )
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
                var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                //Update Tooltip Position & value
                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px")
                  .select("#value")
                  .text(d[value]);
                d3.select("#tooltip").classed("hidden", false)
              })
              .on("mouseout", function() {
                //Remove the tooltip
                d3.select("#tooltip").classed("hidden", true);
     
              })  ;

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