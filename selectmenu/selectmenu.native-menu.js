/*
 * jQuery UI Selectmenu Native Menu Extension
 *
 * Copyright 2012-2015, Felix Nagel (http://www.felixnagel.com)
 * Released under the MIT license.
 *
 * http://github.com/fnagel/jquery-ui-extensions
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"jquery-ui/core",
			"jquery-ui/widget",
			"jquery-ui/selectmenu"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

return $.widget( "ui.selectmenu", $.ui.selectmenu, {
	// add options
	options: {
		nativeMenu: false

		// Callbacks
		// not available when using native menu mode
	},

	_drawButton: function() {
		this._super();

		this.element
			.css({
				position: "absolute",
				top: 0,
				opacity: 0.001
			})
			.show();

		this.element.appendTo( this.button );


		this._off( this.button );
		this.button.off( "focusin" );
	},

	_position: function() {
		if ( !this.options.nativeMenu ) {
			this._super();
			return;
		}
	},

	_drawMenu: function() {
		if ( !this.options.nativeMenu ) {
			this._super();
		}
	}
});

}));