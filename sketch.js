var cols, rows;
var scl = 10;//지형과의 가까운 정도
var w = 1400;
var h = 1000;
var flying = 0.1;
var terrain = [];
let px = 1;
let pr=1;
let pg=1;
let pb=1;
let song;


function setup() {
  
song = loadSound('SEASIDE+WAVE-2_By+Soundman (mp3cut.net).mp3');
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  noStroke(); //줄없애기
}

function draw() {
  flying -= 0.01; //빠르기
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 50);
      xoff += 0.2;
    }
    yoff += 0.01;
  }
  background(pr,pg,pb);//해 위치에 따른 하늘 변화
let pc = pr + pg + pb;
  pr = pr + 0.025;
  pg = pg + 0.04;
  pb = pb + 0.1;
  translate(0, 50);
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);

    //fill(terrain[x][y]+100, terrain[x][y]+60,150,100); //색상
    for (var x = 0; x < cols; x++) {
      fill(terrain[x][y]+70, terrain[x][y]+50, terrain[x][y]+255);//변형된 색상
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  push(); //해만들기
  rotate(PI/5);
  fill(255,0,0);
  translate(10-(w/5)+px,(50-h/2),250);
  sphere(15);
  if(px>2*width)px = 1;
  px = px + 0.5;
  pop();
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying()은 불리언 값을 반환합니다.
    song.stop();
  } else {
    song.play();
  }
}
