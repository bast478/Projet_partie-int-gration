<?php

// (A) LOAD LIBRARY
require "lib/lib-admin.php";

// (B) CHECK LOGIN CREDENTIALS
if (count($_POST) != 0) {
  $util = $_POST["nom-utilisateur"];
  $mdp = $_POST["mdp"];
  $_ADM->verify($util, $mdp);
}

// (C) REDIRECT IF SIGNED IN
if (isset($_SESSION["admin"])) {
  $response = array('message' => 'connecté', 'success' => true);
  echo json_encode($response);
} else {
  $response = array('message' => 'non connecté', 'success' => false, 'error' => $_ADM->error);
  echo json_encode($response);
}