jQuery Feedback Plugin
===========

Description:
=====

This jQuery plug-in allows user to easily add an animatable UI widget with a feedback form which slides from the side of the screen.
If you are using this plugin it would be nice if you drop me an email to vedmack@gmail.com with some feedback.


Features:
=====

  - Bootstrap support 
  - jQuery UI themes support
  - RTL support
  - Uses ajax post to send data to server ('name', 'message' and 'email' parameters will be send to your servlet/php file etc...)
  - All labels are customizable


Examples:
=====

[clean example](http://feedback-me.appspot.com/example_clean.html)

[jQuery UI theme aware example](http://feedback-me.appspot.com/example_jqueryUI.html)

[bootstrap example](http://feedback-me.appspot.com/example_bootstrap.html)


Usage:
=====

```javascript
$(document).ready(function(){
	fm_options = {
		trigger_label : "Click me",
		jQueryUI : true,
		feedback_url : "send_feedback"
	};

	fm.init(fm_options);
});
```

All available parameters (detailed explanation inside jquery.feedback_me.js)

* feedback_url
* jQueryUI
* bootstrap
* show_email
* close_on_click_outisde
* name_label
* email_label
* message_label
* submit_label
* title_label
* trigger_label

Default settings :

```javascript
var default_options = {
	jQueryUI : false,
	bootstrap : false,
	show_email : false,
	close_on_click_outisde: true,
	name_label : "Name",
	email_label : "Email",
	message_label : "Message",
	submit_label : "Send",
	title_label : "Feedback",
	trigger_label : "Feedback"
};
```

License
=====

Copyright 2013
Licensed under the MIT License (just like jQuery itself)



[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/b6da00ccf307b6c278c41ba942e9af7c "githalytics.com")](http://githalytics.com/vedmack/feedback_me)
