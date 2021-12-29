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
            echo "Error: " . $query . "<br>" . $this->conn->error;
        }
    }

    function query($query, $parameters) {
        if(!$this->is_connected)
            $this->connect();
        foreach ($parameters as $parameter) {
            $query = $this->replaceFirst($query, '?', $parameter);
        }

        if ($this->conn->query($query) === TRUE) {
            echo "Record updated successfully";
        } else {
            echo "Error: " . $query . "<br>" . $this->conn->error;
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

    function genericSelect($table,$condition)
    {
        if(!$this->is_connected)
            $this->connect();

        $query = "SELECT * FROM ".$table." WHERE ".$condition.";";
        $queryResult = $this->conn->query($query);

        $result = [];
        $i = 0;
        foreach($queryResult as $element)
        {
            $result[$i] = $element;
            $i += 1;
        }

        return $result;
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
	
	function isDbEmpty()
	{
		$sql = "SELECT COUNT('table_name') FROM information_schema.tables WHERE table_schema =".self::DBNAME.";";
		$result = $this->conn->query($sql);
		return $result == 0;
	}

	function createDefualtTables()
	{
		$sql = "CREATE TABLE user
		(
			id int(10) PRIMARY KEY AUTO_INCREMENT NOT NULL,
			username VARCHAR(128) NOT NULL,
			password VARCHAR(128) NOT NULL,
            money int(10) DEFAULT 0
		);";
		$sql .= "CREATE TABLE auction
		(
			id int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
			image VARCHAR(128) NOT NULL,
			title VARCHAR(128) NOT NULL,
			date VARCHAR(128) NOT NULL,
			expectedEnd VARCHAR(128) NOT NULL,
			category VARCHAR(128) NOT NULL,
			description VARCHAR(128) NOT NULL,
			timeout int(10) NOT NULL,
			initialBid int(10) NOT NULL,
			owner VARCHAR(128) NOT NULL	
		);";
		
		
		$this->conn->multi_query($sql);
	}

    public function createIfEmpty()
    {
        if(!$this->is_connected)
			$this->connect();
			
        if($this->isDbEmpty())
		{
			$this->createDefualtTables();
		}
    }
	
    public static function getImageBase64($path)
    {
        $img_data = file_get_contents($path);
        $base64_code = base64_encode($img_data);

        return $base64_code;
    }
}