HTMLWidgets.widget({

  name: "hello",
  type: "output",

  initialize: function(el, width, height) {
    var x3d = d3.select(el).append("x3d")
        .style( "width", (parseInt(width)-2) + "px")
        .style( "height", (parseInt(height)-2) + "px");
    return x3d;
  },

  resize: function(el, width, height, x3d) {
    x3d.style( "width", (parseInt(width)-2) + "px")
       .style( "height", (parseInt(height)-2) + "px");
  },

  renderValue: function(el, x, x3d) {
    // x is a list with two elements, options and data.
    var scene = x3d.append("scene");

    var t = scene.append("transform")
         .attr("translation","0 0 0")
         .append("shape");
    t.append("appearance")
         .append("material")
         .attr("diffuseColor", "1 0 0");
    t.append("box");

    t = scene.append("transform")
         .attr("translation","-3 0 0")
         .append("shape");
    t.append("appearance")
         .append("material")
         .attr("diffuseColor", "0 1 0");
    t.append("cone");

    t = scene.append("transform")
         .attr("translation","3 0 0")
         .append("shape");
    t.append("appearance")
         .append("material")
         .attr("diffuseColor", "0 0 1");
    t.append("sphere");

    x3dom.reload();
  }
})
