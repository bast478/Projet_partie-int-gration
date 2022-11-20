<?php

require_once 'DotEnv.php';

(new DotEnv(__DIR__ . '/../../.env'))->load();

class Request {
    // DATABASE SETTINGS
    private string $dbDSN;
    private string $dbUser;
    private string $dbPassword;
    // CONSTRUCTOR - CONNECT TO DATABASE
    protected $pdo = null;
    protected $stmt = null;
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
}