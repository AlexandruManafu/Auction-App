<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS");
header("Access-Control-Allow-Headers:*");

require_once('controller/user.php');
require_once('controller/auction.php');

$data = json_decode(file_get_contents('php://input'), true);
switch ($data['action']) {
    case 'register':
        register($data['username'], hash('sha512', $data['password']));
        break;
    case 'login':
        login($data['username'], hash('sha512', $data['password']));
        break;
    case 'logout':
        logout();
        break;
    case 'islogged':
        isLogged();
        break;
    case 'create_auction':
        createAuction($data['auction_title'], $data['starting_price'], $data['start_date'], $data['timeout'], $data['category'], $data['item_description'], $data['image']);
        break;
}