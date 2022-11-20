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
        $this->stmt = $this->pdo->prepare("SELECT admin_id, admin, password FROM admin WHERE admin = :name");
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
        if ($checkPass) { $checkPass = password_verify($password, $user["password"]); }
        // REGISTER MEMBER INTO SESSION
        if ($checkPass) {
            foreach ($user as $k=>$v) {
                $_SESSION["admin"][$k] = $v;
            }
            unset($_SESSION["admin"]["password"]);
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
        if (isset($email) && !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL) && $email === htmlspecialchars($email)) {
            $this->stmt = $this->pdo->prepare("INSERT IGNORE INTO newsletter (subscriber_email) VALUES (:email)");
            $this->stmt->bindParam(':email', $email, PDO::PARAM_STR);
            try {
                $this->stmt->execute();
                return true;
            } catch (Exception $e) {
                $this->error = $e->getMessage();
                return true;
            }
            
        } else {
            $this->error = 'Adresse email non valide.';
            return false;
        }
    }
}

// START
//session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict', 'cookie_secure' => true]);
session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict']);
$_ADM = new Admin();