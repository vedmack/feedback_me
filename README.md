jQuery Feedback Me Plugin
===========

Description:
=====

This jQuery plug-in allows user to easily add an animatable UI widget with a feedback form which slides from the side of the screen.


Contact/Social:
=====
If you want to ask a question use my [google group](https://groups.google.com/forum/#!forum/daniels_code)

If you like my plugin, you can show your appreciation by following me in [Twitter](https://twitter.com/danielreznick) / [GitHub](https://github.com/vedmack).


Features:
=====

  - Using CSS3 Transition for sliding out the feedback widget (jquery used as a fallback for older browsers)
  - Multiple feedbacks on page (different locations)
  - Growl alike and super customizable dialog response for success/fail feedback sending 
  - Bootstrap support 
  - jQuery UI themes support
  - 4 different possible locations to place the widget
  - Using AJAX post to send data to server ('name', 'message' and 'email' parameters will be send to your servlet/php file etc...)
  - Ability to send additional custom params to server (csrf token / logged in user_name / etc`)
  - Ability to embed any external html file inside the feedback_me widget for maximum customization
  - Ability to embed inline html code inside the feedback_me widget for more customizations
  - RTL support (except in 0.5.2 version)
  - All labels are customizable
  - Customizable placeholder (HTML5) for all input fields
  - Optional required attribute (HTML5) for all input fields with homegrown validation
  - Optional asterisk next to label of required input fields
  - Optional pattern attribute (HTML5) for name input field  with homegrown validation
  


Examples:
=====

[Clean example](http://feedback-me.appspot.com/example_clean.html)

[Clean complex example](http://feedback-me.appspot.com/example_clean_complex.html)

[jQuery UI theme aware example](http://feedback-me.appspot.com/example_jqueryUI.html)

[Bootstrap example](http://feedback-me.appspot.com/example_bootstrap.html)

[External IFrame Example](http://feedback-me.appspot.com/example_external_iframe.html)

[Custom Html Example](http://feedback-me.appspot.com/example_custom_html.html)

[Multiple Feedbacks Example](http://http://feedback-me.appspot.com/example_clean_multiple.html)

Usage:
=====

```javascript
$(document).ready(function(){
	fm_options = {
		jQueryUI : true,
		position : "left-bottom",
		name_placeholder:"Name please",						
		trigger_label : "Click me",
		message_required : true,
		show_asterisk_for_required : true,
		feedback_url : "send_feedback"
	};

	fm.init(fm_options);
});
```

All available parameters + default settings (detailed explanation inside jquery.feedback_me.js) :

```javascript
var default_options = {
	feedback_url : "",
	position : "left-top",
	jQueryUI : false,
	bootstrap : false,
	show_email : false,
	show_radio_button_list : false,
	close_on_click_outisde: true,
	name_label : "Name",
	email_label : "Email",
	message_label : "Message",
	radio_button_list_labels : ["1", "2", "3", "4", "5"],
	radio_button_list_title : "How would you rate my site?",
	name_placeholder : "",
	email_placeholder : "",
	message_placeholder : "",
	name_required : false,
	email_required : false,
	message_required : false,
	radio_button_list_required : false,
	show_asterisk_for_required : false,
	submit_label : "Send",
	title_label : "Feedback",
	trigger_label : "Feedback",
	custom_params : {},
	iframe_url : undefined,
	show_form: true,
	custom_html: "",
	delayed_close : true,
	delayed_options : {
		delay_success_milliseconds : 2000,
		delay_fail_milliseconds : 2000,
		sending : "Sending...",
		send_fail : "Sending failed.",
		send_success : "Feedack sent.",
		fail_color : undefined,
		success_color : undefined
	}
};
```


License:
=====

Copyright 2013
Licensed under the MIT License (just like jQuery itself)



[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/b6da00ccf307b6c278c41ba942e9af7c "githalytics.com")](http://githalytics.com/vedmack/feedback_me)

