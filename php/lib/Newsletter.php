<?php

require_once 'Request.php';

class Newsletter extends Request
{
    // PUT EMAIL IN DB
    public function putEmail ($email) {
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

    // GET EMAILS
    public function getEmails () {
        $this->stmt = $this->pdo->prepare('SELECT subscriber_ID, subscriber_email, subscribe_date FROM newsletter');
        $this->stmt->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // DELETE EMAIL
    public function deleteEmail ($id) {
        $this->stmt = $this->pdo->prepare('DELETE FROM newsletter WHERE subscriber_ID = :id');
        $this->stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $this->stmt->execute();
    }
}