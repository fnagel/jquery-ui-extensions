/*!
 * jQuery UI Dialog Resize Extension
 *
 * Copyright 2013, Felix Nagel (http://www.felixnagel.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/fnagel/jquery-ui-extensions
 *
 * Depends:
 *	jquery.ui.dialog.js
 */
(function( $ ) {

$.widget( "ui.dialog", $.ui.dialog, {
	// add option
	options: {
		popup: false
	},
	
	// Changes content and resizes dialogs
	content: function( content, width, height ) {
		this.element.html( content );
		
		this._setOptions({
			width: ( width ) ? width : this.options.width,
			height: ( height ) ? height : this.options.height
		});
	}	
});

}( jQuery ));
