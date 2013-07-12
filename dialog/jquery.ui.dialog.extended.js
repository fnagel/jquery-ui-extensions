/*!
 * jQuery UI Dialog Extended
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

var sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	};
	
/*
 * Option width and height normally set the overall dialog dimensions.
 * This extensions make these options the dimensions of the content pane.
 * This way it's possible to set the real content dimensions.
 *
 * Please note you won't get the original size but the calculated overall size 
 * when using the width and height option getter.
 */
$.widget( "ui.dialog", $.ui.dialog, {
	options: {
		height: 200, // auto is not allowed when using animation

		// viewport settings
		forceFullscreen: false,
		resizeOnWindowResize: false,
		resizeAccordingToViewport: true,
		
		// width and height set the content size, not overall size
		useContentSize: false,
		
		// animated options
		useAnimation: true,
		animateOptions: {
			duration: 500,
			queue: false
		},
		loadingContent: "loading...",

		// callbacks
		resized: null
	},
	
	// Changes content and resizes dialog
	change: function( content, width, height ) {
		var that = this;

		if ( this.options.useAnimation ) {
			this.setAriaLive( true );
			this.element
				.html( this.options.loadingContent )
				.one( this.widgetEventPrefix + "resized", function() {
					that.element.html( content );
					that.setAriaLive( false );
				});	
		} else {
			this.element.html( content );	
		}
		
		// set and change to new size
		this._setOptions({
			width: width,
			height: height
		});
	},
	
	_setOptions: function( newOptions ) {
		var that = this,
			options = this.options,
			resize = false,
			resizableOptions = {};

		$.each( newOptions, function( key, value ) {	
			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
			
			if ( resize ) {
				// we need to adjust the size as we need to set the overall dialog size
				if ( options.useAnimation && options.useContentSize ) {
					if ( key === "width" ) {
						value = value + ( that.uiDialog.width() - that.element.width() );
					}
					if ( key === "height" ) {
						value = value + ( that.uiDialog.outerHeight() - that.element.height() );
					}			
				}
							
				// save sizes to calc diff to new position and size
				if ( key === "width" ) {
					that._oldSize.width = options.width;
				}
				if ( key === "height" ) {
					that._oldSize.height = options.height;
				}			
			}			
			
			that._setOption( key, value );
		});

		if ( resize ) {		
			// overwrite options with recalculated dimensions
			$.extend( options, this._getSize( options ) );
			
			this._size();
			this._position();
		}
		if ( this.uiDialog.is(":data(ui-resizable)") ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},
	
	_getSize: function( data ) {
		var options = this.options,
			// portrait = ( data.height >= data.width ) ? true : false,
			feedback = $.position.getWithinInfo( options.position.of ),
			fullscreen = {
				width: feedback.width,
				height: feedback.height
			};
					
		if ( options.forceFullscreen ) {
			return fullscreen;
		}
		
		
		if ( options.resizeAccordingToViewport ) {
			if ( feedback.width < data.width ) {
				console.log("viewport < width");
				data = this._calcSize( data, feedback.width, "width", "height" );
			}
			if ( feedback.height < data.height ) {
				console.log("viewport < height");
				data = this._calcSize( data, feedback.height, "height", "width" );
			}
		}
		
		
		return data;
	},
	
	_calcSize: function( data, value, sortBy, toSort ) {
		var newData = {};
		
		newData[ toSort ] = ( data[ toSort ] / data[ sortBy ] ) * value;
		newData[ sortBy ] = value;
	
		return newData;
	},

	_size: function() {
		if ( this._isVisible && this.options.useAnimation ) {
			this._animateSize();
			return;
		}
		
		if ( this.options.useContentSize ) {
			this._contentSize();
			return;
		}
		
		this._super();
	},

	/*
	 * Sets the size of the dialog
	 *
	 * Options width and height define content size, not overall size
	 */
	_contentSize: function() {
		// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		// divs will both have width and height set, so we need to reset them
		var nonContentHeight, nonContentWidth, minContentHeight, maxContentHeight,
			options = this.options;

		// Reset content sizing
		nonContentWidth = this.element.show().css({
			width: options.width,
			minHeight: 0,
			maxHeight: "none",
			height: 0
		}).outerWidth() - options.width;
		this.element.css( "width", "auto" );

		if ( options.minWidth > options.width + nonContentWidth ) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: "auto",
				width: options.width + nonContentWidth
			})
			.outerHeight();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
		maxContentHeight = typeof options.maxHeight === "number" ?
			Math.max( 0, options.maxHeight - nonContentHeight ) :
			"none";

		if ( options.height === "auto" ) {
			this.element.css({
				minHeight: minContentHeight,
				maxHeight: maxContentHeight,
				height: "auto"
			});
		} else {
			this.element.height( Math.max( 0, options.height ) );
		}

		if (this.uiDialog.is(":data(ui-resizable)") ) {
			this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
		}
		
		// save calculated overall size
		options.width = options.width + nonContentWidth;
		options.height = options.height + nonContentHeight;
		
		console.log("initial " + options.width + "x" + options.height );
	},

	// Processes the animated positioning (position using callbacl), works with any width and height options
	_animateUsing: function( position, feedback , content ) {
		var that = this,
			widthDiff = this._oldSize.width - this.options.width,
			heightDiff = this._oldSize.height - this.options.height;

		// calculate new position based on the viewport
		position.left = ( feedback.target.left + ( feedback.target.width - feedback.element.width + widthDiff ) / 2 );
		position.top = ( feedback.target.top + ( feedback.target.height - feedback.element.height + heightDiff ) / 2 );

		if ( position.top < 0 ) {
			position.top = 0;
		}

		this.uiDialog.animate( position, $.extend( {},
			that.options.animateOptions, {
				complete: function() {
					that._trigger( "resized" );
				}
			})
		);
	},

	// animated the size, uses width and height options like default dialog widget (overall size)
	_animateSize: function() {
		console.log("_animateSize saveOld " + this._oldSize.width + "x" + this._oldSize.height );
		console.log("_animateSize current " + this.options.width + "x" + this.options.height );
		
		var options = this.options,
			width = options.width,
			// options.height is overall size, we need content size
			height = options.height - ( this.uiDialog.outerHeight() - this.element.height() );

		console.log("_animateSize setter " + width + "x" + height );
		this.uiDialog.animate({
			width: width,
		}, options.animateOptions );

		this.element.animate({
			height: height,
		}, options.animateOptions );
	},	
	
	// position overwrite for animated positioning
	_position: function() {
		if ( !this.options.useAnimation || !this._isVisible ) {
			this._super();
			return;
		}

		var that = this,
			originalUsing = this.options.position.using;

		// change position.using mechanism
		this.options.position.using = function( position, feedback  ) {
			that._animateUsing( position, feedback , content );
		};
		this._super();
		// reset position.using mechanism
		this.options.position.using = originalUsing;
	},

	// ARIA helper
	setAriaLive: function( busy ){
		this.uiDialog.attr({
			"aria-live": "assertive",
			"aria-relevant": "additions removals text",
			"aria-busy": busy
		});
	},

	// all following functions add a variable to determine if the dialog is visible
	_create: function() {
		this._oldSize = {};
		this._super();
		this._isVisible = false;
		
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

	open: function() {
		this._super();
		this._isVisible = true;
	},

	close: function() {
		this._super();
		this._isVisible = false;
	}
});

}( jQuery ));
