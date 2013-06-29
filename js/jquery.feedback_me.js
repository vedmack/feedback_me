/*global $, jQuery*/
/*
*
* jQuery Feedback Plugin
* 
* File:        jquery.feedback_me.js
* Version:     0.1
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
*/
var fm = (function () {

	'use strict';

	var fm_options;

	function applyAnimation() {

		var animation_show = {},
			animation_hide = {};

		animation_show.marginLeft = "+=380px";
		animation_hide.marginLeft = "-=380px";

		if ($("body").attr("dir") === "rtl") {
			animation_show.marginRight = "+=380px";
			animation_hide.marginRight = "-=380px";
		}
		$("#feedback_trigger").click(function (event) {
			if ($("#feedback_trigger").hasClass("feedback_trigger_closed")) {
				$("#feedback_trigger , #feedback_content").animate(
					animation_show,
					500,
					'easeInOutSine',
					function () {
						$("#feedback_trigger").removeClass("feedback_trigger_closed");
					}
				);
			} else {
				$("#feedback_trigger , #feedback_content").animate(
					animation_hide,
					500,
					function () {
						$("#feedback_trigger").addClass("feedback_trigger_closed");
					}
				);
			}
		});
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
			bootstrap_hero_unit = "";

		if (fm_options.bootsrtap === true) {
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
			email_html = '<li>	<label for="feedback_email">' + fm_options.email_label + '</label> <input type="text" id="feedback_email"></input> </li>';
			email_feedback_content_class = "email_present";
		}

		$('body').append('<div id="feedback_trigger" class="feedback_trigger_closed ' + jQueryUIClasses1 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
				+	'<span class="feedback_trigger_text">' + fm_options.trigger_label
				+	'</span></div>');

		$('body').append('<div id="feedback_content" class="feedback_content_closed ' + email_feedback_content_class + jQueryUIClasses2 + fm_class + jquery_class + bootstrap_class + bootstrap_hero_unit + '">'
							+ '<div class="feedback_title ' + jQueryUIClasses1 + jQueryUIClasses3 + '">'
							+	'<span class="' + jQueryUIClasses4 + '">' + fm_options.title_label + '</span>'
							+ '</div>'
							+	'<ul>'
							+		'<li>	<label for="feedback_name">' + fm_options.name_label + '</label> <input type="text" id="feedback_name"></input> </li>'

							+		 email_html

							+		'<li>	<label for="feedback_message">' + fm_options.message_label + '</label> <textarea rows="5" id="feedback_message"></textarea> </li>'
							+		'<li>	<button id="feedback_submit" onclick="fm.sendFeedback();" class="' + bootstrap_btn + '">' + fm_options.submit_label + '</button> </li>'
							+	'</ul>'
						+ '</div>');

		if (fm_options.jQueryUI === true) {
			$('#feedback_submit').button({
				icons: {
					primary: 'ui-icon-mail-closed'
				}
			});
		}

		applyAnimation();
	}

	function sendFeedback() {
		$.ajax({
			type: 'POST',
			url: fm.getFmOptions().feedback_url,
			data: { name: $("#feedback_name").val(), message: $("#feedback_message").val(), email: $("#feedback_email").val() },
			success: function (data) {
				var animation_hide = {};

				animation_hide.marginLeft = "-=380px";
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
				alert("Failed to send feedback...");
			}
		});
	}

	function getFmOptions() {
		return fm_options;
	}

	function init(options) {

		var default_options = {
			jQueryUI : false,
			bootsrtap : false,
			show_email : false,
			name_label : "Name",
			email_label : "Email",
			message_label : "Message",
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
		getFmOptions : getFmOptions
    };

}());
