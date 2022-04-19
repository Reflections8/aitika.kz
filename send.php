<?php header("Content-Type: text/html; charset=utf-8");?>
<? 

if($_POST['username']) { $name = htmlspecialchars ($_POST['username']); }
if($_POST['userphone']) { $phone = htmlspecialchars ($_POST['userphone']); }
if($_POST['usercomment']) { $comment = htmlspecialchars ($_POST['usercomment']); }

$site = $_SERVER['SERVER_NAME'];


    $to      = 'info@aitika.kz';
    $subject = "Заявка с сайта $site";
    $message = "Новая заявка с сайта
    Имя - $name
    Телефон - $phone
    Комментарий: $comment";

    $headers = "From: info@$site" . "\r\n" .
        "Reply-To: info@$site" . "\r\n" .
        'Content-type: text/plain; charset=utf-8' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);

?>
