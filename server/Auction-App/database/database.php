<?php
class Database {
    const SERVERNAME = "localhost";
    const USERNAME = 'root';
    const PASSWORD = "";
    const DBNAME = "auction-app";
    private $conn;
    private $is_connected = false;

    function insert($query, $parameters) {
        if(!$this->is_connected)
            $this->connect();
        foreach ($parameters as $parameter) {
            $query = $this->replaceFirst($query, '?', $parameter);
        }

        if ($this->conn->query($query) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
            
    }

    function exists($tablename, $fields, $parameters) {
        if(!$this->is_connected)
            $this->connect();

        $query = "SELECT * FROM ".$tablename." WHERE";

        for($i = 0; $i < count($fields) - 1; $i++) {
            $query .= " ". $fields[$i]. " = '". $parameters[$i]. "' AND"; 
        }
        $query .= " ". $fields[$i]. " = '". $parameters[$i]. "'";

        $result = $this->conn->query($query);

        if($result->num_rows > 0)
            return TRUE;

        return FALSE;
    }

    function select($tablename, $field, $value) {
        if(!$this->is_connected)
            $this->connect();

        $query = "SELECT * FROM ".$tablename." WHERE ".$field. " = '".$value."'";
        $result = $this->conn->query($query);

        return $result->fetch_assoc();
    }

    function connect() {
        $this->conn = new mysqli(self::SERVERNAME, self::USERNAME, self::PASSWORD, self::DBNAME);
        $this->is_connected = true;
    }

    function close() {
        $this->conn->close();
        $this->is_connected = false;
    }

    function replaceFirst($haystack, $needle, $replace) {
        $pos = strpos($haystack, $needle);
        if ($pos !== false) 
            return substr_replace($haystack, $replace, $pos, strlen($needle));
        return $haystack;
    }
}