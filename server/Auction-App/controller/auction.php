<?php
require_once('model/auction.php');


function  createAuction($auction) {
    $path = '';
    if ($auction["image"] != '') {
        $path = getPath($auction["title"], $auction["category"]);
        uploadFile($auction["image"], $path);
    }

    $auction = new Auction($path,$auction["title"],$auction["date"],$auction["expectedEnd"],$auction["category"],$auction["description"],
                            $auction["timeout"],$auction["initialBid"],$auction["owner"]);
    $auction->saveAuction();
}

function getAuctions()
{
    return Auction::getAuctions();
}

function getBiddingInfo($auctionId)
{
    return Auction::getBiddingInfo($auctionId);
}

function bid($data)
{
    return Auction::bid($data);
}

function loadAuction($auction_title) {
    $auction = new Auction($auction_title);
    $auction->loadAuction();
}

function getPath($auction_title, $category) {
    return './images/photo_'.$auction_title.'_'.$category.'.jpeg';
}

function uploadFile($base64_string, $path) {
    $file = base64_to_jpeg($base64_string, $path);
    move_uploaded_file($file,'./images');
}

function base64_to_jpeg($base64_string, $file_path) {
    $ifp = fopen( $file_path, 'wb' ); 

    fwrite( $ifp, base64_decode( $base64_string ) );

    fclose( $ifp ); 

    return $file_path; 
}