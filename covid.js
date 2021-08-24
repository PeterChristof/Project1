let mainSong = new Audio('./audio/GUTS TAKE A LOOK AROUND YOU.mp3'); //Music

mainSong.loop = true;
mainSong.volume = 0.8;
mainSong.play();

//Game Page Canvas
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let injectionSound = new Audio('./audio/injection.wav'); //Music
let redSound = new Audio('./audio/virussound.wav'); //Music
let greenSound = new Audio('./audio/virussound.wav'); //Music
let themeSong = new Audio('./audio/walking-dead.mp3'); //Music New Drama Music

themeSong.volume = 0.8;
themeSong.loop = true;
themeSong.play();

//Background
let background = false;
let backgroundImage = new Image();
backgroundImage.onload = function () {
  background = true;
};
backgroundImage.src = "./images/world.jpg";

// Person
let personDraw = false;
let covidPlayerImage = new Image();
  covidPlayerImage.onload = function () {
    personDraw = true;
};
  covidPlayerImage.src = "./images/covidwarrior.png";

// Injection
let injectionDraw = false;
let injectionImage = new Image();
injectionImage.onload = function () {
  injectionDraw = true;
};
  injectionImage.src = "./images/injectionImage.png";
  
// Controls and Speed
let person = {
  speed: 300,
  x: 240,
  y: 380
};
// let GreenVirus = {}; //check if possible to remove PER
let injections = {};
let injectionsCaught = 0;
// Handle keyboard controls
let keysDown = {};
// Check for keys pressed where key represents the key captured
addEventListener("keydown", function (key) {
  keysDown[key.key] = true; //check if necessary PER
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.key];
}, false);

// Sets person's location and injectionss random placement
let reset = function () {
  injections.x = 32 + (Math.random() * (canvas.width - 70)); //subtract from canvas height so injections dont leave canvas
  injections.y = 32 + (Math.random() * (canvas.height - 70));
}

// Controls
let update = function (modifier) {
  if ("ArrowUp" in keysDown) { 
    person.y -= person.speed * modifier;
    if (person.y < 0) {
      person.y = 0;
      }
  }
  if ("ArrowDown" in keysDown) { 
    person.y += person.speed * modifier;
    if (person.y > 380) {
      person.y = 380;
      }
  }
  if ("ArrowLeft" in keysDown) { 
    person.x -= person.speed * modifier;
    if (person.x <= 0) {
      person.x = 0;
      }
  }
  if ("ArrowRight" in keysDown) { 
    person.x += person.speed * modifier;
    if (person.x >= 500) {
      person.x = 500;
      }
  }

  // person and injections collision
  if (
    person.x <= (injections.x + 32)
    && injections.x <= (person.x + 50)
    && person.y <= (injections.y + 50)
    && injections.y <= (person.y + 120)
  ) {
    injectionSound.play(); //injection happy sound PER
    ++injectionsCaught;
    reset();
  }

};

//Make redVirus
let redVirus = new Image();
redVirus.src = './images/redVirus.png';

function Red (x, y, image, isLoaded, width, height) {
  this.x = x
  this.y = y
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
  this.angle = 0;
  
  
}

Red.prototype.draw = function () {
  context.save();
  // context.rotate(this.angle += .01);
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
  context.restore();
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let myRed = [
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
];

function makeredVirus() {
  for (let i=0; i < 1; i++ ) {
  myRed.push(new Red(getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 40, 40));

  }

}

//redVirus constantly falling
function drawredVirus(){
  myRed.forEach(function (oneRed) {
    oneRed.y += 1;
    oneRed.draw();
//person and redVirus collision
    if (
      person.x <= (oneRed.x + 32)
      && oneRed.x <= (person.x + 50)
      && person.y+60<= (oneRed.y + 50)
      && oneRed.y <= (person.y + 120)
    ) {
      oneRed.y += NaN;
      redSound.play(); // check health
      --health;
      checkHealth();
    }})
};

//Make  greenVirus PER

let green = new Image();
green.src = './images/greenVirus.png';

function greenVirus (x, y, image, isLoaded, width, height) {
  this.x = x
  this.y = y
  this.image = image;
  this.isLoaded = false;
  this.width = width;
  this.height = height;
  this.angle = 0;
}

greenVirus.prototype.draw = function () {
  context.save();
  context.drawImage(this.image, this.x, this.y, this.width, this.height);
  context.restore();
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let mygreenVirus = [
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
];

function makegreenVirus() {
  for (let i=0; i < 1; i++ ) {
  mygreenVirus.push(new greenVirus(getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40));

  }
}
//GreenVirus constantly falling
function drawgreenVirus(){
  mygreenVirus.forEach(function (oneVirus) {
    oneVirus.y += 1;
    oneVirus.draw();
//person and Virus collision
    if (
      person.x <= (oneVirus.x + 32)
      && oneVirus.x <= (person.x + 50)
      && person.y+60<= (oneVirus.y + 50)
      && oneVirus.y <= (person.y + 120)
    ) {
      oneVirus.y += NaN;
      greenSound.play();
      --health;
      checkHealth();
    }})
};

 
// DRAW ON THE CANVAS //

let draw = function () {
  if (background) {
    context.drawImage(backgroundImage, 0, 0);
  }
  if (personDraw) {
    context.drawImage(covidPlayerImage, person.x, person.y, 120, 120);
  }
  if (injectionDraw) {
    context.drawImage(injectionImage, injections.x, injections.y, 50, 50);
  }

  // DISPLAY injection Amount and time

  context.fillStyle = "white";
  context.font = "20px Roboto";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("Health Points: " + injectionsCaught, 440, 5);
  context.fillText("Remaining Time: " + count, 20, 5);
  context.fillText("Remaining Life: " + health, 425, 30);

  // Display game over message when timer finished
  if(finished==true){
    context.fillText("TIME'S UP", 250, 150);
    context.fillText("CLICK THE TITLE TO PLAY AGAIN", 150, 200);
  }
  if(lose == true){
    context.fillText("YOU'RE POSITIVE - STAY AT HOME", 150, 250);
  }
  
};

let health = 8;
let lose = false; 
function checkHealth(){
    if (health <= 0)
    {
       clearInterval(counter);
       // set game to finished
       lose = true;
       injectionDraw=false;
       personDraw=false;
       stopDraw();

  }}

function stopDraw(){
  setTimeout(main, 20000)
}

let count = 30; // seconds
let finished = false;
let counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide person and
  // finish the game
    if (count <= 0)
    {
      // stop the timer
       clearInterval(counter);
       // set game to finished
       finished = true;
       count=0;
       injectionDraw=false;
       personDraw=false;
    }
}

let delay = 2000;
setTimeout(function () {
    delay = 2000
}, 2000);

function timeout() {
    setTimeout(function () {
        timeout();
        makeredVirus();
        makegreenVirus();
    }, delay);
};
timeout();

// timer interval is every second (1000ms)
setInterval(counter, 1000);
// The main game loop
let main = function () {
  update(0.02); //you can adjust the speed of person
  draw();
  drawredVirus();
  drawgreenVirus();
  requestAnimationFrame(main);
};

reset();
main();