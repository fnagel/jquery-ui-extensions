/*!
 * jQuery UI Dialog Responsive Extension
 *
 * Copyright 2013, Felix Nagel (http://www.felixnagel.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/fnagel/jquery-ui-extensions
 *
 * Depends:
 *	jquery.ui.dialog.js
 *
 * Optional:
 *	jquery.ui.dialog.contentSize.js
 */
(function( $ ) {

$.widget( "ui.dialog", $.ui.dialog, {
	options: {
		forceFullscreen: true,
		resizeOnWindowResize: true,
		resizeAccordingToViewport: true
	},
	
	_create: function() {
		var that = this,
			size;
		
		this._super();
		
		// make dialog responsive
		if ( this.options.resizeOnWindowResize ) {
			$( window ).bind( "resize." + this.widgetName, function( event ){
				if ( that.isOpen ) {
					that._delay( function() {
						// size = that._getSize( that.options );						
						// that._setOptions({
							// width: that.options.width,
							// height: that.options.height
						// });
							
						// $.ui.dialog.overlay.resize();
					}, 250 );
				}
			});
		}
	},
	
	_setOption: function( key, value ) {
		console.log("_setOption responsive");
		var data = {};			
		
		this._super( key, value );			
		// overwrite options with recaluclated dimensions
		if ( key === "width" || key === "height" ) {	
			data[ key ] = value;
			$.extend( this.options, this._getSize( $.extend( this.options, data ) ) );
		}
	},
	
	_getSize: function( data ) {
		var options = this.options,
			portrait = ( data.height >= data.width ) ? true : false,
			feedback = $.position.getWithinInfo( options.position.of );
					
		if ( options.forceFullscreen ) {
			console.log(feedback);
			return {
				width: feedback.width,
				height: feedback.height
			};
		}
		
		if ( feedback.width < data.width ) {
			console.log("viewport < width");
			data = this._calcSize( data, feedback.width, "width", "height" );
		}
		if ( feedback.height < data.height ) {
			console.log("viewport < height");
			data = this._calcSize( data, feedback.height, "height", "width" );
		}
		
		
		return data;
	},
	
	_calcSize: function( data, value, sortBy, toSort ) {
		var newData = {};
		
		newData[ toSort ] = ( data[ toSort ] / data[ sortBy ] ) * value;
		newData[ sortBy ] = value;
	
		return newData;
	}
	
});

}( jQuery ));
