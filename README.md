jQuery Feedback Me Plugin
===========

Description:
=====

This jQuery plug-in allows user to easily add an animatable UI widget with a feedback form which slides from the side of the screen.
If you got any requests for new features feel free to open an issue or email me vedmack@gmail.com


Features:
=====

  - Bootstrap support 
  - jQuery UI themes support
  - 4 different possible locations to place the widget
  - RTL support
  - Uses ajax post to send data to server ('name', 'message' and 'email' parameters will be send to your servlet/php file etc...)
  - Ability to send additional params to server (csrf token / logged in user_name / etc`)
  - All labels are customizable
  - Customizable placeholder (HTML5) for all input fields
  - Optional required attribute (HTML5) for all input fields with homegrown validation
  - Optional asterisk next to label of required input fields
  


Examples:
=====

[Clean example](http://feedback-me.appspot.com/example_clean.html)

[Clean complex example](http://feedback-me.appspot.com/example_clean_complex.html)

[jQuery UI theme aware example](http://feedback-me.appspot.com/example_jqueryUI.html)

[Bootstrap example](http://feedback-me.appspot.com/example_bootstrap.html)

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
	custom_params : {}
};
```

License
=====

Copyright 2013
Licensed under the MIT License (just like jQuery itself)


=====
If you are using this plugin it would be nice if you drop me an email to vedmack@gmail.com with some feedback.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/b6da00ccf307b6c278c41ba942e9af7c "githalytics.com")](http://githalytics.com/vedmack/feedback_me)
