<?php
require_once 'lib/Newsletter.php';
$newsletter = new Newsletter;

if ($_POST['email']) {
    echo json_encode($newsletter->putEmail($_POST['email']));
}

if ($_POST['get_emails']) {
    echo json_encode($newsletter->getEmails());
}

if ($_POST['delete_email']) {
    echo json_encode($newsletter->deleteEmail($_POST['delete_email']));
}