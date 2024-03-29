// JavaScript Document

(function($) {
    // +--------------------------------------------------------------+
    /**
     * ctrlForm (control Up/Down in Form) plug-in for jQuery. 
     */
    $.fn.ctrlForm = function( config ) {
        // defaults
        var defaults = {
            /** element # to focus */
            focus: 0,
            control: [ 'ctrl', 'meta' ],
            onEnter: false
        };
        var options = $.extend( defaults, config );
        
        var focusElem;  // points to an element that is currently focused.
        var jFormElem;  // list of elements (jquery object) inside a form.
        var jFormLeng;  // number of elements.

        // generate an array of elements inside a form.
        jFormElem = 
            $( this ).map( function() {
                var ele = $.makeArray( this.elements );
                return ele;
            }).filter( function() {
                return this.type != 'hidden';

            }).each( function(i) {
                $(this).data( 'focusIndex', i.toString() );
            });
        jFormLeng = jFormElem.length;

        // set focusElem if an element is focused. 
        $(jFormElem).focus( function() {
            focusElem = jQuery( this );
        });
        // focus the first element.
        jFormElem.get(options.focus).focus();
        
        // bind with control+arrow keys
        $.each( options.control, function( idx, val ) {
            $(jFormElem).bind( 'keydown', val + '+right', formRight );
            $(jFormElem).bind( 'keydown', val + '+left',  formLeft );
            $(jFormElem).bind( 'keydown', val + '+down',  formDown );
            $(jFormElem).bind( 'keydown', val + '+up',    formUp );
        });
        // bind with Enter key
        if( options.onEnter ) {
            $(jFormElem).bind( 'keydown', 'return', onEnter );
        };
        // +--------------------------------------------------+
        /**
         * enter key: go to the next element but textarea and buttons.
         */
        function onEnter() {
            var keyPropagate = true;
            if( !focusElem ) return keyPropagate;
            if( !$(focusElem).data( 'focusIndex' ) ) return keyPropagate;
            if(  $(focusElem).get(0).tagName == 'TEXTAREA' ) return keyPropagate;
            if(  $(focusElem).attr( 'type' ) == 'submit' ) return keyPropagate;
            if(  $(focusElem).attr( 'type' ) == 'reset' ) return keyPropagate;
            return formRight();
        }
        // +--------------------------------------------------+
        /**
         * Ctrl+RIGHT: go to the next element.
         */
        function formRight()
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
        }
        
        // +--------------------------------------------------+
        /** 
         * Ctrl+Left: go to the previous element.
         */
        function formLeft()
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
        }
        // +--------------------------------------------------+
        /**
         * Ctrl+DOWN go down the table or the next element.
         */
        function formDown()
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
                $( jFormElem ).each( function()
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
                return false;
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
        }
        // +--------------------------------------------------+
        /**
         * Ctrl+UP: go up the table, or go to the previous element.
         */
        function formUp()
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
                $( jFormElem ).each( function()
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
                return false;
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
        }
    };
})(jQuery);

