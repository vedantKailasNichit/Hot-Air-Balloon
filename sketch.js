var Balloon;
var database, position;
var balloon1, balloon2, bg;

function preload() {
  bg = loadImage("cityImage.png");
  balloon1 = loadAnimation("hotairballoon3.png");
}


function setup() {
  database = firebase.database();

  createCanvas(1362, 610);
  Balloon = createSprite(470, 540, 10, 10);
  Balloon.scale = 0.3;
  Balloon.addAnimation("1", balloon1);

  var ballPosition = database.ref("balloon/height");
  ballPosition.on("value", readPosition);
}



function draw() {
  background(bg);


  fill(0, 0, 0);
  textSize(40);
  text("use arrows to move", 100, 100)

  if (position !== undefined) {
    if (keyDown(LEFT_ARROW)) {
      writePosition(-3, 0);
    }
    else if (keyDown(RIGHT_ARROW)) {
      writePosition(3, 0);
    }
    else if (keyDown(UP_ARROW)) {
      writePosition(0, -3);
      Balloon.scale += 0.001;
      Balloon.changeAnimation("1", balloon2);
    }
    else if (keyDown(DOWN_ARROW)) {
      writePosition(0, +3);
      Balloon.scale -= 0.001;
      Balloon.changeAnimation("1", balloon1);
    }
  }


  drawSprites();
}


function readPosition(data) {
  position = data.val();
  Balloon.x = position.x;
  Balloon.y = position.y
}

function writePosition(x, y) {
  database.ref("balloon/height").set({
    "x": position.x + x,
    "y": position.y + y
  })
}
