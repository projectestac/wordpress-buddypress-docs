// XTEC ************ AFEGIT ­ JQuery script to show different options for suggest labels
// 2016.06.23 @xaviernietosanchez
(function( $ ) {
	$(function() {
		function split( val ) {
	    	return val.split( /,\s*/ );
	    }
	    function extractLast( term ) {
	    	return split( term ).pop();
	    }

	    $( "#tax-input-bp_docs_tag" )
	    	// don't navigate away from the field on tab when selecting an item
	    	.bind( "keydown", function( event ) {
	        	if ( event.keyCode === $.ui.keyCode.TAB &&
	            	$( this ).autocomplete( "instance" ).menu.active ) {
	          		event.preventDefault();
	        	}
	    	})
	        .autocomplete({
	        	source: function( request, response ) {
	          		$.getJSON( SuggestComplete.url + "?action=suggest_label", {
	            	term: extractLast( request.term )
	          	}, response );
	        },
	        search: function() {
	          	// custom minLength
	          	var term = extractLast( this.value );
	          	if ( term.length < 1 ) {
	            	return false;
	          	}
	        },
	        focus: function() {
	          	// prevent value inserted on focus
	          	return false;
	        },
	        select: function( event, ui ) {
	          	var terms = split( this.value );
	          	// remove the current input
	          	terms.pop();
	          	// add the selected item
	          	terms.push( ui.item.value );
	          	// add placeholder to get the comma-and-space at the end
	          	terms.push( "" );
	          	this.value = terms.join( ", " );
	          	return false;
	        }
	    });
	});
})( jQuery );
// ************ FI
