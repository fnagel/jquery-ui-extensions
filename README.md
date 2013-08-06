# [jQuery UI](http://jqueryui.com/) Extensions


## jQuery UI Dialog Extended

*Copyright 2013, Felix Nagel (http://www.felixnagel.com)*
*Dual licensed under the MIT or GPL Version 2 licenses.*


### Description

This is an extension for the jQuery UI Dialog widget that adds multiple features and enhancements:

* 


### Dependencies
* jQuery
* jQuery-ui
* *	jquery.ui.core.js
* *	jquery.ui.widget.js
* *	jquery.ui.dialog.js

### Use
Just add the jquery.ui.dialog.extended.js file. Make sure its included after jQuery UI (and Dialog).

```javascript
// Use default way to call methods
$( "#dialog" ).dialog( "width" );
$( "#dialog" ).dialog( "width" );
```

### API Documentation

### Available Options
*(and their default values)*  
The following options are added to the existing options of the dialog widget:

* **maximize:** `false`  
    Indicates if the dialog should support being maximized.

* **openMaximized:** `false`  
    Indicates if the dialog should be opened maximized.

* **maximizeFx:** `{ easing: null, duration: "normal", complete: null }`  
    Animation options for when the dialog is maximized.
    * effect - Name of jQuery animation.
    * duration - Animation duration/speed.
    * callback - A function to call once the animation is complete.

* **restoreFx:** `{ easing: null, duration: 'normal', complete: null }`  
    Animation options for when the dialog is restored.
    * effect - Name of jQuery animation.
    * duration - Animation duration/speed.
    * callback - A function to call once the animation is complete.

### Events
The following events are added to the existing events of the dialog widget:

* **maximized**  
    Raised when the dialog is maximized.

* **restored**  
    Raised when the dialog is restored.

### Methods
The following methods are added to the existing methods of the dialog widget:

* **maximize()**  
    Maximizes the dialog. Chainable.

* **restore()**  
    Restores the dialog to it's original size if it is currently maximized. Chainable.

* **isMaximized()**  
    Gets a value indicating if the dialog is currently maximized.
