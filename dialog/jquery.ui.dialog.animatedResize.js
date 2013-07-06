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
		height: 200, // auto is not allowed with this extenion!

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

	// todo: add ARIA 
	// todo: rework topPos calc to make it viewport aware
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
			queue: false,
			complete: function(){
				// change content
				that.element.html( content );
				that._trigger( "resized" );
			}
		});
	},

	// animated change of the dialog size
	animateSize: function() {
		var options = this.options,
			widthElement = ( options.useContentSize ) ? this.element : this.uiDialog,
			animateOptions = {
				duration: options.animationSpeed,
				queue: false
			};

		this.element.animate({
			height: options.height,
		}, animateOptions );

		widthElement.animate({
			width: options.width,
		}, animateOptions );
	},
	
	_size: function() {
		if ( this._isVisible ) {
			this.animateSize();
		} else {
			this._super();
		}
	},

	// all following functions add a variable to determine if the dialog is visible
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
	}
});

}( jQuery ));
