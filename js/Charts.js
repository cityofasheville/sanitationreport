
function renderChart(file,htmlid,label,value) {


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
                return "rgb(0, 0, " + (d[value] * 10) + ")";
               })

              //Tooltip
              .on("mouseover", function(d) {

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


           //  var sortOrder = false;
           //  var sortBars = function () {
           //      sortOrder = !sortOrder;

           //      sortItems = function (a, b) {
           //          if (sortOrder) {
           //              return a[value] - b[value];
           //          }
           //          return b[value] - a[value];
           //      };

           //      svg.selectAll("rect")
           //          .sort(sortItems)
           //          .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .attr("x", function (d, i) {
           //          return xScale(i);
           //      });

           //      svg.selectAll('text')
           //          .sort(sortItems)
           //          .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .text(function (d) {
           //          return d[value];
           //      })
           //          .attr("text-anchor", "middle")
           //          .attr("x", function (d, i) {
           //          return xScale(i) + xScale.rangeBand() / 2;
           //      })
           //          .attr("y", function (d) {
           //          return h - yScale(d[value]) + 14;
           //      });
           //  };
           //  // Add the onclick callback to the button
           // // d3.select("#sort").on("click", sortBars);
           // // d3.select("#reset").on("click", reset);
           //  function randomSort() {


           //    svg.selectAll("rect")
           //          .sort(sortItems)
           //          .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .attr("x", function (d, i) {
           //          return xScale(i);
           //      });

           //      svg.selectAll('text')
           //          .sort(sortItems)
           //          .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .text(function (d) {
           //          return d[value];
           //      })
           //          .attr("text-anchor", "middle")
           //          .attr("x", function (d, i) {
           //          return xScale(i) + xScale.rangeBand() / 2;
           //      })
           //          .attr("y", function (d) {
           //          return h - yScale(d[value]) + 14;
           //      });
           //  }
           //  function reset() {
           //    svg.selectAll("rect")
           //      .sort(function(a, b){
           //        return a[label] - b[label];
           //      })
           //      .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .attr("x", function (d, i) {
           //          return xScale(i);
           //      });

           //    svg.selectAll('text')
           //          .sort(function(a, b){
           //        return a[label] - b[label];
           //      })
           //          .transition()
           //          .delay(function (d, i) {
           //          return i * 50;
           //      })
           //          .duration(1000)
           //          .text(function (d) {
           //          return d[value];
           //      })
           //          .attr("text-anchor", "middle")
           //          .attr("x", function (d, i) {
           //          return xScale(i) + xScale.rangeBand() / 2;
           //      })
           //          .attr("y", function (d) {
           //          return h - yScale(d[value]) + 14;
           //      });
           //  };    


              // var valueLabelWidth = 40; // space reserved for value labels (right)
              // var barHeight = 20; // height of one bar
              // var barLabelWidth = 100; // space reserved for bar labels
              // var barLabelPadding = 5; // padding between bar and bar labels (left)
              // var gridLabelHeight = 18; // space reserved for gridline labels
              // var gridChartOffset = 3; // space between start of grid and first bar
              // var maxBarWidth = 420; // width of the bar with the max value
               
              // // accessor functions 
              // var barLabel = function(d) { return d[label]; };
              // var barValue = function(d) { return parseFloat(d[value]); };
             
              // // sorting
              // var sortedData = data.sort(function(a, b) {
              //  return d3.descending(barValue(a), barValue(b));
              // }); 

              // // scales
              // var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * barHeight]);
              // var y = function(d, i) { return yScale(i); };
              // var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
              // var x = d3.scale.linear().domain([0, d3.max(sortedData, barValue)]).range([0, maxBarWidth]);
              // // svg container element
              // var chart = d3.select('#'+htmlid).append("svg")
              //   .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
              //   .attr('height', gridLabelHeight + gridChartOffset + sortedData.length * barHeight);
              // // grid line labels
              // var gridContainer = chart.append('g')
              //   .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')'); 
              // gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
              //   .attr("x", x)
              //   .attr("dy", -3)
              //   .attr("text-anchor", "middle")
              //   .text(String);
              // // vertical grid lines
              // gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
              //   .attr("x1", x)
              //   .attr("x2", x)
              //   .attr("y1", 0)
              //   .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
              //   .style("stroke", "#ccc");
              // // bar labels
              // var labelsContainer = chart.append('g')
              //   .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
              // labelsContainer.selectAll('text').data(sortedData).enter().append('text')
              //   .attr('y', yText)
              //   .attr('stroke', 'none')
              //   .attr('fill', 'black')
              //   .attr("dy", ".35em") // vertical-align: middle
              //   .attr('text-anchor', 'end')
              //   .text(barLabel);
              // // bars
              // var barsContainer = chart.append('g')
              //   .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')'); 
              // barsContainer.selectAll("rect").data(sortedData).enter().append("rect")
              //   .attr('y', y)
              //   .attr('height', yScale.rangeBand())
              //   .attr('width', function(d) { return x(barValue(d)); })
              //   .attr('stroke', 'white')
              //   .attr('fill', 'steelblue');
              // // bar value labels
              // barsContainer.selectAll("text").data(sortedData).enter().append("text")
              //   .attr("x", function(d) { return x(barValue(d)); })
              //   .attr("y", yText)
              //   .attr("dx", 3) // padding-left
              //   .attr("dy", ".35em") // vertical-align: middle
              //   .attr("text-anchor", "start") // text-align: right
              //   .attr("fill", "black")
              //   .attr("stroke", "none")
              //   .text(function(d) { return d3.round(barValue(d), 2); });
              // // start line
              // barsContainer.append("line")
              //   .attr("y1", -gridChartOffset)
              //   .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
              //   .style("stroke", "#000");

          });
}