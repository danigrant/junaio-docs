junaio-docs
===========
Using Processing JS and HTML5 canvas API to create dynamic augmented reality apps with Junaio.

## Tracking the image.

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

## Junaio and the HTML5 Canvas API

All of the canvas' built in functions work extremely well in Junaio. Two great resources here:

* [docs](http://www.rgraph.net/reference/index.html)
* [tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
