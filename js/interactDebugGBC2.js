function GBC(datam,rotateVar)
{

  var m = datam.length;

  var n = (datam[0]).length;

  var angle = new Array(n)
  angle[0] = Math.PI / 2 + rotateVar;



  var GBCL = new Array();

  for (i=0;i<m+n;i++) {
   GBCL[i]=new Array();
   for (j=0;j<2;j++) {
    GBCL[i][j] = 0;
   }
  }


  GBCL[m][0] = Math.cos(angle[0]);
  GBCL[m][1] = Math.sin(angle[0]);



  for (var i = 1; i < n; i++)
  {
      angle[i] = angle[i - 1] - 2 * Math.PI / n;
      GBCL[m + i][0] = Math.cos(angle[i]) * 0.997;
      GBCL[m + i][1] = Math.sin(angle[i]) * 0.997;

  }

  for (var i = 0; i < n; i++)
  {
      if (angle[i] < 0)
      {
          angle[i] = angle[i] + Math.PI * 2;
      }
      if (angle[i] > Math.PI * 2)
      {
          angle[i] = angle[i] - Math.PI * 2;
      }
  }


   angle.sort();


  for (var i = 0; i < m; i++)
  {
      var tempsum = 0;
      for (var j = 0; j < n; j++)
      {
          tempsum = tempsum + parseFloat(datam[i][j]);

      }
      if (tempsum == 0)
      {
          GBCL[i][0] = 0;
          GBCL[i][1] = 0;
      }
      else
      {
          for (var k = 0; k < n; k++)
          {
              GBCL[i][0] = GBCL[i][0] + (datam[i][k] / tempsum) * GBCL[m + k][0];
              GBCL[i][1] = GBCL[i][1] + (datam[i][k] / tempsum) * GBCL[m + k][1];

          }

          var tempangle = Math.atan2(GBCL[i][1], GBCL[i][0]);
          if (tempangle < 0)
          { tempangle = tempangle + Math.PI * 2; }
          var flag = false;
          var tempA = 0;
          var tempB = 0;
          for (var j = 0; j < n - 1; j++)
          {
              if ((tempangle > angle[j] || tempangle == angle[j]) && (tempangle < angle[j + 1]))
              {
                  tempA = angle[j + 1];
                  tempB = angle[j];
                  flag = true;
              }
              if (flag == true)
                  break;
          }
          if (flag == false)
          {
              tempA = angle[0] + Math.PI * 2;
              tempB = angle[n - 1];
          }
          var lth = (Math.sqrt(GBCL[i][0] * GBCL[i][0] + GBCL[i][1] * GBCL[i][1]) / Math.cos((tempA - tempB) / 2) * Math.cos(-(tempA + tempB) / 2 + tempangle));
          GBCL[i][0] = (lth * Math.cos(tempangle));
          GBCL[i][1] = (lth * Math.sin(tempangle));

      }
  }


  var dimorder = new Array(n)
  for (var i = 0; i < n; i++)
  {
      dimorder[i] = i;
  }

    return GBCL;
};

var ppp = 0;

function GBCtoHCL2(CX, CY) {
    if (CX * CX + CY * CY > 0.999999) {
        return d3.rgb(0, 0, 0).toString();
    }

    h = (Math.atan2(CY, CX) + Math.PI / 2);
        if (h < 0) {
            h = h + Math.PI * 2;
        }
        if (h > Math.PI * 2) {
            h = h - Math.PI * 2;
        }

        h = h / Math.PI * 180;
        s = Math.sqrt(Math.pow(CX, 2) + Math.pow(CY, 2));
        l=0.55;

        h = h/360.0;
        s = s;
        l = l;

     h = h*360;

        return d3.hsl(h, s, l).toString();

};
