/*
 * jQuery UI Selectmenu Popup Style Extension
 *
 * Copyright 2012, Felix Nagel (http://www.felixnagel.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/fnagel/jquery-ui-extensions
 */
(function( $ ) {

$.widget( "ui.selectmenu", $.ui.selectmenu, {
	// add option
	options: {
		popup: false
	},

	_drawButton: function() {
		this._super();

		if ( this.options.popup ) {
			this._setOption( "icons", { button: "ui-icon-triangle-2-n-s" } );
		}
	},

	_drawMenu: function() {
		this._super();

		if ( this.options.popup ) {
			this.menu.addClass( "ui-corner-all" ).removeClass( "ui-corner-bottom" );
			this.menuWrap.css( "width", this.buttonText.width() + parseFloat( this.buttonText.css( "padding-left" ) ) || 0 + parseFloat( this.buttonText.css( "margin-left") ) || 0 );
		}
	},

	_position: function() {
		if ( !this.options.popup ) {
			this._super();
		}

		var currentItem = this._getSelectedItem();
		// center current item
		if ( this.menu.outerHeight() < this.menu.prop( "scrollHeight" ) ) {
			this.menuWrap.css( "left" , -10000 );
			this.menu.scrollTop( this.menu.scrollTop() + currentItem.position().top - this.menu.outerHeight() / 2 + currentItem.outerHeight() / 2 );
			this.menuWrap.css( "left" , "auto" );
		}

		this.menuWrap.position( $.extend( {}, this.options.position, {
			of: this.button,
			my: "left top" + ( this.menu.offset().top  - currentItem.offset().top + ( this.button.outerHeight() - currentItem.outerHeight() ) / 2 ),
			at: "left top"
		} ) );
	},

	_toggleAttr: function(){
		this._super();

		if ( this.options.popup && this.isOpen ) {
			this.button.toggleClass( "ui-corner-top", !this.isOpen ).toggleClass( "ui-corner-all", this.isOpen );
		}
	}
});

}( jQuery ));