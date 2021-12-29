<?php
require_once('model/user.php');
require_once('cache/cache_manipulation.php');

function register($username, $password) {
    $user = new User($username, $password);

    if (!$user->exists())
        $user->saveUser();
    else echo "userul exista deja";
}

function login($username, $password) {
    $user = new User($username, $password);
    
    if($user->verifyUser()) {
        logInToCache('logged_users.json', array('username' => $username, 'ip' => $_SERVER['REMOTE_ADDR']));
    }
    else {
        echo "Wrong data, mother-ducker";
    }
}

function getMoney($username) {
    echo User::getMoney($username);
}

function logout() {
	echo "here";
    logOutFromCache('logged_users.json', $_SERVER['REMOTE_ADDR']);
}

function add_money($money, $username) {
    User::add_money($money, $username);
}

function isLogged() {
    if (entry_exists('logged_users.json', $_SERVER['REMOTE_ADDR']))
        echo 'yes';
else echo 'no';
}
