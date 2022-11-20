<?php
// LOAD LIBRARY
require_once "lib/Admin.php";

// LOGOUT
if (isset($_POST["logout"])) {
    unset($_SESSION["admin"]);
}

// REDIRECT IF NOT SIGNED IN
if (!isset($_SESSION["admin"])) {
    header("Location: ../login_backend.html");
    exit();
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Changa+One&family=Kanit:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style-dashboard.css">
    <script src="dashboard.js" defer></script>
    <title>Tableau de bord</title>
</head>
<body>
    <main>
        <div>
            <div id="title-buttons">
                <h1>Personnes inscrites à la newsletter</h1>
                <div id="buttons">
                    <button id="button-CSV">Exporter au format CSV</button>
                    <button form='deconnection' id="button-deconnect">Se deconnecter</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Adresse mail</th>
                        <th>Date d'inscription</th>
                        <th>Désinscrire</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div id="background-bat"></div>
        <div id="background-fossil"></div>
        <form id='deconnection' method='post'>
            <input type="hidden" name="logout">
        </form>
    </main>
    <template>
        <tr>
            <td></td>
            <td></td>
            <td><button type="button" data-id="">Supprimer</button></td>
        </tr>
    </template>
</body>
</html>