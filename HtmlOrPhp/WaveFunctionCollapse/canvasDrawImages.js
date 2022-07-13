var canvas = document.getElementById('myCanvas');
var canvas2d = canvas.getContext('2d');

function drawImageAt(imgName, Xpos, Ypos, imgW, imgH) {
  var img = document.getElementById(imgName);
  canvas2d.drawImage(img, Xpos, Ypos, imgW, imgH);
}

function drawImageAtRotation(imgName, Xpos, Ypos, imgW, imgH, angleInDeg) {
  var img = document.getElementById(imgName);
  var halfImgW = imgW/2;
  var halfImgH = imgH/2;
  var TO_RADIANS = Math.PI/180;
  canvas2d.translate( Xpos + halfImgW, Ypos + halfImgH );
  canvas2d.rotate( (angleInDeg * TO_RADIANS) );
  canvas2d.drawImage( img, -halfImgW, -halfImgH, imgW, imgH);
  canvas2d.rotate( -(angleInDeg * TO_RADIANS) );
  canvas2d.translate( -(Xpos + halfImgW), -(Ypos + halfImgH) );
}