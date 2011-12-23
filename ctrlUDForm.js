// JavaScript Document

var focusElem;  // points to an element that is currently focused.
var jFormElem;  // list of elements (jquery object) inside a form.
var jFormLeng;  // number of elements.

$(document).ready( function() 
{
	// generate an array of elements inside a form.
	jFormElem = 
		$( 'form' ).map( function() {
			var ele = $.makeArray( this.elements );
			return ele;
		}).filter( function() {
			if( this.type == 'hidden' ) {
				return false;
			}
			return true;
		}).each( function(i) {
			$(this).data( 'focusIndex', i.toString() );
		});
	jFormLeng = jFormElem.length;
	
	// set focusElem if an element is focused. 
	$(jFormElem).focus( function() {
		focusElem = jQuery( this );
	});
	// focus the first element.
	jFormElem.get(1).focus();
    
	// +--------------------------------------------------------------+
    /**
     * Ctrl+RIGHT: go to the next element.
     */
    var formRight =function( event ) 
	{
		var keyPropagate = true;
		if( !focusElem ) return keyPropagate;
		if( !$(focusElem).data( 'focusIndex' ) ) return keyPropagate;
		
		var fIndex = parseInt( $(focusElem).data( 'focusIndex' ) );
		
		if( fIndex == jFormLeng-1 ) {
			$(jFormElem).get(0).focus();
		}
		else {
			$(jFormElem).get( fIndex+1 ).focus();
		}
		keyPropagate = false;
		return keyPropagate;
	};
	$(jFormElem).bind( 'keydown', 'ctrl+right', formRight );
	
    // +--------------------------------------------------------------+
	/** 
     * Ctrl+Left: go to the previous element.
     */
    var formLeft = function( event ) 
	{
		var keyPropagate = true;
		if( !focusElem ) return keyPropagate;
		if( !$(focusElem).data( 'focusIndex' ) ) return keyPropagate;
		
		var fIndex = parseInt( $(focusElem).data( 'focusIndex' ) );
		if( fIndex == 0 ) {
			$(jFormElem).get( jFormLeng-1 ).focus();
		} 
		else {
			$(jFormElem).get( fIndex-1 ).focus();
		}
		keyPropagate = false;
		return keyPropagate;
	};
	$(jFormElem).bind( 'keydown', 'ctrl+left', formLeft );
    
	// +--------------------------------------------------------------+
	/**
     * Ctrl+DOWNç go down the table or the next element.
     */
    var formDown = function( event ) 
	{
		var keyPropagate = true;
		if( !focusElem ) return keyPropagate;
		if( !$(focusElem).data( 'focusIndex' ) ) return keyPropagate;
		
		var fIndex = parseInt( $(focusElem).data( 'focusIndex' ) );
		
		// find an element to focus.
		var fName  = $(focusElem).attr( 'name' );
		if( fName.match( /\[/ ) ) 
		{
			var fNameBody     = fName.match( /^([\w]+)/ )[0];
			var toFocus_idx   = '-1'; // next element with same table name. 
			var follow_item   = '-1'; // just the next element.
			var top_item      = '-1'; // very first element inside the form.
			var first_item    = '-1'; // first element with same table name. 
			$( jFormElem ).each( function( idx ) 
			{
				var this_fIdx     = $( this ).data( 'focusIndex' );
				var this_name     = $( this ).attr( 'name' );
				var this_nameBody = this_name.match( /^([\w]+)/ )[0];
				if( this_nameBody == fNameBody ) 
				{
					if( first_item === '-1' ) { 
						first_item = this_fIdx; 
					}
					if( this_fIdx > fIndex && toFocus_idx === '-1' ) {
						toFocus_idx = this_fIdx;
						// return false;
					}
					//$( jFormElem ).get( first_item ).focus();
					//alert( this_nameBody + this_fIdx );
				}
				else if( !this_name.match( /\[/ ) ) {
					if( top_item === '-1' ) {
						top_item = this_fIdx;
					}
					if( this_fIdx > fIndex && follow_item === '-1' ) {
						follow_item = this_fIdx;
					}
				}
			});
			if( toFocus_idx !== '-1' ) {
				$( jFormElem ).get( toFocus_idx ).focus();
			}
			else if( follow_item !== '-1' ) {
				$( jFormElem ).get( follow_item ).focus();
			}
			else if( top_item !== '-1' ) {
				$( jFormElem ).get( top_item ).focus();
			}
			else if( first_item !== '-1' ) {
				$( jFormElem ).get( first_item ).focus();
			}
			//alert( top_item + ' ' + follow_item );
			return;
			//alert( fNameBody[0] );
		}
		
		if( fIndex == jFormLeng-1 ) {
			$(jFormElem).get(0).focus();
		}
		else {
			$(jFormElem).get( fIndex+1 ).focus();
		}
		keyPropagate = false;
		return keyPropagate;
	};
	$(jFormElem).bind( 'keydown', 'ctrl+down', formDown );
    
	// +--------------------------------------------------------------+
	/**
     * Ctrl+UP: go up the table, or go to the previous element.
     */
    var formUp = function( event ) 
	{
		var keyPropagate = true;
		if( !focusElem ) return keyPropagate;
		if( !$(focusElem).data( 'focusIndex' ) ) return keyPropagate;
		
		var fIndex = parseInt( $(focusElem).data( 'focusIndex' ) );
		
		// find an element to focus.
		var fName  = $(focusElem).attr( 'name' );
		if( fName.match( /\[/ ) ) 
		{
			var fNameBody = fName.match( /^([\w]+)/ )[0];
			var toFocus_idx   = '-1'; // previous element with same table name. 
			var prev_item     = '-1'; // just the previous element.
			var bottom_item   = '-1'; // the last element with same table name. 
			var last_item     = '-1'; // the last element inside the form.
			$( jFormElem ).each( function( idx )
			{
				var this_fIdx     = $( this ).data( 'focusIndex' );
				var this_name     = $( this ).attr( 'name' );
				var this_nameBody = this_name.match( /^([\w]+)/ )[0];
				if( this_nameBody == fNameBody ) 
				{
					last_item = this_fIdx; 
					if( this_fIdx < fIndex ) {
						toFocus_idx = this_fIdx;
					}
					//$( jFormElem ).get( first_item ).focus();
				}
				else if( !this_name.match( /\[/ ) ) {
					bottom_item = this_fIdx;
					if( this_fIdx < fIndex  ) {
						prev_item = this_fIdx;
					}
				}
			});
			if( toFocus_idx !== '-1' ) {
				$( jFormElem ).get( toFocus_idx ).focus();
			}
			else if( prev_item !== '-1' ) {
				$( jFormElem ).get( prev_item ).focus();
			}
			else if( bottom_item !== '-1' ) {
				$( jFormElem ).get( bottom_item ).focus();
			}
			else if( last_item !== '-1' ) {
				$( jFormElem ).get( last_item ).focus();
			}
			return;
			//alert( fNameBody[0] );
		}
		
		if( fIndex == 0 ) {
			$(jFormElem).get( jFormLeng-1 ).focus();
		} 
		else {
			$(jFormElem).get( fIndex-1 ).focus();
		}
		keyPropagate = false;
		return keyPropagate;
	};
	$(jFormElem).bind( 'keydown', 'ctrl+up', formUp );
});
