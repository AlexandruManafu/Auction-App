<?php
require_once('database/database.php');

class User { 
    private $username;
    private $password;

    public function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }

    public function saveUser() {
        $db = new Database();
        $db->insert("INSERT INTO user (username, password) VALUES ('?', '?')", array($this->username, $this->password));
        $db->close();
    }

    public function exists() {
        $db = new Database();

        if($db->exists('user', array('username'), array($this->username))) {
            $db->close();
            return TRUE;
        }

        $db->close();
        return FALSE;
    }

    public function verifyUser() {
        $db = new Database();

        if($db->exists('user', array('username', 'password'), array($this->username, $this->password))) {
            $db->close();
            return TRUE;
        }

        $db->close();
        return FALSE;
    }
}