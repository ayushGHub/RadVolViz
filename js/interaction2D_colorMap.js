
function CoordToColor(CX, CY){
        [CX, CY] = ConstrainInUnit(CX, CY);
    return GBCtoHCL2(CX, CY);
}

function ConstrainInUnit(CX, CY) {
    let r = Math.sqrt(Math.pow(CX, 2) + Math.pow(CY, 2));
    if (r > 1) {
        CX /= r;
        CY /= r;
    }
    return [CX, CY];
}

function ObjtoArr(data){
var arr1 = new Array();
data.map(function(d){
  var arr = new Array();
  for(dd in d){
    arr.push(d[dd]);
  }

arr1.push(arr);
});

  return arr1;
}



function drawInitialchart(file){
    var fileName = document.getElementById('input-files').files[0].name;
  //var fileName = "myDatawo0.csv";
  d3.csv(fileName, function(d){

     dataS=d;

     });

}

function updateData(){
  num_points = guiControls.points;
data = new Array();
  for (var i=0;i<num_points;i++) {
   data.push(dataS[i]);//s = d[i];

     }
}

function rowHeader(data)
{
  var rowNum = 1;
  var rowName = [];
  data.map(function(row) {
    while(rowNum<2){
                 rowName.push(Object.keys(row));
                 rowNum++;
      }
      });
      return rowName;
}

function radioOnChange(){
  helloWorld();
}

function newArray(A, B){
  var C = [];
  var arrLen = A.length;
  for (var i = 0; i < arrLen; i++) {
    var obj = {};
    for(header in A[i]){
      obj[header] = A[i][header];
    }
    obj.GBCX = B[i][0];
    obj.GBCY = B[i][1];
    C.push(obj);
  }
return C;
}
