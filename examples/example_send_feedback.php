<?php
/************************************************
This public domain example code shows how to process Feedback Me submissions from example_page.php. It both stores the feedback to a database, and emails the feedback. It processes $_POST['name'], $_POST['email'] and $_POST['message']. It also passes along the website name, sender IP and datetime. The email functionality relies on the availability of Swift Mailer (4.3.0; for compatibility with older PHP versions) in swift/. This file also relies on settings in the file ../private/fme_config.php. The file ../private/fme_config.php must be created and must contain:
<?php
	$GLOBALS['feedback_me_db'] = TRUE;
	$GLOBALS['feedback_me_mail'] = TRUE;
	$GLOBALS['feedback_me_website_name'] = '';

	$GLOBALS['db_host'] = '';
	$GLOBALS['db_user'] = '';
	$GLOBALS['db_pass'] = '';
	$GLOBALS['db_dtbs'] = '';

	$GLOBALS['smtp_host'] = '';
	$GLOBALS['smtp_port'] = 25;
	$GLOBALS['smtp_user'] = '';
	$GLOBALS['smtp_pass'] = '';
	$GLOBALS['mail_to'] = '';
?>
Optionally, either storing to a database or emailing can be disabled by setting the corresponding global variable - 'feedback_me_db' or 'feedback_me_mail' - to FALSE.
************************************************/

/***
	error_reporting (-1);
	ini_set ('display_errors', 'On');
***/

	ini_set ('output_buffering', 'Off');
	while (@ob_end_flush());

	date_default_timezone_set ('UTC');

	ini_set ('php.internal_encoding', 'UTF-8');
	mb_internal_encoding ('UTF-8');

	if (file_exists ('../private/fme_config.php'))
	{
		require_once ('../private/fme_config.php');
	} else { Result ('error'); }

	if (file_exists ('swift/lib/swift_required.php'))
	{
		require_once ('swift/lib/swift_required.php');
	} else { Result ('error'); }

