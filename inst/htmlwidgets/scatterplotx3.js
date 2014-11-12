HTMLWidgets.widget(
{

  name: "scatterplotx3",
  type: "output",

  initialize: function(el, width, height)
  {
// global :(. This is global because I could only get x3dom to work
// by removing the x3d node completely and rebuilding it. Open to ideas
// on improving this!!!
    var dims = [parseInt(width)-2, parseInt(height)-2]
    x3d = d3.select(el).append("x3d")
        .style( "width", dims[0] + "px")
        .style( "height", dims[1] + "px");
    return dims;
  },

  resize: function(el, width, height, dims)
  {
    dims = [parseInt(width)-2, parseInt(height)-2]
    x3d.style( "width", dims[0] + "px")
       .style( "height", dims[1] + "px");
  },

  renderValue: function(el, x, dims)
  {
    d3.select("#x3dom").selectAll("*").remove(); // a bit Draconian!
    x3d = d3.select(el).append("x3d")
        .style( "width", dims[0] + "px")
        .style( "height", dims[1] + "px")

    // x is a list with two elements, options and data.
    // data is expected to be a JSON array of data points
    // with labeled x,y,z coordinates.
    // options include all the R function arguments

    // Create an x3dom scene
    var scene = x3d.append("scene")
                   .attr("class", "scenery");

    scene.append("orthoviewpoint")
         .attr( "centerOfRotation", [5, 5, 5])
         .attr( "orientation", [-0.5, 1, 0.2, 1.12*Math.PI/4])
         .attr( "fieldOfView", [-5, -5, 15, 15])
         .attr( "position", [5, 5, 15])

    var axisKeys = x.options.key;
    var rows = JSON.parse(x.data);
// Extent of the x,y,z data:
    var ext = [d3.extent(rows,function(a){return a[axisKeys[0]];}),
               d3.extent(rows,function(a){return a[axisKeys[1]];}),
               d3.extent(rows,function(a){return a[axisKeys[2]];})]

    var axisRange = [0, 10]; // fixed linear scale (see below)
    var scales = [];

    // Helper functions for initializeAxis() and drawAxis()
    function axisName( name, axisIndex )
    {
      return ['x','y','z'][axisIndex] + name;
    }

    function constVecWithAxisValue( otherValue, axisValue, axisIndex )
    {
      var result = [otherValue, otherValue, otherValue];
      result[axisIndex] = axisValue;
      return result;
    }

    // Used to make 2d elements visible
    function makeSolid(selection, color)
    {
      selection.append("appearance")
        .append("material")
           .attr("diffuseColor", color||"black")
      return selection;
    }

    // Initialize the axes lines and labels.
    function initializeAxis( axisIndex, ext)
    {
      var key = axisKeys[axisIndex];
      drawAxis( axisIndex, key, ext);

      var scaleMin = axisRange[0];
      var scaleMax = axisRange[1];

      // the axis line
      var newAxisLine = scene.append("transform")
           .attr("class", axisName("Axis", axisIndex))
           .attr("rotation", ([[0,0,0,0],[0,0,1,Math.PI/2],[0,1,0,-Math.PI/2]][axisIndex]))
           .append("shape")
           .call(makeSolid)
      newAxisLine
        .append("polyline2d")
         // Line drawn along y axis does not render in Firefox, so draw one
         // along the x axis instead and rotate it (above).
        .attr("lineSegments", "0 0," + scaleMax + " 0")

      // axis labels
      var newAxisLabel = scene.append("transform")
        .attr("class", axisName("AxisLabel", axisIndex))
        .attr("translation", constVecWithAxisValue( 0, scaleMin + 1.1 * (scaleMax-scaleMin), axisIndex ))
      var newAxisLabelShape = newAxisLabel
          .append("billboard")
          .attr("axisOfRotation", "0 0 0") // face viewer
          .append("shape")
          .call(makeSolid)
       newAxisLabelShape
         .append("text")
         .attr("class", axisName("AxisLabelText", axisIndex))
         .attr("solid", "true")
         .attr("string", key)
       .append("fontstyle")
         .attr("size", 0.8)
         .attr("justify", "END MIDDLE" )
         .attr("family", "SANS")
    }

    // Assign key to axis, creating or updating its ticks, grid lines, and labels.
    function drawAxis( axisIndex, key ,ext)
    {
      var scale = d3.scale.linear()
        .domain( ext[axisIndex] )
        .range( axisRange )

      scales[axisIndex] = scale;
      if(!x.options.axis) return;
      var numTicks = x.options.numticks[axisIndex];
      var tickSize = 0.1;

      // ticks along each axis
      var ticks = scene.selectAll( "."+axisName("Tick", axisIndex) )
           .data( scale.ticks( numTicks ));
      var newTicks = ticks.enter()
           .append("transform")
           .attr("class", axisName("Tick", axisIndex));
      newTicks.append("shape").call(makeSolid)
              .append("box")
              .attr("size", tickSize + " " + tickSize + " " + tickSize);
      // enter + update
      ticks.attr("translation", function(tick) { 
            return constVecWithAxisValue( 0, scale(tick), axisIndex ); })
      ticks.exit().remove();

      // tick labels
      var tickLabels = ticks.selectAll("billboard shape text")
            .data(function(d) { return [d]; });
      var newTickLabels = tickLabels.enter()
            .append("billboard")
            .attr("axisOfRotation", "0 0 0")     
            .append("shape")
            .call(makeSolid)
      newTickLabels.append("text")
        .attr("string", scale.tickFormat(10))
        .attr("solid", "true")
        .append("fontstyle")
        .attr("size", 0.8)
        .attr("family", "SANS")
        .attr("justify", "END MIDDLE" );
      tickLabels.exit().remove();

      // base grid lines
      if ((axisIndex==0 || axisIndex==2) && x.options.grid)
      {
        var gridLines = scene.selectAll( "."+axisName("GridLine", axisIndex))
             .data(scale.ticks( numTicks ));
        gridLines.exit().remove();
        var newGridLines = gridLines.enter()
              .append("transform")
              .attr("class", axisName("GridLine", axisIndex))
              .attr("rotation", axisIndex==0 ? [0,1,0, -Math.PI/2] : [0,0,0,0])
              .append("shape")

        newGridLines.append("appearance")
          .append("material")
          .attr("emissiveColor", "gray")

        newGridLines.append("polyline2d");
        gridLines.selectAll("shape polyline2d").transition().duration(0)
          .attr("lineSegments", "0 0, " + axisRange[1] + " 0")

        gridLines.transition().duration(0).attr("translation", axisIndex==0
            ? function(d) { return scale(d) + " 0 0"; }
            : function(d) { return "0 0 " + scale(d); }
          )
       }  
    }

    // plot the data points (spheres)
    function plotData()
    {
      if (!rows) {
       console.log("no rows to plot.")
       return;
      }

      var x = scales[0], y = scales[1], z = scales[2];
      var sphereRadius = 0.15;

      // Draw a sphere at each x,y,z coordinate.
      var datapoints = scene.selectAll(".datapoint").data( rows );
      datapoints.exit().remove()

      var newDatapoints = datapoints.enter()
           .append("transform")
           .attr("class", "datapoint")
           .attr("scale", [sphereRadius, sphereRadius, sphereRadius])
           .append("shape");
      newDatapoints
        .append("appearance")
        .append("material");
      newDatapoints
        .append("sphere")

// Trying to figure out how to add mouse-over tooltips. Anyone know how? XXX
      newDatapoints
        .append("svg:title").text(function(d){ return "This doesn't work :<";})

      datapoints.selectAll("shape appearance material")
        .attr("diffuseColor", function(row) {return row["color"];})

      datapoints.transition().ease("linear").duration(1)
        .attr("translation", function(row) {
          return x(row[axisKeys[0]]) + " " + y(row[axisKeys[1]]) + " " + z(row[axisKeys[2]])})
    }

    initializeAxis(0, ext);
    initializeAxis(1, ext);
    initializeAxis(2, ext);
    plotData();
    x3dom.reload();
  }
})
