/*

Draws a circle in canvas that moves the direction of the last pressed arrow button

*/

//globals
var x = 0;
var y = 255;
var d = "right"; //initial direction
var myObject;

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
	canvas.width = 512;
	canvas.height = 512;

	//get a 2D context
	var context = canvas.getContext('2d');

	//acquire texture 
	var image = getTexture(canvas, context);
	
	//create 3D model from image
	myObject = new arel.Object.Model3D.createFromArelImage("myObject", image);
	
	//scale 3D model
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject);
	
	//update texture every half a second
	setInterval( function(){
		myObject.setTexture("myObject", getTexture(canvas, context));
	}, 500 ); 
});

function getTexture(canvas, context)
{	
	//clear canvas
	context.clearRect( 0, 0,canvas.width, canvas.height);

	//draw
	draw(context, d);

	//creat image data from the canvas
	var newImageData = canvas.toDataURL();
	return new arel.Image(newImageData);
}

function draw(context) {
	context.fillStyle = 'rgba(74, 144, 226, 255)';
	context.beginPath();
    context.arc( x, y, 50, 0, 2 * Math.PI, false);
    context.fill();

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

//managing when user clicks arrow buttons
function clickEvent(dir) {
	d = dir; 
}