<?php
class Auction {
    private $id;
    private $image;
    private $auction_title;
    private $starting_price;
    private $item_description;
    private $start_date;
    private $timeout;
    private $category;

    public function __construct($auction_title, $starting_price = "", $start_date = "", $timeout = "", $category = "", $item_description = "", $image = "") {
        $this->image = $image;
        $this->auction_title = $auction_title;
        $this->starting_price = $starting_price;
        $this->start_date = $start_date;
        $this->timeout = $timeout;
        $this->category = $category;
        $this->item_description = $item_description;
    }

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

    public function saveAuction() {
        $db = new Database();
        $db->insert("INSERT INTO auction (auction_title, category, start_date, timeout, starting_price, item_description, image) VALUES ('?', '?', '?', '?', '?', '?', '?')", 
                    array($this->auction_title, $this->category, $this->start_date, $this->timeout, $this->starting_price, $this->item_description, $this->image));
        $db->close();
    }
}