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

    public static function getMoney($username) {
        $db = new Database();
        $result = $db->select('user', 'username', $username);
        $db->close();
        return $result['money'];
    }

    public static function add_money($money, $username) {
        $db = new Database();
        $sum = intval($money);

        if(getMoney($username) != '0') {
            $sum += intval(self::getMoney($username));
        }
        $query = "UPDATE user SET money = '?' WHERE username = '?';";
        $result = $db->query($query, array($sum, $username));
        $db->close();
    }

    public static function substract_money($money, $username) {
        $db = new Database();
        $diff = intval(self::getMoney($username));

        if($diff > intval($money)) {
            $diff -= intval($money);
        }
        else {
            echo "Not enough money";
            return;
        }
        $query = "UPDATE user SET money = '?' WHERE username = '?';";
        $result = $db->query($query, array($diff, $username));
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