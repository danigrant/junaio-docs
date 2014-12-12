//global vars
var myObject;

arel.sceneReady(function() 
{

	//init debugging
	arel.Debug.activate();
	arel.Debug.activateArelLogStream();

	/*
	this causes an alert at any error. 
	sometimes it's difficult to catch logs in arel's tiny debug console. 
	this ensures that you catch every error.
	*/
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
	
	//scale 3D model (changing the values in Vector3D params changes the size of your canvas sketch in relation to the image you track. the best way to find the right values is try different values and see what looks good)
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject);
	
	//update texture every half a second (any faster than this causes freezing)
	setInterval( function(){
		myObject.setTexture("myObject", getTexture(canvas, context));
	}, 500 ); 
});

function getTexture(canvas, context)
{	

	/* 
	
	draw something on the canvas and return whatever is 
	drawn on the canvas as an image (stored in var newImageData)
	
	*/

	draw(canvas, context);

	//create image data from the canvas
	var newImageData = canvas.toDataURL();
	return new arel.Image(newImageData);
}

function draw(canvas, context) {
	//draw background 
	context.fillStyle = 'rgba(74,144,226,255)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//write a random number on the screen
	context.fillStyle = "white";
	context.font = 'bold 80pt Helvetica';
	var randomString = Math.floor(Math.random() * 1000);
	context.fillText(randomString, 50, 300);

	//make an ellipse 
	context.fillStyle = 'rgba(255,255,255,255)';
	context.beginPath();
    context.arc((Math.floor(Math.random() * 512)), (Math.floor(Math.random() * 512)), (Math.floor(Math.random() * 100)), 0, 2 * Math.PI, false);
    context.fill();
}