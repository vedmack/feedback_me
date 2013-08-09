/*global $, jQuery*/
/*
*
* jQuery Feedback Plugin
* 
* File:        jquery.feedback_me.js
* Version:     0.2.7
* Author:      Daniel Reznick
* Info:        https://github.com/vedmack/feedback_me
* Contact:     vedmack@gmail.com	
* 
* Copyright 2013 Daniel Reznick, all rights reserved.
*
* Copyright 2013 Licensed under the MIT License (just like jQuery itself)
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
* 
* Parameters:
*
*					
* -------------

* feedback_url
				Required:			true
				Type:				String
				Description:		URL of your servlet/php etc ('name', 'message' and 'email' parameters will be send to your servlet/php etc...)
				
* jQueryUI
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to use jQuery UI theme
					
* bootstrap
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to use twitter bootstrap

* show_email
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Tell the plugin to display email input field
										
* name_label
				Required:			false
				Type:				String
				Default value:		"Name"
				Description:		Label for name input

* email_label
				Required:			false
				Type:				String
				Default value:		"Email"
				Description:		Label for email input
		
* message_label
				Required:			false
				Type:				String
				Default value:		"Message"
				Description:		Label for message input
									
* submit_label
				Required:			false
				Type:				String
				Default value:		"Send"
				Description:		Label for submit input

* title_label
				Required:			false
				Type:				String
				Default value:		"Feedback"
				Description:		Label for title text
		
* trigger_label
				Required:			false
				Type:				String
				Default value:		"Feedback"
				Description:		Label for open/close (trigger) button
		
* name_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for name input

* email_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for email input
		
* message_placeholder
				Required:			false
				Type:				String
				Default value:		""
				Description:		Watermark for message input
				
* name_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required

* email_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required
		
* message_required
				Required:			false
				Type:				boolean
				Default value:		false
				Description:		Makes input required			

* close_on_click_outisde				
				Required:			false
				Type:				boolean
				Default value:		true
				Description:		Will cause the feedback dialog to be closed on clicking anywhere outside the dialog
*
*
*/
var fm = (function () {

	'use strict';

	var fm_options;

	function triggerAction(event) {

		var animation_show = {},
			animation_hide = {};

		animation_show.marginLeft = "+=380px";
		animation_hide.marginLeft = "-=380px";

		if ($("body").attr("dir") === "rtl") {
			animation_show.marginRight = "+=380px";
			animation_hide.marginRight = "-=380px";
		}

		if ($("#feedback_trigger").hasClass("feedback_trigger_closed")) {
			$("#feedback_trigger , #feedback_content").animate(
				animation_show,
				500,
				'easeInOutSine',
				function () {
					$("#feedback_trigger").removeClass("feedback_trigger_closed");
					$("#feedback_content").removeClass("feedback_content_closed");
				}
			);
		} else {
			$("#feedback_trigger , #feedback_content").animate(
				animation_hide,
				500,
				function () {
					$("#feedback_trigger").addClass("feedback_trigger_closed");
					$("#feedback_content").addClass("feedback_content_closed");
				}
			);
		}

	}

	function closeFeedback(event) {

		if ($("#feedback_content").hasClass("feedback_content_closed") || event.target.id === "feedback_content" || $(event.target).parents("div#feedback_content").length > 0) {
			return;
		}

		var animation_hide = {};
		animation_hide.marginLeft = "-=380px";
		if ($("body").attr("dir") === "rtl") {
			animation_hide.marginRight = "-=380px";
		}

		$("#feedback_trigger").addClass("feedback_trigger_closed");
		$("#feedback_content").addClass("feedback_content_closed");

		$("#feedback_trigger , #feedback_content").animate(
			animation_hide,
			500
		);
	}

	function checkRequiredFieldsOk() {
		var $reqFields = $("[required]"),
			$fm_form,
			form_valid = true;

		if ($reqFields.length > 0) {
			//prevent form submit (needed for validation)
			$('#feedback_me_form').submit(function (event) {
				event.preventDefault();
			});

			$fm_form = $('#feedback_me_form');
			form_valid = $fm_form[0].checkValidity();
			if (form_valid === false) {
				$fm_form.submit();
			}
		}
		return form_valid;
	}

	function applyCloseOnClickOutside() {
		if (parseFloat($().jquery) >= 1.7) {
			$(document).on("click", document, function (event) {
				closeFeedback(event);
			});
		} else {
			$(document).delegate("body", document, function (event) {
				closeFeedback(event);
			});
		}
	}

	function appendFeedbackToBody(fm_options) {
		var jQueryUIClasses1 = "",
			jQueryUIClasses2 = "",
			jQueryUIClasses3 = "",
			jQueryUIClasses4 = "",
			email_html = "",
			email_feedback_content_class = "",
			fm_class = " fm_clean ",
			jquery_class = "",
			bootstrap_class = "",
			bootstrap_btn = "",
			bootstrap_hero_unit = "",

			name_required = fm_options.name_required ? "required" : "",
			email_required = fm_options.email_required ? "required" : "",
			message_required = fm_options.message_required ? "required" : "";

		if (fm_options.bootstrap === true) {
			bootstrap_class = " fm_bootstrap ";
			bootstrap_btn = " btn btn-primary ";
			bootstrap_hero_unit = " hero-unit ";

			fm_class = "";
			jquery_class = "";
		}

		if (fm_options.jQueryUI === true) {
			jquery_class = " fm_jquery ";
			jQueryUIClasses1 = " ui-widget-header ui-corner-all ui-helper-clearfix ";
			jQueryUIClasses2 = " ui-dialog ui-widget ui-widget-content ui-corner-all ";
			jQueryUIClasses3 = " ui-dialog-titlebar ";
			jQueryUIClasses4 = " ui-dialog-title ";

			fm_class = "";
			bootstrap_class = "";
			bootstrap_hero_unit = "";
			bootstrap_btn = "";

		}

		if (fm_options.show_email === true) {
			email_html = '<li>	<label for="feedback_email">' + fm_options.email_label + '</label> <input type="text" id="feedback_email" ' + email_required + ' placeholder="' + fm_options.email_placeholder + '"></input> </li>';
			email_feedback_content_class = "email_present";
		}

		$('body').append('<div id="feedback_trigger" onclick="event.cancelBubble = true;event.stopPropagation();fm.triggerAction(event);" class="feedback_trigger_closed ' + jQueryUIClasses1 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
				+	'<span class="feedback_trigger_text">' + fm_options.trigger_label
				+	'</span></div>');

		$('body').append('<div id="feedback_content" class="feedback_content_closed ' + email_feedback_content_class + jQueryUIClasses2 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
							+ '<div class="feedback_title ' + jQueryUIClasses1 + jQueryUIClasses3 + '">'
							+	'<span class="' + jQueryUIClasses4 + '">' + fm_options.title_label + '</span>'
							+ '</div>'
							+	'<form id="feedback_me_form">'
							+	'<ul>'
							+		'<li>	<label for="feedback_name">' + fm_options.name_label + '</label> <input type="text" id="feedback_name" ' + name_required + ' placeholder="' + fm_options.name_placeholder + '"></input> </li>'

							+		 email_html

							+		'<li>	<label for="feedback_message">' + fm_options.message_label + '</label> <textarea rows="5" id="feedback_message" ' + message_required + ' placeholder="' + fm_options.message_placeholder + '"></textarea> </li>'
							+		'<li>	<button id="feedback_submit" onclick="fm.sendFeedback(event);" class="' + bootstrap_btn + '">' + fm_options.submit_label + '</button> </li>'
							+	'</ul>'
							+	'</form>'
						+ '</div>');

		if (fm_options.jQueryUI === true) {
			$('#feedback_submit').button({
				icons: {
					primary: 'ui-icon-mail-closed'
				}
			});
		}

		if (fm_options.close_on_click_outisde === true) {
			applyCloseOnClickOutside();
		}

	}

	function sendFeedback(event) {
		var checkValid = checkRequiredFieldsOk();
		if (checkValid === false) {
			event.cancelBubble = true;
			event.stopPropagation();
			return;
		}
		$.ajax({
			type: 'POST',
			url: fm.getFmOptions().feedback_url,
			data: { name: $("#feedback_name").val(), message: $("#feedback_message").val(), email: $("#feedback_email").val() },
			beforeSend: function (xhr) {

				var animation_hide = {};
				animation_hide.marginLeft = "-=380px";
				if ($("body").attr("dir") === "rtl") {
					animation_hide.marginRight = "-=380px";
				}

				$("#feedback_trigger , #feedback_content").animate(
					animation_hide,
					500,
					function () {
						$("#feedback_trigger").addClass("feedback_trigger_closed");
						$("#feedback_name").val("");
						$("#feedback_message").val("");
						$("#feedback_email").val("");
					}
				);
			},
			error: function (ob, errStr) {
				alert("Failed to send feedback (please double check your feedback_url parameter)");
			}
		});
	}

	function getFmOptions() {
		return fm_options;
	}

	function init(options) {

		var default_options = {
			jQueryUI : false,
			bootstrap : false,
			show_email : false,
			close_on_click_outisde: true,
			name_label : "Name",
			email_label : "Email",
			message_label : "Message",
			name_placeholder : "",
			email_placeholder : "",
			message_placeholder : "",
			name_required : false,
			email_required : false,
			message_required : false,
			submit_label : "Send",
			title_label : "Feedback",
			trigger_label : "Feedback"
		};

		fm_options = $.extend(default_options, options);

		appendFeedbackToBody(fm_options);
	}

    return {
		init : init,
		sendFeedback : sendFeedback,
		getFmOptions : getFmOptions,
		triggerAction : triggerAction
    };

}());