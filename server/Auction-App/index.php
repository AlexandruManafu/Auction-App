<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET,POST,PUT,OPTIONS");
header("Access-Control-Allow-Headers:*");

require_once('controller/user.php');
require_once('controller/auction.php');

$data = json_decode(file_get_contents('php://input'), true);
if(!is_null($data))
{
	echo ($data['action']);
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
			createAuction($data['auction']);
			break;
		case 'addMoney':
			add_money($data['money'], $data['username']);
			break;
	}
}
else
{
	
	$test = new Auction("test","test");
	$test->testTablesCreation();
	
	
	$input = $_GET["action"];
	switch ($input) {
		case 'isLogged':
			isLogged();
			break;
		case 'getAuctions':
			getAuctions();
			break;
		case 'getMoney':
			$user = $_GET['user'];
			getMoney($user);
			break;
	}
	
}