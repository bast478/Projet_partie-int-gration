<?php

require 'DotEnv.php';

(new DotEnv(__DIR__ . '/../../.env'))->load();

class Admin {
    // DATABASE SETTINGS
    private string $dbDSN;
    private string $dbUser;
    private string $dbPassword;
    // CONSTRUCTOR - CONNECT TO DATABASE
    private $pdo = null;
    private $stmt = null;
    public $error = "";
    function __construct()
    {
        $this->dbDSN = getenv('DB_DSN');
        $this->dbUser = getenv('DB_USER');
        $this->dbPassword = getenv('DB_PASSWORD');
        try {
            $this->pdo = new PDO($this->dbDSN, $this->dbUser, $this->dbPassword, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
        } catch (Exception $ex) {
            exit($ex->getMessage());
        }
    }

    // DESTRUCTOR - CLOSE CONNECTION
function __destruct () {
    if ($this->stmt !== null) { $this->stmt = null; }
    if ($this->pdo !== null) { $this->pdo = null; }
}

    // GET BACK-END USER BY NAME
    function getByName ($name) {
        $this->stmt = $this->pdo->prepare("SELECT user_id, user_name, user_password FROM Admin WHERE user_name = :name");
        $this->stmt->bindParam(':name', $name, PDO::PARAM_STR);
        $this->stmt->execute();
        return $this->stmt->fetch();
    }

    // VERIFICATION B-E USER
    function verify ($name, $password) {
        // GET USER
        $user = $this->getByName($name);
        $checkPass = is_array($user);
        // CHECK PASS
        if ($checkPass) { $checkPass = password_verify($password, $user["user_password"]); }
        // REGISTER MEMBER INTO SESSION
        if ($checkPass) {
            foreach ($user as $k=>$v) {
                $_SESSION["admin"][$k] = $v;
            }
            unset($_SESSION["admin"]["user_password"]);
        }
        // RESULT
        if (!$checkPass) {
            if (isset($_SESSION["admin"])) {
                unset($_SESSION["admin"]);
            }
            $this->error = "Email/Mot de passe invalide";
        }
        return $checkPass;
    }

    // PUT EMAIL IN DB
    function putEmail ($email) {
        if (isset($email) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->stmt = $this->pdo->prepare("INSERT INTO Email (user_email) VALUES (:email)");
            $this->stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $this->stmt->execute();
            return $this->stmt->fetch();
        } else {
            return $this->error = 'Email non valide';
        }
    }
}

// START
session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict', 'cookie_secure' => true]);
$_ADM = new Admin();