function helloWorld()
{


  var seed = 1;
  function random() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
  }

  var rowName = rowHeader(data);

  rotateVar = guiControls.rotateVar3D;
  binNum = guiControls.binValue;
  radialVal = guiControls.radialValue;
  moveCradius = guiControls.radiusR;
  moveXCord = guiControls.xValue;
  moveYCord = guiControls.yValue;
  modeARC = guiControls.modeARC;
  startAng = guiControls.startAng;
  arcWidth = guiControls.arcWidth;


  var ss = 0;

  var datum = ObjtoArr(data);
/*
  if(document.getElementById('gbc').checked){
      ss = GBC(datum,rotateVar);
  }else if(document.getElementById('dgbc').checked){
      ss = DGBC(datum,rotateVar);
  }
*/
ss = GBC(datum,rotateVar);

  var x = d3.scale.linear()
    .domain([-1, 1]);

  var y = d3.scale.linear()
    .domain([-1, 1]);


  var row = ss.length;
  var col = ss[0].length;

  var newarr = [];
  for (var i = 0; i < row-4; i++) {
    newarr[i] = [];
    newarr[i][0] = ss[i][0];
    newarr[i][1] = ss[i][1];
  }

  var vararr = [];
  for (var i = row-4, j=0; i < row,j<4; i++,j++) {
    vararr[j] = [];
    vararr[j][0] = ss[i][0];
    vararr[j][1] = ss[i][1];
  }

  //var binNum = 25;

  var hist2d;
  hist2d = d3.hist2d()
    .bins(binNum)
    .indices([0, 1])
    .domain([x.domain(), y.domain()])
    (newarr, draw);

    var n = 0;
    var r = [];
    var filterdata = [];

  function draw(hist) {
  histN = hist;

  var P = [];
  var Q = [];
  var T = 0;
/*
  for (var i = 0; i < hist.length; i++) {
    if(hist[i].length > 500)
    {
        var P = [];
      while(P.length < 5*Math.log2(hist[i].length)){
        var rd = Math.floor(Math.random()*hist[i].length) + 1;
        if(P.indexOf(rd) > -1) continue;
        P[P.length] = rd;
        Q.push(hist[i][rd-1]);
      }
    }
    else if (hist[i].length < 500 & hist[i].length > 50) {
      var P = [];
      while(P.length < Math.log2(hist[i].length)){
        var rd = Math.floor(Math.random()*hist[i].length) + 1;
        if(P.indexOf(rd) > -1) continue;
        P[P.length] = rd;

        Q.push(hist[i][rd-1]);
      }
    }
    else {
        var P = [];
        while(P.length < hist[i].length/2){
        var rd = Math.floor(Math.random()*hist[i].length) + 1;
        if(P.indexOf(rd) > -1) continue;
        P[P.length] = rd;
        Q.push(hist[i][rd-1]);
      }
    }
  }
*/
for (var i = 0; i < hist.length; i++) {
  if(hist[i].length > 500)
  {
      var P = [];
    while(P.length < 5*Math.log2(hist[i].length)){
      var rd = Math.floor(random()*hist[i].length) + 1;
      if(P.indexOf(rd) > -1) continue;
      P[P.length] = rd;
      Q.push(hist[i][rd-1]);
    }
  }
  else if (hist[i].length < 500 & hist[i].length > 50) {
    var P = [];
    while(P.length < Math.log2(hist[i].length)){
      var rd = Math.floor(random()*hist[i].length) + 1;
      if(P.indexOf(rd) > -1) continue;
      P[P.length] = rd;

      Q.push(hist[i][rd-1]);
    }
  }
  else {
      var P = [];
      while(P.length < hist[i].length/2){
      var rd = Math.floor(random()*hist[i].length) + 1;
      if(P.indexOf(rd) > -1) continue;
      P[P.length] = rd;
      Q.push(hist[i][rd-1]);
    }
  }
}




  for (ij = 0,T; ij < 4; ij++,T++)
  {
    Q[T] = vararr[ij];
  }


  var m = (ss).length;

  var n = Object.keys(datum[0]).length;

  var varPoints = new Array();
  for (var i = 0; i < n; i++){
      varPoints.push(new Object());
    }


  for (var i = 0; i < n; i++) {
    varPoints[i].GBCX = ss[m-n+i][0];
    varPoints[i].GBCY = ss[m-n+i][1];
    varPoints[i].NAME = rowName[0][i];
  }

        let This = this;
        var colorSpaceWidth = 400;//document.getElementById(this.iconColorSpaceContainerId).clientWidth;
        var colorSpaceHeight = 400;//this.colorSpaceWidth;
        var diameter = Math.round(colorSpaceHeight * 2.4 / 3.1);
        var radiusC = diameter/2;



        var xoffset = (colorSpaceWidth - diameter) / 2;
        var yoffset = (colorSpaceHeight - diameter) / 2;
        var centerX = xoffset + radiusC;
        var centerY = yoffset + radiusC;
        var scaleGBC2Canvas = d3.scale.linear().domain([-1, 1]).range([xoffset, xoffset + diameter]);
        var scaleGBC2Canvas = d3.scale.linear().domain([-1, 1]).range([yoffset, yoffset + diameter]);

     d3.select("#hello")
          .selectAll("svg").remove();

        // draw color space
        var canvas = document.createElement("canvas");
        d3.select(canvas)
            .attr("width", colorSpaceWidth)
            .attr("height", colorSpaceHeight);

        var context = canvas.getContext("2d");


        for (let i = xoffset; i < xoffset + diameter; i++) {
            for (let j = yoffset; j < yoffset + diameter; j++) {
              context.fillStyle = CoordToColor(scaleGBC2Canvas.invert(j), scaleGBC2Canvas.invert(i), false);
              context.fillRect(j, i, 1, 1);
              //  context.fillStyle = CoordToColor(scaleGBC2Canvas.invert(j), scaleGBC2Canvas.invert(i), false);
            }
        }

        svgColorSpace = d3.select("#hello")
            .append("svg")
            .attr("width", colorSpaceWidth)
            .attr("height", colorSpaceHeight);
        svgColorSpace.append("image")
            .attr("xlink:href", canvas.toDataURL("image/png"))
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", colorSpaceWidth)
            .attr("height", colorSpaceHeight);


            var startAngle = startAng * (Math.PI/180.0);
	          var endAngle = arcWidth;
            var s_x = Math.cos(startAngle);
            var s_y = Math.sin(startAngle);
            var e_x = Math.cos(arcWidth);
            var e_y = Math.sin(arcWidth);

              if (endAngle < startAng)
              {
                endAngle = endAngle + 2.0 * Math.PI;
              }


              var half_angle = (endAngle - startAng) / 2.0;
              var mid_angle  = (endAngle + startAng) / 2.0;
              var cos_half_angle = Math.cos(half_angle);



            var main = svgColorSpace.append('g');
               var g = main.append("svg:g");

               g.selectAll("scatter-dots")
                 .data(Q)
                 .enter()
                 .append("circle")
                 .attr("cx", function (d,i) {
                   return scaleGBC2Canvas(d[0]); } )
                 .attr("cy", function (d) { return scaleGBC2Canvas(d[1]); } )
                 .attr("r", function (d,i){
                   return 2.5;

                 })


                .style("fill",function(d){
                //  var angleArc = Math.atan2(scaleGBC2Canvas(d[1])-centerY,scaleGBC2Canvas(d[0])-centerX);//*180.0/Math.PI;
                //  console.log(mid_angle);
              //    var d_x = (scaleGBC2Canvas(d[0]) - centerX);
              //    var d_y = (scaleGBC2Canvas(d[1]) - centerY);
                //  if( ((s_x * d_y) - (s_y * d_x) >= 0.0)  && ((e_x * d_y) - (e_y * d_x) <= 0.0))
                //  if(Math.cos(angleArc - mid_angle) >= cos_half_angle)
                //  {
                    return GBCtoHCL2(d[0],d[1]);
                //  }
                //  else {
                //    return "white";
                //  }

                })
            /* .style("fill", function(d){
               return GBCtoHCL2(d[0],d[1])
             })*/
             .style("stroke","black")
             .style("stroke-opacity",0.2)
             .style("opacity", function (d) {
             dist = Math.sqrt((scaleGBC2Canvas(d[0]) - centerX)*(scaleGBC2Canvas(d[0])- centerX) + (scaleGBC2Canvas(d[1])-centerY)*(scaleGBC2Canvas(d[1])-centerY));
             if(dist < radialVal)
             return 0.1;
             else {
               return guiControls.alphaCorrection;
             }
           });

              var variablePoints = svgColorSpace.append('g');
                 var g = variablePoints.append("svg:g");

                 g.selectAll("scatter-dots")
                   .data(varPoints)
                   .enter()
                   .append("circle")
                   .attr("cx", function (d,i) { return scaleGBC2Canvas(d.GBCX*0.997); } )
                   .attr("cy", function (d) { return scaleGBC2Canvas(d.GBCY*0.997); } )
                   .attr("r", function (d,i){  return 4;})
                       //.style("fill","white")
                   .style("fill", function(d){ return GBCtoHCL2(d.GBCX*0.997,d.GBCY*0.997)})
                   .style("stroke","white")
                   .style("stroke-opacity",1)
                    .style("opacity", 1);


                    var variablePoints = svgColorSpace.append('g');
                       var g = variablePoints.append("svg:g");

                       g.selectAll("g")
                         .data(varPoints)
                         .enter()
                         .append("text")
                         .attr("x", function (d,i) { return scaleGBC2Canvas(d.GBCX*0.997); } )
                         .attr("y", function (d) { return scaleGBC2Canvas(d.GBCY*0.997); } )
                         .attr("dy", function (d,i){ return ".15em";})
                         .text(function(d,i) { return d.NAME; })
                         .style("fill", "white")
                         .style("stroke","white")
                         .style("stroke-opacity",1)
                         .style("opacity", 1);


                    //CIRCLE for using it as a Selection Parameters
                    if(modeARC == 1)
                    {
                        var g = svgColorSpace.append("svg:g");
                         g.selectAll("g")
                           .data([{x: moveXCord, y: moveYCord}])
                           .enter()
                           .append("circle")
                           .attr("cx", function(d) { return fromCartesianX(d.x); })
                           .attr("cy", function(d) { return fromCartesianY(d.y); })
                           .attr("r", moveCradius)
                           .style("fill", "white")
                           .style("opacity",0.2)
                           .style("stroke","black")
                           .style("stroke-width",2)
                           .style("stroke-opacity",1.0);
/*                           .call(d3.drag()
                           .subject(function(d) { return {x: fromCartesianX(d.x), y: fromCartesianY(d.y)}; })
                           .on("drag", dragged)
                         );*/

                         function fromCartesianX(x) {
                           return centerX + x;
                         }

                         function fromCartesianY(y) {
                           return centerY + y;
                         }

//ARC for using it as a Wedge
                        }
                        else if (modeARC == 0) {

                        var vis = svgColorSpace.append("svg")
                        var pi = Math.PI;



                        var arc = d3.svg.arc()
                            .innerRadius(0)
                            .outerRadius(radiusC)
                            .startAngle(startAng * (pi/180) + pi/2) //converting from degs to radians
                            .endAngle(arcWidth+pi/2) //just radians

                        vis.attr("width", "400").attr("height", "400") // Added height and width so arc is visible
                            .append("path")
                            .attr("d", arc)
                            .attr("fill", "steelblue")
                            .style("stroke","black")
                            .style("opacity",0.2)
                            .attr("transform", "translate(200,200)");
}

  }


}
