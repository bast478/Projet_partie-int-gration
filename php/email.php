<?php
require_once 'lib/lib-admin.php';

echo json_encode($_ADM->putEmail($_POST['email']));