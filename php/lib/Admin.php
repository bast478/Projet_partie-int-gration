<?php

require_once 'Request.php';

class Admin extends Request
{
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
}

// START
//session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict', 'cookie_secure' => true]);
session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict']);