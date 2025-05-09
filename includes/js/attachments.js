window.wp = window.wp || {};

(function($){
	var doc_id;

	// Uploading files
	var file_frame, BP_Docs_MediaFrame, Library;

	$('.add-attachment').on('click', function( event ){

		event.preventDefault();

		// Open the dialog
		file_frame.open();

		return;
	});

	// Upload handler. Sends attached files to the list
	wp.Uploader.prototype.success = function(r) {
		$.ajax( ajaxurl, {
			type: 'POST',
			data: {
				'action': 'doc_attachment_item_markup',
				'attachment_id': r.id,

			},
			success: function(s) {
				$('#doc-attachments-ul').prepend(s.data);
				file_frame.close();
				// XTEC ************ AFEGIT ­Fix when attachment image into new document, no show image to select it
				// 2016.07.05 @xaviernietosanchez
				change_select_to_show_image();
				// ************ FI
			}
		} );
	};

	// Extension of the WP media view for our use
	BP_Docs_MediaFrame = wp.media.view.MediaFrame.Select.extend();

	doc_id = wp.media.model.settings.post.id;

	if ( 0 == doc_id ) {
		options = {
			success: function( response ) {
				wp.media.model.settings.post.id = response.doc_id;
				$('input#doc_id').val(response.doc_id);
				wp.media.model.Query.defaultArgs.auto_draft_id = response.doc_id;
			}
		};
		wp.media.ajax( 'bp_docs_create_dummy_doc', options );
	}

	$(document).ready(function(){
		file_frame = new BP_Docs_MediaFrame({
			title: bp_docs_attachments.upload_title,
			button: {
				text: bp_docs_attachments.upload_button,
			},
			multiple: false
		});

		Library = file_frame.states.get('library');

		// Set the mode to "upload" every time the media modal is opened.
		file_frame.on( "open", function() {
			Library.frame.content.mode('upload');
		} );
	});

	// XTEC ************ AFEGIT ­Fix when attachment image into new document, no show image to select it
	// 2016.07.05 @xaviernietosanchez
	function change_select_to_show_image(id){
		if ( $('#media-attachment-filters').length > 0 ){
			if ( $('#media-attachment-filters option:selected').text() == 'Tots els fitxers multimèdia' ){
				jQuery('#media-attachment-filters>option:eq(1)').attr("selected","selected");
				jQuery('#media-attachment-filters').trigger("change");
				if( jQuery('div[class="media-toolbar-primary search-form"]').length > 0 ){
					jQuery('div[class="media-toolbar-primary search-form"]').find('button').removeClass('button');
				}
			}
		}
	}
	// ************ FI

})(jQuery);
