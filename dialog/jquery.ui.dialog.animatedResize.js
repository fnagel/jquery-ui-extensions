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
		var that = this,
			originalUsing = this.options.position.using;

		this._saveOldSize();
		this._setAria( true );
		this.element.html( this.options.loadingContent );

		if ( this._oldSize.width != width || this._oldSize.height != height ) {
			// change position.using mechanism
			this.options.position.using = function( position, feedback  ) {
				that._animateUsing( position, feedback , content );
			};

			// set and change to new size
			this._setOptions({
				width: width,
				height: height
			});

			// reset position.using mechanism
			this.options.position.using = originalUsing;
		} else {
			this._animateCompleted( content ) ;
		}
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
					that._animateCompleted( content ) ;
				}
			})
		);
	},

	_animateCompleted: function( content ) {
		this.element.html( content );
		this._setAria( false );
		this._trigger( "resized" );
	},

	// animated change of the dialog size
	animateSize: function() {
		var options = this.options,
			widthElement = ( options.useContentSize ) ? this.element : this.uiDialog;

		// we need to adjust the height as we want to calculate the overall dialog size
		if ( !options.useContentSize ) {
			options.height -= this.uiDialog.outerHeight() - this._oldSize.height;
		}

		this.element.animate({
			height: options.height,
		}, options.animateOptions );

		widthElement.animate({
			width: options.width,
		}, options.animateOptions );
	},

	// save sizes to calc diff to new position and size
	_saveOldSize: function() {
		this._oldSize = {
			width: this.options.width,
			height: this.options.height
		};
	},

	_setAria: function( busy ){
		this.uiDialog.attr({
			"aria-live": "assertive",
			"aria-relevant": "additions removals text",
			"aria-busy": busy
		});
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
		this._saveOldSize();
		this._isVisible = true;
	},

	close: function() {
		this._super();
		this._isVisible = false;
	}
});

}( jQuery ));
