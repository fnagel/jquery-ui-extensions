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
	options: {
		height: 200, // auto is not allowed!

		// extended options
		animationSpeed: 1000,
		loadingContent: "loading...",

		// callbacks
		resized: null
	},

	// Changes content and resizes dialogs
	changeContent: function( content, width, height ) {
		var that = this,
			originalUsing = this.options.position.using;

		// change position.using mechanism
		this.options.position.using = function( pos ) {
			that._animateUsing( content );
		};

		this.element.html( this.options.loadingContent );


		// save sizes to calc diff to new position and size
		this._oldSize = {
			width: this.options.width,
			height: this.options.height
		};
		// set and change to new size
		this._setOptions({
			width: width,
			height: height
		});

		// reset position.using mechanism
		this.options.position.using = originalUsing;
	},

	// position
	_animateUsing: function( content ) {
		var that = this;

		if ( this.options.height + ( this.uiDialog.outerHeight() - this._oldSize.height ) > $( window ).height() ) {
			topPos = $( window ).scrollTop() + 5;
		} else {
			topPos = "+=" + ( ( this._oldSize.height - this.options.height ) / 2 );
		}

		this.uiDialog.animate({
			left: "+=" + ( that._oldSize.width - that.options.width ) / 2,
			top: topPos,
		}, {
			duration: that.options.animationSpeed,
			complete: function(){
				// change content
				that.element.html( content );
				that._trigger( "resized" );
			},
			queue: false
		});
	},

	animateSize: function() {
		var that = this;

		this.element.animate({
			height: that.options.height,
		}, {
			duration: that.options.animationSpeed,
			queue: false
		});
		this.uiDialog.animate({
			width: that.options.width,
		}, {
			duration: that.options.animationSpeed,
			queue: false
		});
	},

	_create: function() {
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
	},

	_size: function() {
		if ( this._isVisible ) {
			this.animateSize();
		} else {
			this._super();
		}
	}
});

}( jQuery ));
