<?php

require_once('database/database.php');

class Auction {
    private $id;
    private $image;
    private $title;
	private $date;
	private $expectedEnd;
	private $category;
	private $description;
	private $timeout;
    private $initialBid;
    private $owner;

    public function __construct($image = "", $title, $date = "", $expectedEnd = "", $category = "",
								$description = "", $timeout = "", $initialBid = "", $owner = "") {
        $this->image = $image;
        $this->title = $title;
		$this->date = $date;
		$this->expectedEnd = $expectedEnd;
		$this->category = $category;
		
		$this->description = $description;
		$this->timeout = $timeout;
        $this->initialBid = $initialBid;
		$this->owner = $owner;
    }

	// Title not unique
    public function load() {
        $db = new Database();
        $arr_data = $db->select('auction', 'auction_title', $this->auction_title);
        $this->starting_price = $arr_data['starting_price'];
        $this->start_date = new DateTime($arr_data['start_date']);
        $this->timeout = $arr_data['timeout'];
        $this->category = $arr_data['category'];
        $this->item_description = $arr_data['item_description'];
        $this->image = $arr_data['image'];
    }
	
	public function testTablesCreation()
	{
        $db = new Database();
	    $db->createIfEmpty();
        $db->close();

	}

    public static function getAuctions()
    {
        $db = new Database();
        $auctions = $db->genericSelect("auction","1");

        $i = 0;
        $result = [];
        foreach($auctions as $element)
        {
            $path = $element["image"];
            if($path != "")
            {
                $element["image"] = Database::getImageBase64($path);
            }
            $result[$i] = $element;
            $i+=1;
        }

        echo json_encode($result);
        $db->close();
    }

    public function getFieldsAsArray()
    {
        return array($this->image, $this->title, $this->date, $this->expectedEnd,
        $this->category, $this->description, $this-> timeout, $this->initialBid, $this->owner);
    }
    public function saveAuction() {
        $db = new Database();
		$query = "INSERT INTO auction (image, title, date, expectedEnd, category, description, timeout, initialBid, owner) 
		VALUES ('?', '?', '?', '?', '?', '?', '?', '?', '?');";
		
		$values = $this->getFieldsAsArray();
		
        $db->insert($query,$values);
        $db->close();
    }
}