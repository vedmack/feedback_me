<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/jquery.feedback_me.css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.feedback_me.js"></script>
</head>
<body>

<script type="text/javascript">
$(document).ready(function(){
	fm_options = {
		position : "left-bottom",
		trigger_label : "Feedback",
		message_required : true,
		show_asterisk_for_required : true,
		name_placeholder: "optional",
		show_email : true,
		email_placeholder: "optional",
		feedback_url : "example_send_feedback.php"
	};

	fm.init(fm_options);
});
</script>

</body>
</html>
