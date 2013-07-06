/*!
 * jQuery UI Dialog ContentSize Extension
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
		useContentSize: false
	},

	/*
	 * Extends the original size method
	 */
	_size: function() {
		if ( this.options.useContentSize ) {
			this._contentSize();
		} else {
			this._super();
		}
	},

	/*
	 * Sets the size of the dialog
	 *
	 * Option width and height normally set the overall dialog dimensions.
	 * This extensions make these options the dimensions of the content pane.
	 * This way it's possible to set the real content dimensions.
	 */
	_contentSize: function() {
		// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		// divs will both have width and height set, so we need to reset them
		var nonContentHeight, minContentHeight, maxContentHeight,
			options = this.options;

		// Reset content sizing
		this.element.show().css({
			width: "auto",
			minHeight: 0,
			maxHeight: "none",
			height: 0
		});

		if ( options.minWidth > options.width ) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		this.element.css({
			width: options.width
		});
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: "auto"
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
	}

});

}( jQuery ));
