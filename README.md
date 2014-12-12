todo:
clean sample apps:
static content on canvas/proc
dynamic content on canvas/proc
dom interaction on canvas/proc


junaio-docs
===========
Using Processing JS and HTML5 canvas API to create dynamic augmented reality apps with Junaio.

## Document Structure

Create an XML file with links to your tracking data ([see creating tracking data](#creating-image-tracking-data)) and to your main html document:

arelConfig.xml:
```
<?xml version="1.0" encoding="UTF-8"?>
<results trackingurl="TrackingData.zip">
  <arel><![CDATA[arelApp.html]]></arel>
</results>
```

Create an html file to contain links to JS libraries and files as well as serve as the DOM overlay to your app:

arelApp.html:
```
<html>
<head>
    <meta http-equiv='Content-type' content='text/html; charset=utf-8' />
	<script type="text/javascript" src="arel.js"></script>
	<script type="text/javascript" src="app.js"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
    <title></title>
</head>
<body></body>
</html>

```

Make sure to link to the arel javascript library.App.js and style.css are your own javascript and css files.

In app.js:

When arel content is loaded, the script will run the `arel.sceneReady()` method once. Use this method to initiate the arel debugging interface and if you are using the canvas API, also define the canvas and the 2D context on top of the canvas that you'll draw to. If you're using Processing JS, you'll define a Processing instance and call the Processing setup method. Inside the `arel.sceneReady()` function, you'll also set an interval (and thus the frame rate) at which AR content is drawn to the canvas.

`arel.sceneReady()` for canvas API:
```
arel.sceneReady(function() 
{
	//debug
	arel.Debug.activate();
	arel.Debug.activateArelLogStream();

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
	//var myObject needs to be first defined globally outside of sceneReady
	
	//scale 3D model
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject); 
	
	
	//update texture every 1 second
	setInterval( function(){
		myObject.setTexture("myObject", getTexture(canvas, context));
	}, 1000 ); // Junaio doesn't support intervals less than 500 miliseconds
});
```

`arel.sceneReady()` for Processing JS:
```
arel.sceneReady(function() 
{
	//create an HTML5 Canvas
	var canvas = document.createElement("canvas");

	//create processing instance 
	var processing = new Processing(canvas);

	//acquire texture 
	var image = getTexture(processing, canvas);
	
	//create 3D model from image
	myObject = new arel.Object.Model3D.createFromArelImage("myObject", image); 
	//var myObject needs to be first defined globally outside of sceneReady
	
	//scale 3D model
	myObject.setScale(new arel.Vector3D(5.0, 5.0, 5.0));
	arel.Scene.addObject(myObject);

	//run the processing sketch's setup method
	setup(processing, canvas);
	
	//update texture every 1 second
	setInterval( function(){
		myObject.setTexture("myObject", getTexture(canvas, context, d));
	}, 1000 ); // Junaio doesn't support intervals less than 500 miliseconds
});
```

getTexture takes the canvas and context created in arel.sceneReady, draws to that canvas (if Processing) or context (if canvas api) and returns whatever is drawn that frame in the canvas as an image to the arel scene.

```
var newImageData = canvas.toDataURL();
return new arel.Image(newImageData);
```

## Junaio and the HTML5 Canvas API

All of the canvas' built in functions work extremely well in Junaio. Two great resources here:

* [docs](http://www.rgraph.net/reference/index.html)
* [tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## Junaio and Processing JS

To run Processing JS in Junaio, you need to write processing code as pre-parsed javascript.

Every processing method can be called as it, wrapped under the global processing object.

For example:

`background(255)` becomes `processing.background(255)`

and `ellipse(50,50,20,20)` becomes `processing.ellipse(50,50,20,20)`

You'll still have a setup and draw function, with the processing instance and canvas element to be passed in. Setup is called once at the beginning in the arel.sceneReady function and draw is called once every frame from the getTexture method.

```
function setup(processing, canvas) {
	processing.size(200,200);
	//etc.
}

function draw(processing, canvas) {
	processing.stroke(255);
	processing.rect(20,20,0,0);
	//etc.
}
```

## Making the program interactive with DOM buttons

Any DOM buttons will fire any method that is assigned to the attribute ontouchstarted.

For example:

```
<div id="up-arrow" ontouchstart="clickEvent('up')"></div>
```

## Debugging and Logging

Arel has its own logging interface. To initiate it, run 

```
arel.Debug.activate();
arel.Debug.activateArelLogStream();
```

inside your `arel.sceneReady` function. 

To log something to arel's console, use , `arel.Debug.log("logging")` the same way you might use `console.log`.

Arel populates the debugger with its own logging, so I also found it helpful 
to create popup alerts for every error to catch when things go wrong:

```
window.onerror = function(msg) {
	   alert('Error: ' + msg);
}
```

If you are using Processing JS in your app, then another way to log is with `processing.println("logging")`. I prefer this because it is blank unless you write to it, unlike the mess of arel logs.

##Creating Image Tracking Data

[Download](http://ar.metaio.com/download_creator) the Metaio Creator.

In the creator, click on the Trackables icon: 

![Trackable Icon](http://s28.postimg.org/el3pd27u5/Screen_Shot_2014_12_06_at_8_44_47_PM.png) 

Select Image Tracking: 

![Image Tracking](http://s28.postimg.org/l02q9qejt/Screen_Shot_2014_12_06_at_8_44_54_PM.png)

Select the image you want to track. Creator will rate the trackability quality of the image: 

![Trackable Quality](http://s29.postimg.org/af9bdrvc3/Screen_Shot_2014_12_06_at_8_48_28_PM.png) 

Then Export > Export Tracking Configuration File: 

![Export](http://s18.postimg.org/aq5myx3uh/Screen_Shot_2014_12_06_at_8_48_49_PM.png) 

Save it to your app as a ZIP file, not a TXT: 

![Save](http://s15.postimg.org/8dqpb6s3f/Screen_Shot_2014_12_06_at_8_49_10_PM.png)

## To run the app:

Register for a Junaio developer's account here:
http://dev.junaio.com/index/main

Click New Channel.
![New Channel](http://s10.postimg.org/l9dksgd51/Screen_Shot_2014_12_06_at_8_35_55_PM.png)
Give a channel name, description, link to the app's main XML file on your server (a green check mark should appear if the link is valid), click Create.

## Workflow

Every time you want to run the app, you need to FTP the new version of the app and scan the QR on your phone to run the app.
