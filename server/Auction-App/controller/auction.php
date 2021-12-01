<?php
require_once('model/auction.php');


function  createAuction($auction_title, $starting_price, $start_date, $timeout, $category, $item_description, $image) {
    $path = '';
    if ($image != '') {
        $path = getPath($auction_title, $category);
        uploadFile($image, $path);
    }
    $date = new DateTime($start_date);
    $auction = new Auction($auction_title, $starting_price, $start_date, $timeout, $category,  $item_description, $path);
    $auction->saveAuction();
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