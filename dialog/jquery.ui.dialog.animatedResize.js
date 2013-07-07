/*!
 * jQuery UI Dialog AnimatedResize Extension
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
		height: 200, // auto is not allowed with this extension!

		// extended options
		animateOptions: {
			duration: 500,
			queue: false
		},
		loadingContent: "loading...",

		// callbacks
		resized: null
	},

	// Changes content and resizes dialogs
	changeContent: function( content, width, height ) {
		var that = this;

		this._setAriaLive( true );
		this.element.html( this.options.loadingContent );
		// set and change to new size
		this._setOptions({
			width: width,
			height: height
		});

		this.element.one( this.widgetEventPrefix + "resized", function() {
			that.element.html( content );
			that._setAriaLive( false );
		});
	},

	// processes the animated positioning
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

	// animated change of the dialog size
	animateSize: function() {
		var options = this.options,
			width = options.width,
			height = options.height,
			widthElement = this.element;

		// we need to adjust the size as we want to calculate the overall dialog size
		if ( !options.useContentSize ) {
			widthElement = this.uiDialog;
			width -= ( this._oldSize.width - this.element.outerWidth() );
			height -= ( this._oldSize.height - this.element.height() );
		}

		this.element.animate({
			height: height,
		}, options.animateOptions );
		widthElement.animate({
			width: width,
		}, options.animateOptions );
	},

	_setOption: function( key, value ) {
		// save sizes to calc diff to new position and size
		if ( key === "width" ) {
			this._oldSize.width = this.options.width;
		}
		if ( key === "height" ) {
			this._oldSize.height = this.options.height;
		}

		this._super( key, value );
	},

	_position: function() {
		if ( !this._isVisible ) {
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

	_size: function() {
		if ( this._isVisible ) {
			this.animateSize();
		} else {
			this._super();
		}
	},
	
	_setAriaLive: function( busy ){
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
