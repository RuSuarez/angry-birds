////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  fill(255);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle+=angleSpeed
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for(var i=0; i<birds.length; i++){
      drawVertices(birds[i].vertices);
      if (isOffScreen(birds[i])){
          removeFromWorld(birds[i]); // Removing from World
          birds.splice(i,1); // Removing from array
          i--; // Decrementing fro loop
      }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  for(var i=0; i<3; i++){
    for(var j=0; j<6; j++){
      colors.push(random(80,255)); // Generating a random number to randomise the colour
      box = Bodies.rectangle(width/2+200+80*i, height-120-j*80, 80, 80, { // Creating the boxes
      isStatic: false, angle: angle
      });
      boxes.push(box); // Pushing the boxes into the array 
      World.add(engine.world, [box]); // Generating the boxes in the world
    }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  for(var i=0; i<boxes.length; i++){
    fill(0,colors[i],0); // Filling with the greenish colour generated above
    drawVertices(boxes[i].vertices); // Drawing the boxes
    if(isOffScreen(boxes[i])){// Removing boxes from array if off screen
        boxes.splice(i,1);
        i--;
    } 
    if(boxes.length==0){
        youWon();
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(250, 170, 20, {
    restitution: 0.95, friction: 0
  });
  World.add(engine.world, [slingshotBird]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill(0,0,0,255);//Making the circle transparent so the bird image is visible
  drawVertices(slingshotBird.vertices);
  pop();
  image(birdImage,slingshotBird.position.x-33,slingshotBird.position.y-37,67,67);//Having the bird image in the same position where the slingshotbird circle is
  
}

/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

////////////////////////////////////////////////////////////////
//sets up the constraint

function setupConstraint(slingshotBird){
  slingshotConstraint = Constraint.create({
  pointA: {x:250, y:150},
  bodyB: slingshotBird,
  pointB: {x:0, y:0},
  stiffness: 0.01,
  damping: 0.0001
  })
  World.add(engine.world, [slingshotConstraint]);
}

////////////////////////////////////////////////////////////////
//draw score

function showScore(){
  if (isOver == false){
      fill(255);
      textSize(20);
      textAlign(LEFT);
      text("Boxes left: "+boxes.length, 10, 30)
  }
}

////////////////////////////////////////////////////////////////
//You won function

function youWon(){
  isOver=true;
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("YOU WON!", width/2, height/2)
  noLoop();
}
