// Music on start page

var canvas = document.getElementById('canvasmain');
var mainSong = new Audio('./audio/GUTS TAKE A LOOK AROUND YOU.mp3'); //Music

mainSong.loop = true;
mainSong.volume = 0.5;
mainSong.play();

//Game Page Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var moneySound = new Audio('./audio/injection.wav'); //Music
var redSound = new Audio('./audio/virussound.wav'); //Music
var coneSound = new Audio('./audio/virussound.wav'); //Music
var themeSong = new Audio('./audio/themesongedit.mp3'); //Music

themeSong.volume = 0.0
themeSong.loop = true
themeSong.play()


//Background
var background = false;
var backgroundImage = new Image();
backgroundImage.onload = function () {
  background = true;
};
backgroundImage.src = "./images/world.jpg";

// Person
var personDraw = false;
var covidPlayerImage = new Image();
  covidPlayerImage.onload = function () {
    personDraw = true;
};
  covidPlayerImage.src = "./images/CovidPlayer1.png";

// Injection
var injectionDraw = false;
var injectionImage = new Image();
injectionImage.onload = function () {
  injectionDraw = true;
};
  injectionImage.src = "./images/injectionImage.png";
  
// Controls and Speed
var person = {
  speed: 300,
  x: 240,
  y: 380
};
var vanilla = {}; //check if possible to remove PER
var injections = {};
var injectionsCaught = 0;
// Handle keyboard controls
var keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true; //check if necessary PER
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);

// Sets person's location and injectionss random placement
var reset = function () {
  injections.x = 32 + (Math.random() * (canvas.width - 70)); //subtract from canvas height so injections dont leave canvas
  injections.y = 32 + (Math.random() * (canvas.height - 70));
}

// Controls
var update = function (modifier) {
  if (38 in keysDown) { 
    person.y -= person.speed * modifier;
    if (person.y < 0) {
      person.y = 0;
      }
  }
  if (40 in keysDown) { 
    person.y += person.speed * modifier;
    if (person.y > 380) {
      person.y = 380;
      }
  }
  if (37 in keysDown) { 
    person.x -= person.speed * modifier;
    if (person.x <= 0) {
      person.x = 0;
      }
  }
  if (39 in keysDown) { 
    person.x += person.speed * modifier;
    if (person.x >= 600) {
      person.x = (canvas.width-person.x);
      }
  }

  // person and injections collision
  if (
    person.x <= (injections.x + 32)
    && injections.x <= (person.x + 50)
    && person.y <= (injections.y + 50)
    && injections.y <= (person.y + 120)
  ) {
    moneySound.play(); //injection happy sound PER
    ++injectionsCaught;
    reset();
  }

};

//Make redVirus
var redVirus = new Image();
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
  ctx.save();
  // ctx.rotate(this.angle += .01);
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  ctx.restore();
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var myRed = [
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
  new Red (getRandom(0, 600), ((Math.random() * canvas.height - 410)), redVirus, false, 50, 50),
];

function makeredVirus() {
  for (var i=0; i < 1; i++ ) {
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
      redSound.play(); // check weight
      --health;
      checkHealth();
    }})
};

//Make ice cream - greenVirus PER

var green = new Image();
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
  ctx.save();
  ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  ctx.restore();
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var mygreenVirus = [
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
  new greenVirus (getRandom(0, 800), ((Math.random() * canvas.height - 410)), green, false, 40, 40),
];

function makegreenVirus() {
  for (var i=0; i < 1; i++ ) {
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
      coneSound.play();
      --health;
      checkHealth();
    }})
};

 
// DRAW ON THE CANVAS //

var draw = function () {
  if (background) {
    ctx.drawImage(backgroundImage, 0, 0);
  }
  if (personDraw) {
    ctx.drawImage(covidPlayerImage, person.x, person.y, 60, 120);
  }
  if (injectionDraw) {
    ctx.drawImage(injectionImage, injections.x, injections.y, 50, 50);
  }

  // DISPLAY injection Amount and time

  ctx.fillStyle = "white";
  ctx.font = "20px Roboto";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Health Points: " + injectionsCaught, 440, 5);
  ctx.fillText("Remaining Time: " + count, 20, 5);
  ctx.fillText("Remaining Life: " + health, 425, 30);

  // Display game over message when timer finished
  if(finished==true){
    ctx.fillText("TIME'S UP", 250, 250);
    ctx.fillText("CLICK THE TITLE TO PLAY AGAIN", 150, 200);
  }
  if(lose == true){
    ctx.fillText("YOU'RE POSITIVE - STAY AT HOME", 180, 150);
  }
  
};

var health = 5;
var lose = false; 
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

var count = 30; // seconds
var finished = false;
var counter =function(){
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

var delay = 2000;
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
var main = function () {
  update(0.02); //you can adjust the speed of person
  draw();
  drawredVirus();
  drawgreenVirus();
  requestAnimationFrame(main);
};

reset();
main();