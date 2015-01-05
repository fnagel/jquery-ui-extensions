# [jQuery UI](http://jqueryui.com/) Extensions

[![Build Status](https://drone.io/github.com/fnagel/jquery-ui-extensions/status.png)](https://drone.io/github.com/fnagel/jquery-ui-extensions/latest)

## jQuery UI Dialog Extended

*Copyright 2013-2015, Felix Nagel (http://www.felixnagel.com)*
*Dual licensed under the MIT or GPL Version 2 licenses.*


### Description

This is an extension for the jQuery UI Dialog widget that adds multiple features and enhancements:

* Animated resizing and positioning
* Use content size instead of overall size when using width and height options
* Multiple viewport settings to make jQuery UI Dialog more flexible and RWD compatible

Useful for custom scripts based upon jQuery UI Dialog or as base for plugins like [MultiDialog](http://fnagel.github.io/MultiDialog/)


### Dependencies
* jQuery
* jQuery UI
	* jquery.ui.core.js
	* jquery.ui.widget.js
	* jquery.ui.dialog.js


### Use
Just add the jquery.ui.dialog.extended.js file. Make sure its included after jQuery UI (and Dialog).

```javascript
// Use default way to call methods
$( "#dialog" ).dialog( "width", 400 );
// or use one of the added methods
$( "#dialog" ).dialog( "changeSize", 400, 200 );
```

This extension supports all jQuery UI Dialog options and features, including draggable and resizeable.


### API Documentation

#### Available Options
The following options are added to the existing options of the dialog widget:

* **closeModalOnClick:** `true`
    Close the dialog when the overlay is clicked.

* **forceFullscreen:** `false`
    Always force the dialog to be maximized. Not ratio aware.

* **resizeOnWindowResize:** `false`
    Resize the dialog when the window is resized. Useful for repsonsive websites.

* **scrollWithViewport:** `false`
    Reposition the dialog when the window is scrolled. Useful for repsonsive websites.

* **resizeAccordingToViewport:** `true`
    Resizes the dialog (ratio aware) to fit the viewport. Makes sure the dialog isn't bigger as the viewport. Very useful for image galleries as its guarantees the best possible image size.

* **resizeToBestPossibleSize:** `false`
    Resizes the dialog (ratio aware) to fit the viewport. Something like a ratio aware fullscreen mode. This could increase the dialog size.

* **useContentSize:** `false`
    Make dialog's width and height option set the content size, not overall dialog size.

* **useAnimation:** `true`
    Use animation for resizing and positioning.

* **animateOptions:** `{ duration: 500, queue: false }`
    Animation options. See: http://api.jqueryui.com/show/ and http://api.jqueryui.com/hide/


*Please note: some options work best if you add some CSS to expand your content to full available size.*


#### Events
The following events are added to the existing events of the dialog widget:

* **resized**
    Called when the dialog is resized.


#### Methods
The following methods are added to the existing methods of the dialog widget:

* **change(content, width, height, animate)** *html, integer, integer, boolean (optional)*
    Changes content and size of the dialog.

* **changeSize(width, height)**
    Changes the size and width by using _setOptions. A shortcut. Recommended when changing both values.

* **setAriaLive(busy)**
    Helper method to change ARIA live attributes.