/***********************************************/
function Result ($sStatus)
/***********************************************/
{
/***
The success() function of jquery.feedback_me.js does not check
if (data['error']) { } else { }. This is the reason we do not
use the dataType:'json' response below, but instead use a
response that will forcefully trigger the error() function if
necessary.

$arResponse[$sStatus] = TRUE;
header ('Content-type: application/json');
print (json_encode ($arResponse));
***/

	switch ($sStatus)
	{
		case 'success':
			http_response_code (200); /*** 200 = OK ***/
			break;
		case 'error':
		default:
			http_response_code (404); /*** 404 = Not Found ***/
			break;
	}
}
/***********************************************/
function FeedbackDB ($arFeedback)
/***********************************************/
{
	/*** Database. ***/
	$GLOBALS['link'] = mysqli_init();
	if ($GLOBALS['link'] == FALSE) { return (FALSE); }
	if (!@mysqli_real_connect ($GLOBALS['link'], $GLOBALS['db_host'],
		$GLOBALS['db_user'], $GLOBALS['db_pass'], $GLOBALS['db_dtbs']))
		{ return (FALSE); }
	mysqli_set_charset ($GLOBALS['link'], 'utf8');

	/*** Create table. ***/
	$query_table = "CREATE TABLE IF NOT EXISTS `feedback_me` (
		`feedback_id` INT(10) UNIQUE NOT NULL AUTO_INCREMENT,
		`feedback_name` VARCHAR(255) NOT NULL,
		`feedback_email` VARCHAR(255) NOT NULL,
		`feedback_message` VARCHAR(255) NOT NULL,
		`feedback_website` VARCHAR(255) NOT NULL,
		`feedback_ip` VARCHAR(45) NOT NULL,
		`feedback_date` DATETIME NOT NULL,
		PRIMARY KEY (`feedback_id`));";
	$result_table = mysqli_query ($GLOBALS['link'], $query_table);

	/*** Insert feedback. ***/
	$query_feedback = "INSERT INTO `feedback_me` VALUES (NULL, '" .
		mysqli_real_escape_string ($GLOBALS['link'],
			$arFeedback['name']) . "', '" .
		mysqli_real_escape_string ($GLOBALS['link'],
			$arFeedback['email']) . "', '" .
		mysqli_real_escape_string ($GLOBALS['link'],
			$arFeedback['message']) . "', '" .
			$arFeedback['website'] . "', '" .
			$arFeedback['ip'] . "', '" .
			$arFeedback['datetime'] . "');";
	$result_feedback = mysqli_query ($GLOBALS['link'], $query_feedback);

	if (mysqli_affected_rows ($GLOBALS['link']) == 1)
	{
		$bResult = TRUE;
	} else {
		$bResult = FALSE;
	}
	mysqli_close ($GLOBALS['link']);

	return ($bResult);
}
/***********************************************/
function FeedbackMail ($arFeedback)
/***********************************************/
{
	/*** Subject. ***/
	$sSubject = '[ ' . $arFeedback['website'] . ' ] Feedback';

	/*** Message. ***/
	$sMessage = '';
	if (!empty ($arFeedback['name']))
		{ $sMessage .= 'Name: ' . $arFeedback['name'] . '<br>'; }
	if (!empty ($arFeedback['email']))
		{ $sMessage .= 'Email: ' . $arFeedback['email'] . '<br>'; }
	$sMessage .= 'IP: ' . $arFeedback['ip'] . '<br>';
	$sMessage .= nl2br ($arFeedback['message']);

	$transport = Swift_SmtpTransport::newInstance(
		$GLOBALS['smtp_host'],
		$GLOBALS['smtp_port'])
		->setUsername($GLOBALS['smtp_user'])
		->setPassword($GLOBALS['smtp_pass'])
		;
	$mailer = Swift_Mailer::newInstance($transport);

	$message = Swift_Message::newInstance()
		->setSubject($sSubject)
		->setFrom(array($GLOBALS['smtp_user'] => 'Feedback Me'))
		->setTo($GLOBALS['mail_to'])
		->setBody(
			'<html>' .
			'<head></head>' .
			'<body>' .
			$sMessage .
			'</body>' .
			'</html>',
			'text/html'
		);
		;

	try {
		$bResult = $mailer->send($message);
	} catch (Exception $e) {
/***
	file_put_contents ('../private/error_log.txt',
		$e->getMessage(), FILE_APPEND);
***/
		$bResult = FALSE;
	}

	return ($bResult);
}
/***********************************************/
function GetIP ()
/***********************************************/
{
	$arServer = array (
		'HTTP_CLIENT_IP',
		'HTTP_X_FORWARDED_FOR',
		'HTTP_X_FORWARDED',
		'HTTP_X_CLUSTER_CLIENT_IP',
		'HTTP_FORWARDED_FOR',
		'HTTP_FORWARDED',
		'REMOTE_ADDR'
	);
	foreach ($arServer as $sServer)
	{
		if (array_key_exists ($sServer, $_SERVER) === TRUE)
		{
			foreach (explode (',', $_SERVER[$sServer]) as $sIP)
			{
				if (filter_var ($sIP, FILTER_VALIDATE_IP) !== FALSE)
					{ return ($sIP); }
			}
		}
	}
	return ('unknown');
}
/***********************************************/

	if (strtoupper ($_SERVER['REQUEST_METHOD']) === 'POST')
	{
		if ((isset ($_POST['name'])) &&
			(isset ($_POST['email'])) &&
			(isset ($_POST['message'])) &&
			(!empty ($_POST['message'])))
		{
			$arFeedback = array();
			$arFeedback['name'] = htmlspecialchars ($_POST['name'], ENT_QUOTES);
			$arFeedback['email'] = htmlspecialchars ($_POST['email'], ENT_QUOTES);
			$arFeedback['message'] = htmlspecialchars ($_POST['message'], ENT_QUOTES);
			$arFeedback['website'] = $GLOBALS['feedback_me_website_name'];
			$arFeedback['ip'] = GetIP();
			$arFeedback['datetime'] = date ('Y-m-d H:i:s');

			$bResultDB = TRUE;
			if ($GLOBALS['feedback_me_db'] == TRUE)
				{ $bResultDB = FeedbackDB ($arFeedback); }

			$bResultMail = TRUE;
			if ($GLOBALS['feedback_me_mail'] == TRUE)
				{ $bResultMail = FeedbackMail ($arFeedback); }

			if (($bResultDB != FALSE) && ($bResultMail != FALSE))
			{
				Result ('success');
			} else {
				Result ('error');
			}
		} else { Result ('error'); }
	} else { Result ('error'); }
?>
