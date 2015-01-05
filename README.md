# [jQuery UI](http://jqueryui.com/) Extensions

[![Build Status](https://drone.io/github.com/fnagel/jquery-ui-extensions/status.png)](https://drone.io/github.com/fnagel/jquery-ui-extensions/latest)

## jQuery UI Seletmenu Extensions

*Copyright 2012-2014, Felix Nagel (http://www.felixnagel.com)*
*Licensed under the MIT license.*

#### Description

This is a collection of extensions for the new [jQuery UI Selectmenu Widget](https://github.com/jquery/jquery-ui/tree/selectmenu).


#### Dependencies
* jQuery
* jQuery UI
	* core.js
	* widget.js
	* position.js
	* meneu.js
	* selectmenu.js

	
	
### Popup Style


#### Usage
Just add the selectmenu.popup.js file and enable `popup` option.


#### API Documentation

##### Available Options
The following options are added to the existing options of the Seldctmenu widget:

* **popup:** `false`
    Make the selectmenu menu work like a pop up instead of a dropdown menu.

	
	
### Native Menu 


#### Usage
Just add the selectmenu.native-menu.js file and enable `nativeMenu` option.


#### API Documentation

##### Available Options
The following options are added to the existing options of the Seldctmenu widget:

* **nativeMenu:** `false`
    Use native select menu instead of the generated menu. 
	
	
*Note* Event callbacks won't work if this extension is enabled.