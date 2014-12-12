/*

Draws a circle that can be moved by pressing the arrow buttons

*/

//globals
var myObject;
var x = 0;
var y = 50;
var d = "right"; // initial direction

arel.sceneReady(function() 
{
	//debug
	arel.Debug.activate();
	arel.Debug.activateArelLogStream();
	window.onerror = function(msg) {
	    alert('Error: ' + msg);
	}

	//create an HTML5 Canvas
	var canvas = document.createElement("canvas");

	//tell processing to draw on the canvas
	var processing = new Processing(canvas);

	//acquire texture 
	var image = getTexture(processing, canvas);
	
	//create 3D model from image
	myObject = new arel.Object.Model3D.createFromArelImage("myObject", image);
	
	//scale 3D model
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject);

	//processing setup
	setup(processing, canvas);
	
	//update texture every half a second
	setInterval( function(){
		myObject.setTexture("myObject", getTexture(processing, canvas));
	}, 500 ); 
});

function getTexture(processing, canvas)
{	
	//draw
	draw(processing, canvas);

	//create image data from the canvas
	var newImageData = canvas.toDataURL();
	return new arel.Image(newImageData);
}

//Processing sketch
function setup(processing, canvas) {
	//processing setup
	processing.size(500,500);
	processing.stroke(255, 0, 0);
	processing.strokeWeight(5);
	processing.fill(255, 10, 10);
}

function draw(processing, canvas) {
	processing.background(100);
	processing.ellipse(x, y, 25, 25);

	//update values
	if (d == "up") 
	{
		y -= 10;
	}
	else if (d == "down") 
	{
		y += 10;
	}
	else if (d == "left")
	{
		x -= 10;
	}
	else if (d == "right") 
	{
		x += 10;
	}
}

//click management
function clickEvent(dir) {
	d = dir; 
}
