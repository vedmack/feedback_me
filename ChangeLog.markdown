# jQuery Feedback Me Plugin ChangeLog


## 0.5.6

* Customizable pattern attribute: "name_pattern" for name input (https://github.com/vedmack/feedback_me/issues/27)
* Allow jQuery.noConflict (https://github.com/vedmack/feedback_me/issues/25)
* Minor fix (https://github.com/vedmack/feedback_me/issues/26)

## 0.5.5

* Added highly customizable notification response for success/fail feedback sending (https://github.com/vedmack/feedback_me/issues/21)
* Bug fix (https://github.com/vedmack/feedback_me/issues/24)


## 0.5.2

* Added support for multiple feedbacks on page (https://github.com/vedmack/feedback_me/issues/19)
* As part of the multiple feedback feature implementation ALL ids were replaced with classes (e.g #feedback_content is now .feedback_content)
* Bug fix


## 0.4.8

* Added "custom_html" option to allow the use of inline html code that will be embeded inside feedback_me widget (thanks to miguelfontanes)
* Added "show_form" option to allow the external iframe/inline html code to appear with the original form or replace it
* CSS improvements colors / rounded coreners / trigger text location / etc...
* API change , when using "iframe_url" you should fedback me form explicitly: set "show_form" to false (untill now the form was hidden implicitly by default) , same goes for "custom_html"


## 0.4.6

* Remove jQuery UI dependencies (the only additional required library for the plugin is jQuery) https://github.com/vedmack/feedback_me/issues/14
* Bug fix clear input fields upon sending feedback, https://github.com/vedmack/feedback_me/issues/15


## 0.4.4

* Fixed jquery version check for using on instead of delegate (IE specific issue)


## 0.4.3

* Using CSS3 Transition for sliding out the feedback widget - jquery UI ased as a fallback for older browsers (since this version jquery UI is not a must to include).


## 0.4.0

* Added "iframe_url" option to allow the use of any html file that you want, html file will be embeded inside feedback_me widget.


## 0.3.8

* Bug fix Prevent form submit when there is no use in required inputs, https://github.com/vedmack/feedback_me/issues/8


## 0.3.7

* Added "custom_params" option to send additional data to the server (can be used for sending: csrf token / logged in user_name / etc`)


## 0.3.4

* Added option to set the position of the feedback widget (4 possible locations) : left-top / left-bottom / right-top / right-bottom


## 0.3.2

* Email input is now using HTML5 type + added simple email validation


## 0.3.1

* Fixed IE8 style issues


## 0.3.0

* Added optional radio button list input (5 radio buttons), can be used to rank something or any other purpose, all labels of the radios are customizable (string array) and it can be set to required too + its title is also customizable
* Fixed several IE8 js issues


## 0.2.7

* Added optional required attribute (HTML5) for all input fields with homegrown validation
* Added optional asterisk next to label of required input fields


## 0.2.5

* Added customizable placeholder (HTML5) for all input fields
* Better font and appearance


## 0.2.1

* Changed close_on_click_outisde option to be true by default
* Bug fix


## 0.2.0

* Added close_on_click_outisde option (default is false)
* Several code enhancements
