/*
  Created: Jan 14 2018
  Author: Kahin Akram Hassan
*/

function sp(data){

    this.data = data;
    var div = '#scatter-plot';

    var height = 500;
    var parentWidth = $(div).parent().width();
    var margin = {top: 20, right: 20, bottom: 60, left: 40},
        width = parentWidth - margin.right - margin.left,
        height = height - margin.top - margin.bottom;

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var tooltip = d3.select(div).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var xColumn = "Household_income";
    var yColumn = "Life_satisfaction";
    var countryColumn = "Country";
    var circle_size = "Employment_rate";
    var rMin = 5;
    var rMax = 20;


    /* Task 2
      Initialize 4 (x,y,country,circle-size)
      variables and assign different data attributes from the data filter
      Then use domain() and extent to scale the axes

      x and y domain code here*/
    
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);
    xScale.domain([0,d3.max(data, function (d) { return d[xColumn] })]);
    yScale.domain([0,d3.max(data, function (d) { return d[yColumn] })]);

    var svg = d3.select(div).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    
        /* ~~ Task 3 Add the x and y Axis and title  ~~ */
    svg.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .text(xColumn)
        .call(d3.axisBottom(xScale));
    svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + 30) + ")")
        .style("text-anchor", "middle")
        .text(xColumn);

    svg.append("g")
        .attr("transform", "translate(0)")
        .text(yColumn)
        .call(d3.axisLeft(yScale));
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(yColumn);

    /* ~~ Task 4 Add the scatter dots. ~~ */
    var circles = svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "non_brushed")
        .attr("cx", function (d) { return xScale(d[xColumn]); })
        .attr("cy", function (d) { return yScale(d[yColumn]); })
        .attr("r", function (d) { return d[circle_size] / 5 })
        .style("fill", "none")
        .style("stroke", function (d) { return color(d[countryColumn]); })
        .style("stroke-width", 5); 
        

    /* ~~ Task 5 create the brush variable and call highlightBrushedCircles() ~~ */
    svg.append("g")
        .attr("class", "brush")
        .call(d3.brush()
            .extent([[0, 0], [width, height]])
            .on("end", highlightBrushedCircles));

         //highlightBrushedCircles function
         function highlightBrushedCircles() {
             if (d3.event.selection != null) {
                 // revert circles to initial style
                 circles.attr("class", "non_brushed");
                 var brush_coords = d3.brushSelection(this);
                 // style brushed circles
                   circles.filter(function (){
                            var cx = d3.select(this).attr("cx");
                            var cy = d3.select(this).attr("cy");
                            return isBrushed(brush_coords, cx, cy);
                  })
                  .attr("class", "brushed");
                   var d_brushed =  d3.selectAll(".brushed").data();


                   /* ~~~ Call pc or/and map function to filter ~~~ */

             }
         }//highlightBrushedCircles
         function isBrushed(brush_coords, cx, cy) {
              var x0 = brush_coords[0][0],
                  x1 = brush_coords[1][0],
                  y0 = brush_coords[0][1],
                  y1 = brush_coords[1][1];
             return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
         }//isBrushed



         //Select all the dots filtered
         this.selecDots = function(value){

         };


}//End
